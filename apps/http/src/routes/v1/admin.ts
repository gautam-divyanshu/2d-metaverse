import { Router } from 'express';
import { adminMiddleware } from '../../middleware/admin';
import {
  AddElementSchema,
  AddMapElementSchema,
  AddMapSpaceSchema,
  CreateAvatarSchema,
  CreateElementSchema,
  CreateMapSchema,
  UpdateElementSchema,
  DeleteElementSchema,
} from '../../types';
import client from '@repo/db/client';
export const adminRouter = Router();
adminRouter.use(adminMiddleware);

adminRouter.post('/element', async (req, res) => {
  const parsedData = CreateElementSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: 'Validation failed' });
    return;
  }

  const element = await client.element.create({
    data: {
      width: parsedData.data.width,
      height: parsedData.data.height,
      isStatic: parsedData.data.static,
      imageUrl: parsedData.data.imageUrl,
      creatorId: parseInt(req.userId!), // Set the creator to the current admin user
    },
  });

  res.json({
    id: element.id,
  });
});

adminRouter.put('/element/:elementId', async (req, res) => {
  const parsedData = UpdateElementSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: 'Validation failed' });
    return;
  }

  // Check if the element belongs to the current admin
  const element = await client.element.findFirst({
    where: {
      id: parseInt(req.params.elementId),
      creatorId: parseInt(req.userId!),
    },
  });

  if (!element) {
    res.status(404).json({ message: 'Element not found or access denied' });
    return;
  }

  await client.element.update({
    where: {
      id: parseInt(req.params.elementId),
    },
    data: {
      imageUrl: parsedData.data.imageUrl,
    },
  });

  res.json({ message: 'Element updated' });
});

adminRouter.post('/avatar', async (req, res) => {
  const parsedData = CreateAvatarSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: 'Validation failed' });
    return;
  }
  const avatar = await client.avatar.create({
    data: {
      name: parsedData.data.name,
      imageUrl: parsedData.data.imageUrl,
      creatorId: parseInt(req.userId!), // Set the creator to the current admin user
    },
  });
  res.json({ avatarId: avatar.id });
});

adminRouter.post('/map', async (req, res) => {
  const parsedData = CreateMapSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: 'Validation failed' });
    return;
  }

  // Check if this should be a template or a regular map
  const isTemplate = req.body.isTemplate === true;

  const mapData: any = {
    name: parsedData.data.name,
    width: parseInt(parsedData.data.dimensions.split('x')[0]),
    height: parseInt(parsedData.data.dimensions.split('x')[1]),
    creatorId: parseInt(req.userId!),
    isTemplate: isTemplate,
    mapElements: {
      create: parsedData.data.defaultElements.map((e) => ({
        elementId: parseInt(e.elementId),
        x: e.x,
        y: e.y,
      })),
    },
  };

  // Only add accessCode if it's not a template
  if (!isTemplate && req.body.accessCode) {
    mapData.accessCode = req.body.accessCode;
  }

  const map = await client.map.create({
    data: mapData,
  });

  res.json({
    id: map.id,
  });
});

// Get elements created by current admin
adminRouter.get('/elements', async (req, res) => {
  const elements = await client.element.findMany({
    where: {
      creatorId: parseInt(req.userId!),
    },
    select: {
      id: true,
      width: true,
      height: true,
      imageUrl: true,
      isStatic: true,
    },
  });
  res.json(elements);
});

// Get avatars created by current admin
adminRouter.get('/avatars', async (req, res) => {
  const avatars = await client.avatar.findMany({
    where: {
      creatorId: parseInt(req.userId!),
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
    },
  });
  res.json(avatars);
});

// Get maps created by current admin
adminRouter.get('/maps', async (req, res) => {
  const maps = await client.map.findMany({
    where: {
      creatorId: parseInt(req.userId!),
    },
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
      accessCode: m.accessCode, // Will be null for templates
      isTemplate: m.isTemplate,
    })),
  });
});

// Get specific map details with elements
adminRouter.get('/map/:mapId', async (req, res) => {
  const mapId = parseInt(req.params.mapId);

  const map = await client.map.findFirst({
    where: {
      id: mapId,
      creatorId: parseInt(req.userId!), // Only allow access to own maps
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
});

// Add element to map
adminRouter.post('/map/:mapId/element', async (req, res) => {
  const mapId = parseInt(req.params.mapId);
  const parsedData = AddMapElementSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({ message: 'Validation failed' });
    return;
  }

  // Check if map belongs to current admin
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
      elementId: parseInt(parsedData.data.elementId),
      x: parsedData.data.x,
      y: parsedData.data.y,
    },
  });

  res.json({ id: mapElement.id });
});

// Remove element from map
adminRouter.delete('/map/:mapId/element', async (req, res) => {
  const mapId = parseInt(req.params.mapId);
  const parsedData = DeleteElementSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({ message: 'Validation failed' });
    return;
  }

  // Check if map belongs to current admin
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
      id: parseInt(parsedData.data.id),
    },
  });

  res.json({ message: 'Element removed' });
});

// Add space to map
adminRouter.post('/map/:mapId/space', async (req, res) => {
  const mapId = parseInt(req.params.mapId);
  const parsedData = AddMapSpaceSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({ message: 'Validation failed' });
    return;
  }

  // Check if map belongs to current admin
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

  // Check if space exists and validate placement
  const space = await client.space.findFirst({
    where: {
      id: parseInt(parsedData.data.spaceId),
    },
  });

  if (!space) {
    res.status(404).json({ message: 'Space not found' });
    return;
  }

  // Check if the space fits within the map bounds
  if (
    parsedData.data.x + space.width > map.width ||
    parsedData.data.y + space.height > map.height ||
    parsedData.data.x < 0 ||
    parsedData.data.y < 0
  ) {
    res.status(400).json({ message: "Space doesn't fit within map bounds" });
    return;
  }

  // Check for collisions with existing elements and spaces
  const existingMapElements = await client.mapElement.findMany({
    where: { mapId: mapId },
    include: { element: true },
  });

  const existingMapSpaces = await client.mapSpace.findMany({
    where: { mapId: mapId },
    include: { space: true },
  });

  // Check collision with elements
  for (const mapElement of existingMapElements) {
    const elemEndX = mapElement.x + mapElement.element.width;
    const elemEndY = mapElement.y + mapElement.element.height;
    const spaceEndX = parsedData.data.x + space.width;
    const spaceEndY = parsedData.data.y + space.height;

    if (
      !(
        parsedData.data.x >= elemEndX ||
        spaceEndX <= mapElement.x ||
        parsedData.data.y >= elemEndY ||
        spaceEndY <= mapElement.y
      )
    ) {
      res.status(400).json({ message: 'Space collides with existing element' });
      return;
    }
  }

  // Check collision with other spaces
  for (const mapSpace of existingMapSpaces) {
    const otherSpaceEndX = mapSpace.x + mapSpace.space.width;
    const otherSpaceEndY = mapSpace.y + mapSpace.space.height;
    const spaceEndX = parsedData.data.x + space.width;
    const spaceEndY = parsedData.data.y + space.height;

    if (
      !(
        parsedData.data.x >= otherSpaceEndX ||
        spaceEndX <= mapSpace.x ||
        parsedData.data.y >= otherSpaceEndY ||
        spaceEndY <= mapSpace.y
      )
    ) {
      res.status(400).json({ message: 'Space collides with existing space' });
      return;
    }
  }

  const mapSpace = await client.mapSpace.create({
    data: {
      mapId: mapId,
      spaceId: parseInt(parsedData.data.spaceId),
      x: parsedData.data.x,
      y: parsedData.data.y,
    },
  });

  res.json({ id: mapSpace.id });
});

// Remove space from map
adminRouter.delete('/map/:mapId/space', async (req, res) => {
  const mapId = parseInt(req.params.mapId);
  const parsedData = DeleteElementSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({ message: 'Validation failed' });
    return;
  }

  // Check if map belongs to current admin
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
      id: parseInt(parsedData.data.id),
    },
  });

  res.json({ message: 'Space removed from map' });
});
