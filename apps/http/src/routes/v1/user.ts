import { Router } from 'express';
import { UpdateMetadataSchema } from '../../types';
import client from '@repo/db/client';
import { userMiddleware } from '../../middleware/user';

export const userRouter = Router();

userRouter.post('/metadata', userMiddleware, async (req, res) => {
  const parsedData = UpdateMetadataSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log('parsed data incorrect');
    res.status(400).json({ message: 'Validation failed' });
    return;
  }
  try {
    await client.user.update({
      where: {
        id: req.userId ? parseInt(req.userId) : undefined,
      },
      data: {
        avatarId: parseInt(parsedData.data.avatarId),
      },
    });
    res.json({ message: 'Metadata updated' });
  } catch (e) {
    console.log('error');
    res.status(400).json({ message: 'Internal server error' });
  }
});

userRouter.get('/metadata/bulk', async (req, res) => {
  const userIdString = (req.query.ids ?? '[]') as string;
  const userIds = userIdString
    .slice(1, userIdString?.length - 1)
    .split(',')
    .map((id) => parseInt(id.trim()))
    .filter((id) => !isNaN(id));
  console.log(userIds);
  const metadata = await client.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
    select: {
      avatar: true,
      id: true,
    },
  });

  res.json({
    avatars: metadata.map((m) => ({
      userId: m.id,
      avatarId: m.avatar?.imageUrl,
    })),
  });
});

// Get maps that user has recently joined
userRouter.get('/joined-maps', userMiddleware, async (req, res) => {
  try {
    const joinedMaps = await client.userMapVisit.findMany({
      where: {
        userId: parseInt(req.userId!),
      },
      include: {
        map: {
          include: {
            creator: {
              select: {
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        visitedAt: 'desc',
      },
      take: 20, // Limit to 20 most recent
    });

    res.json({
      maps: joinedMaps.map((visit) => ({
        id: visit.map.id,
        name: visit.map.name,
        width: visit.map.width,
        height: visit.map.height,
        dimensions: `${visit.map.width}x${visit.map.height}`,
        ownerId: visit.map.creatorId,
        owner: visit.map.creator.username,
        isOwner: visit.map.creatorId === parseInt(req.userId!),
        lastVisited: visit.visitedAt,
      })),
    });
  } catch (error) {
    console.error('Failed to fetch joined maps:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Record map visit (called when user joins a map)
userRouter.post('/visit-map', userMiddleware, async (req, res) => {
  try {
    const { mapId } = req.body;

    if (!mapId) {
      res.status(400).json({ message: 'Map ID is required' });
      return;
    }

    // Use upsert to update visit time if already exists
    await client.userMapVisit.upsert({
      where: {
        userId_mapId: {
          userId: parseInt(req.userId!),
          mapId: parseInt(mapId),
        },
      },
      update: {
        visitedAt: new Date(),
      },
      create: {
        userId: parseInt(req.userId!),
        mapId: parseInt(mapId),
      },
    });

    res.json({ message: 'Map visit recorded' });
  } catch (error) {
    console.error('Failed to record map visit:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get maps owned by user (for regular users who can create maps)
userRouter.get('/owned-maps', userMiddleware, async (req, res) => {
  try {
    const ownedMaps = await client.map.findMany({
      where: {
        creatorId: parseInt(req.userId!),
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

    res.json({
      maps: ownedMaps.map((map) => ({
        id: map.id,
        name: map.name,
        width: map.width,
        height: map.height,
        dimensions: `${map.width}x${map.height}`,
        ownerId: map.creatorId,
        owner: map.creator.username,
        isOwner: true,
        accessCode: map.accessCode, // Will be null for templates, present for shareable maps
        isTemplate: map.isTemplate,
      })),
    });
  } catch (error) {
    console.error('Failed to fetch owned maps:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a complete copy of a template map (deep copy)
userRouter.post('/copy-template', userMiddleware, async (req, res) => {
  try {
    console.log(
      `User ${req.userId} is copying template ${req.body.templateId}`
    );
    const { templateId, name } = req.body;

    if (!templateId || !name) {
      res.status(400).json({ message: 'Template ID and name are required' });
      return;
    }

    // Get the template with all its related data
    const template = await client.map.findFirst({
      where: {
        id: parseInt(templateId),
        isTemplate: true, // Ensure it's actually a template
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

    if (!template) {
      res.status(404).json({ message: 'Template not found' });
      return;
    }

    // Generate unique access code for the new map
    const generateAccessCode = () => {
      return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    let accessCode: string;
    let isUnique = false;

    while (!isUnique) {
      accessCode = generateAccessCode();
      const existing = await client.map.findFirst({
        where: { accessCode },
      });
      if (!existing) {
        isUnique = true;
      }
    }

    // Use transaction to ensure all-or-nothing copy
    const copiedMap = await client.$transaction(async (tx) => {
      console.log(`Creating map copy with creatorId: ${req.userId}`);

      // 1. Create the new map copy with the current user as creator
      const newMap = await tx.map.create({
        data: {
          name,
          width: template.width,
          height: template.height,
          creatorId: parseInt(req.userId!), // This MUST be the current user
          accessCode,
          isTemplate: false,
          templateId: template.id, // Reference to original template
        },
      });

      console.log(
        `Created new map ${newMap.id} with creatorId ${newMap.creatorId}`
      );

      // 2. Copy all map elements
      if (template.mapElements.length > 0) {
        await tx.mapElement.createMany({
          data: template.mapElements.map((me) => ({
            mapId: newMap.id,
            elementId: me.elementId,
            x: me.x,
            y: me.y,
          })),
        });
      }

      // 3. Copy all spaces and their elements
      for (const mapSpace of template.mapSpaces) {
        const originalSpace = mapSpace.space;

        // Create a copy of the space with current user as owner
        const newSpace = await tx.space.create({
          data: {
            name: originalSpace.name,
            width: originalSpace.width,
            height: originalSpace.height,
            ownerId: parseInt(req.userId!), // Current user owns the copied space
            thumbnail: originalSpace.thumbnail,
          },
        });

        // Copy all elements within this space
        if (originalSpace.elements.length > 0) {
          await tx.spaceElement.createMany({
            data: originalSpace.elements.map((se) => ({
              spaceId: newSpace.id,
              elementId: se.elementId,
              x: se.x,
              y: se.y,
            })),
          });
        }

        // Link the new space to the new map at the same position
        await tx.mapSpace.create({
          data: {
            mapId: newMap.id,
            spaceId: newSpace.id,
            x: mapSpace.x,
            y: mapSpace.y,
          },
        });
      }

      return newMap;
    });

    // Automatically record a visit so the map shows in user's recents
    await client.userMapVisit.create({
      data: {
        userId: parseInt(req.userId!),
        mapId: copiedMap.id,
      },
    });

    console.log(
      `Template copy completed. Map ${copiedMap.id} created with owner ${copiedMap.creatorId}`
    );

    res.json({
      id: copiedMap.id,
      name: copiedMap.name,
      accessCode: copiedMap.accessCode,
      message:
        'Template copied successfully! You can now edit your own version.',
    });
  } catch (error) {
    console.error('Failed to copy template:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a shareable map from a space (generates access code)
userRouter.post('/create-map', userMiddleware, async (req, res) => {
  try {
    const { spaceId, name } = req.body;

    if (!spaceId || !name) {
      res.status(400).json({ message: 'Space ID and name are required' });
      return;
    }

    // Check if user owns the space
    const space = await client.space.findFirst({
      where: {
        id: parseInt(spaceId),
        ownerId: parseInt(req.userId!),
      },
      include: {
        elements: true,
      },
    });

    if (!space) {
      res.status(404).json({ message: 'Space not found or access denied' });
      return;
    }

    // Generate a unique access code
    const generateAccessCode = () => {
      return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    let accessCode: string = '';
    let isUnique = false;

    // Ensure access code is unique
    while (!isUnique) {
      accessCode = generateAccessCode();
      const existing = await client.map.findFirst({
        where: { accessCode },
      });
      if (!existing) {
        isUnique = true;
      }
    }

    // Create map from space
    const map = await client.map.create({
      data: {
        name,
        width: space.width,
        height: space.height,
        creatorId: parseInt(req.userId!),
        accessCode,
        isTemplate: false, // User-created maps are not templates
        mapElements: {
          create: space.elements.map((e) => ({
            elementId: e.elementId,
            x: e.x,
            y: e.y,
          })),
        },
      },
    });

    res.json({
      id: map.id,
      accessCode: map.accessCode,
      message: 'Map created successfully',
    });
  } catch (error) {
    console.error('Failed to create map:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add element to user's own map
userRouter.post('/map/:mapId/element', userMiddleware, async (req, res) => {
  const mapId = parseInt(req.params.mapId);
  const parsedData = req.body; // Should contain elementId, x, y

  try {
    // Check if map belongs to current user
    const map = await client.map.findFirst({
      where: {
        id: mapId,
        creatorId: parseInt(req.userId!),
      },
    });

    if (!map) {
      res.status(404).json({ message: 'Map not found or access denied' });
      return;
    }

    const mapElement = await client.mapElement.create({
      data: {
        mapId: mapId,
        elementId: parseInt(parsedData.elementId),
        x: parsedData.x,
        y: parsedData.y,
      },
    });

    res.json({ id: mapElement.id });
  } catch (error) {
    console.error('Failed to add element to map:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove element from user's own map
userRouter.delete('/map/:mapId/element', userMiddleware, async (req, res) => {
  const mapId = parseInt(req.params.mapId);
  const { id } = req.body;

  try {
    // Check if map belongs to current user
    const map = await client.map.findFirst({
      where: {
        id: mapId,
        creatorId: parseInt(req.userId!),
      },
    });

    if (!map) {
      res.status(404).json({ message: 'Map not found or access denied' });
      return;
    }

    await client.mapElement.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ message: 'Element removed' });
  } catch (error) {
    console.error('Failed to remove element from map:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add space to user's own map
userRouter.post('/map/:mapId/space', userMiddleware, async (req, res) => {
  const mapId = parseInt(req.params.mapId);
  const { spaceId, x, y } = req.body;

  try {
    // Check if map belongs to current user
    const map = await client.map.findFirst({
      where: {
        id: mapId,
        creatorId: parseInt(req.userId!),
      },
    });

    if (!map) {
      res.status(404).json({ message: 'Map not found or access denied' });
      return;
    }

    // Check if space exists
    const space = await client.space.findFirst({
      where: {
        id: parseInt(spaceId),
      },
    });

    if (!space) {
      res.status(404).json({ message: 'Space not found' });
      return;
    }

    const mapSpace = await client.mapSpace.create({
      data: {
        mapId: mapId,
        spaceId: parseInt(spaceId),
        x: x,
        y: y,
      },
    });

    res.json({ id: mapSpace.id });
  } catch (error) {
    console.error('Failed to add space to map:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove space from user's own map
userRouter.delete('/map/:mapId/space', userMiddleware, async (req, res) => {
  const mapId = parseInt(req.params.mapId);
  const { id } = req.body;

  try {
    // Check if map belongs to current user
    const map = await client.map.findFirst({
      where: {
        id: mapId,
        creatorId: parseInt(req.userId!),
      },
    });

    if (!map) {
      res.status(404).json({ message: 'Map not found or access denied' });
      return;
    }

    await client.mapSpace.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ message: 'Space removed from map' });
  } catch (error) {
    console.error('Failed to remove space from map:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
