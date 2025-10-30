import { Router } from 'express';
import {
  UpdateMetadataSchema,
  UpdatePasswordSchema,
  UpdateAvatarInfoSchema,
} from '../../types';
import client from '@repo/db/client';
import { userMiddleware } from '../../middleware/user';
import { hash, compare } from '../../scrypt';

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

// Get user profile data
userRouter.get('/profile', userMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.userId!);

    // Calculate date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const user = await client.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        role: true,
        avatarId: true,
        avatarName: true,
        createdAt: true,
        avatar: {
          select: {
            id: true,
            imageUrl: true,
            name: true,
          },
        },
        _count: {
          select: {
            spaces: true,
            createdMaps: true,
            createdElements: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Count unique days of activity from the last 7 days
    const activityCount = await client.activityLog.count({
      where: {
        userId: userId,
        date: {
          gte: sevenDaysAgo,
        },
      },
    });

    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      avatarId: user.avatarId,
      avatarName: user.avatarName,
      avatar: user.avatar,
      createdAt: user.createdAt,
      activityLast7Days: activityCount,
      stats: {
        spacesCreated: user._count.spaces,
        mapsCreated: user._count.createdMaps,
        elementsCreated: user._count.createdElements,
      },
    });
  } catch (e) {
    console.error('Error fetching profile:', e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update password
userRouter.put('/password', userMiddleware, async (req, res) => {
  const parsedData = UpdatePasswordSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: 'Validation failed' });
    return;
  }

  try {
    const userId = parseInt(req.userId!);

    const user = await client.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Verify current password
    const isValidPassword = await compare(
      parsedData.data.currentPassword,
      user.password
    );

    if (!isValidPassword) {
      res.status(401).json({ message: 'Current password is incorrect' });
      return;
    }

    // Hash and update new password
    const hashedPassword = await hash(parsedData.data.newPassword);
    await client.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.json({ message: 'Password updated successfully' });
  } catch (e) {
    console.error('Error updating password:', e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update avatar info
userRouter.put('/avatar-info', userMiddleware, async (req, res) => {
  const parsedData = UpdateAvatarInfoSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: 'Validation failed' });
    return;
  }

  try {
    const userId = parseInt(req.userId!);
    const updateData: any = {};

    if (parsedData.data.avatarId !== undefined) {
      updateData.avatarId = parseInt(parsedData.data.avatarId);
    }
    if (parsedData.data.avatarName !== undefined) {
      updateData.avatarName = parsedData.data.avatarName;
    }

    await client.user.update({
      where: { id: userId },
      data: updateData,
    });

    res.json({ message: 'Avatar info updated successfully' });
  } catch (e) {
    console.error('Error updating avatar info:', e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete account
userRouter.delete('/account', userMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.userId!);

    await client.user.delete({
      where: { id: userId },
    });

    res.json({ message: 'Account deleted successfully' });
  } catch (e) {
    console.error('Error deleting account:', e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Track activity (called when user visits/opens the app)
userRouter.post('/activity', userMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.userId!);

    // Get today's date (midnight)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Upsert activity log - creates new entry if doesn't exist, does nothing if exists
    await client.activityLog.upsert({
      where: {
        userId_date: {
          userId: userId,
          date: today,
        },
      },
      update: {},
      create: {
        userId: userId,
        date: today,
      },
    });

    res.json({ message: 'Activity tracked' });
  } catch (e) {
    console.error('Error tracking activity:', e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get maps that user has recently joined
userRouter.get('/joined-maps', userMiddleware, async (req, res) => {
  try {
    const joinedMaps = await client.user_map_visits.findMany({
      where: {
        user_id: parseInt(req.userId!),
      },
      include: {
        maps: {
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
        visited_at: 'desc',
      },
      take: 20, // Limit to 20 most recent
    });

    res.json({
      maps: joinedMaps.map((visit) => ({
        id: visit.maps.id,
        name: visit.maps.name,
        width: visit.maps.width,
        height: visit.maps.height,
        dimensions: `${visit.maps.width}x${visit.maps.height}`,
        ownerId: visit.maps.creatorId,
        owner: visit.maps.creator.username,
        isOwner: visit.maps.creatorId === parseInt(req.userId!),
        lastVisited: visit.visited_at,
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
    await client.user_map_visits.upsert({
      where: {
        user_id_map_id: {
          user_id: parseInt(req.userId!),
          map_id: parseInt(mapId),
        },
      },
      update: {
        visited_at: new Date(),
      },
      create: {
        user_id: parseInt(req.userId!),
        map_id: parseInt(mapId),
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
    await client.user_map_visits.create({
      data: {
        user_id: parseInt(req.userId!),
        map_id: copiedMap.id,
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
