import { Router } from 'express';
import { userRouter } from './user';
import { spaceRouter } from './space';
import { adminRouter } from './admin';
import { authRouter } from './auth';
import client from '@repo/db/client';

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

router.use('/auth', authRouter);

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
