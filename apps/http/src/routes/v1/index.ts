import { Router } from 'express';
import { userRouter } from './user';
import { spaceRouter } from './space';
import { adminRouter } from './admin';
import { SigninSchema, SignupSchema } from '../../types';
import { hash, compare } from '../../scrypt';
import client from '@repo/db/client';
import jwt from 'jsonwebtoken';
import { JWT_PASSWORD } from '../../config';

export const router = Router();

// Database health check endpoint
router.get('/health', async (req, res) => {
  try {
    console.log('Testing database connection...');
    await client.$connect();
    console.log('Database connection successful');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('Database connection failed:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    res
      .status(500)
      .json({ status: 'error', database: 'disconnected', error: errorMessage });
  }
});

router.post('/signup', async (req, res) => {
  console.log('inside signup');
  console.log(
    'Environment check - DATABASE_URL exists:',
    !!process.env.DATABASE_URL
  );

  // check the user
  const parsedData = SignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log('parsed data incorrect', parsedData.error);
    res
      .status(400)
      .json({ message: 'Validation failed', errors: parsedData.error.issues });
    return;
  }

  try {
    console.log('Attempting to hash password...');
    const hashedPassword = await hash(parsedData.data.password);
    console.log('Password hashed successfully');

    console.log('Attempting database connection...');
    const user = await client.user.create({
      data: {
        username: parsedData.data.username,
        password: hashedPassword,
        role: parsedData.data.type === 'admin' ? 'admin' : 'user',
        avatarId: parsedData.data.avatarId
          ? parseInt(parsedData.data.avatarId)
          : undefined,
      },
    });
    console.log('User created successfully:', user.id);
    res.json({
      userId: user.id,
    });
  } catch (e) {
    console.log('Database error occurred:');
    console.error(e);

    // Check if it's a specific Prisma error
    if (e && typeof e === 'object' && 'code' in e) {
      if (e.code === 'P2002') {
        res.status(400).json({ message: 'Username already exists' });
      } else if (e.code === 'P1001') {
        res.status(500).json({ message: 'Database connection failed' });
      } else {
        res.status(500).json({ message: 'Database error', code: e.code });
      }
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

router.post('/signin', async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({ message: 'Validation failed' });
    return;
  }

  try {
    const user = await client.user.findUnique({
      where: {
        username: parsedData.data.username,
      },
    });

    if (!user) {
      res.status(403).json({ message: 'User not found' });
      return;
    }
    const isValid = await compare(parsedData.data.password, user.password);

    if (!isValid) {
      res.status(403).json({ message: 'Invalid password' });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      JWT_PASSWORD
    );

    res.json({
      token,
      userId: user.id.toString(),
      role: user.role,
      avatarId: user.avatarId,
    });
  } catch (e) {
    res.status(400).json({ message: 'Internal server error' });
  }
});

router.get('/elements', async (req, res) => {
  const elements = await client.element.findMany();

  res.json({
    elements: elements.map((e) => ({
      id: e.id,
      imageUrl: e.imageUrl,
      width: e.width,
      height: e.height,
      isStatic: e.isStatic,
    })),
  });
});

router.get('/avatars', async (req, res) => {
  const avatars = await client.avatar.findMany();

  res.json({
    avatars: avatars.map((x) => ({
      id: x.id,
      imageUrl: x.imageUrl,
      name: x.name,
    })),
  });
});

router.get('/maps', async (req, res) => {
  const maps = await client.map.findMany({
    select: {
      id: true,
      name: true,
      width: true,
      height: true,
      accessCode: true,
      isTemplate: true,
    },
  });

  res.json({
    maps: maps.map((m) => ({
      id: m.id,
      name: m.name,
      width: m.width,
      height: m.height,
      dimensions: `${m.width}x${m.height}`,
      accessCode: m.accessCode, // Optional field, will be null for templates
      isTemplate: m.isTemplate,
    })),
  });
});

// Get public map details (for viewing)
router.get('/map/:mapId', async (req, res) => {
  const mapId = parseInt(req.params.mapId);

  const map = await client.map.findFirst({
    where: {
      id: mapId,
    },
    include: {
      mapElements: {
        include: {
          element: true,
        },
      },
      mapSpaces: {
        include: {
          space: {
            include: {
              elements: {
                include: {
                  element: true,
                },
              },
            },
          },
        },
      },
      creator: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  if (!map) {
    res.status(404).json({ message: 'Map not found' });
    return;
  }

  res.json({
    id: map.id,
    name: map.name,
    width: map.width,
    height: map.height,
    ownerId: map.creatorId,
    owner: map.creator.username,
    elements: map.mapElements.map((me) => ({
      id: me.id,
      elementId: me.elementId,
      x: me.x,
      y: me.y,
      element: {
        id: me.element.id,
        imageUrl: me.element.imageUrl,
        width: me.element.width,
        height: me.element.height,
        isStatic: me.element.isStatic,
      },
    })),
    mapSpaces: map.mapSpaces.map((ms) => ({
      id: ms.id,
      spaceId: ms.spaceId,
      spaceName: ms.space.name,
      x: ms.x,
      y: ms.y,
      width: ms.space.width,
      height: ms.space.height,
      elements: ms.space.elements.map((se) => ({
        id: se.id,
        elementId: se.elementId,
        x: se.x,
        y: se.y,
        element: {
          id: se.element.id,
          imageUrl: se.element.imageUrl,
          width: se.element.width,
          height: se.element.height,
          isStatic: se.element.isStatic,
        },
      })),
    })),
  });
});

// Get map templates (admin-created maps marked as templates)
router.get('/templates', async (req, res) => {
  try {
    console.log('Fetching templates...');
    const templates = await client.map.findMany({
      where: {
        isTemplate: true,
      },
      include: {
        creator: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    console.log(`Found ${templates.length} templates`);

    res.json({
      templates: templates.map((template) => ({
        id: template.id,
        name: template.name,
        width: template.width,
        height: template.height,
        category: 'Template', // You can enhance this later
        creatorName: template.creator.username,
      })),
    });
  } catch (error) {
    console.error('Failed to fetch templates:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get map by access code
router.get('/map/code/:accessCode', async (req, res) => {
  try {
    const map = await client.map.findFirst({
      where: {
        accessCode: req.params.accessCode.toUpperCase(),
      },
      include: {
        creator: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!map) {
      res.status(404).json({ message: 'Map not found' });
      return;
    }

    res.json({
      id: map.id,
      name: map.name,
      width: map.width,
      height: map.height,
      accessCode: map.accessCode,
      owner: map.creator.username,
    });
  } catch (error) {
    console.error('Failed to fetch map by code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get specific map details with elements (for both admins and users)
router.get('/map/:mapId/edit', async (req, res) => {
  const mapId = parseInt(req.params.mapId);

  // Extract user info from token (similar to middleware)
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const jwt = require('jsonwebtoken');
    const { JWT_PASSWORD } = require('../../config');
    const decoded = jwt.verify(token, JWT_PASSWORD) as any;
    const userId = decoded.userId;

    const map = await client.map.findFirst({
      where: {
        id: mapId,
        creatorId: userId, // Only allow access to own maps
      },
      include: {
        mapElements: {
          include: {
            element: true,
          },
        },
        mapSpaces: {
          include: {
            space: {
              include: {
                elements: {
                  include: {
                    element: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!map) {
      res.status(404).json({ message: 'Map not found or access denied' });
      return;
    }

    res.json({
      id: map.id,
      name: map.name,
      width: map.width,
      height: map.height,
      ownerId: map.creatorId,
      elements: map.mapElements.map((me) => ({
        id: me.id,
        elementId: me.elementId,
        x: me.x,
        y: me.y,
        element: {
          id: me.element.id,
          imageUrl: me.element.imageUrl,
          width: me.element.width,
          height: me.element.height,
          isStatic: me.element.isStatic,
        },
      })),
      mapSpaces: map.mapSpaces.map((ms) => ({
        id: ms.id,
        spaceId: ms.spaceId,
        spaceName: ms.space.name,
        x: ms.x,
        y: ms.y,
        width: ms.space.width,
        height: ms.space.height,
        elements: ms.space.elements.map((se) => ({
          id: se.id,
          elementId: se.elementId,
          x: se.x,
          y: se.y,
          element: {
            id: se.element.id,
            imageUrl: se.element.imageUrl,
            width: se.element.width,
            height: se.element.height,
            isStatic: se.element.isStatic,
          },
        })),
      })),
    });
  } catch (error) {
    console.error('Failed to fetch map for editing:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.use('/user', userRouter);
router.use('/space', spaceRouter);
router.use('/admin', adminRouter);
