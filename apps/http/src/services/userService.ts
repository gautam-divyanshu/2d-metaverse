import client from '@repo/db/client';
import { UpdateMetadataSchema } from '../types';

export interface UpdateMetadataData {
  avatarId: string;
}

export interface BulkMetadataData {
  ids: string;
}

export interface MapVisitData {
  mapId: string;
}

export interface CopyTemplateData {
  templateId: string;
  name: string;
}

export interface CreateMapData {
  spaceId: string;
  name: string;
}

export interface MapElementData {
  elementId: string;
  x: number;
  y: number;
}

export interface DeleteElementData {
  id: string;
}

export interface MapSpaceData {
  spaceId: string;
  x: number;
  y: number;
}

export async function updateUserMetadata(
  userId: number,
  data: UpdateMetadataData
) {
  const parsedData = UpdateMetadataSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error('Validation failed');
  }

  await client.user.update({
    where: { id: userId },
    data: {
      avatarId: parseInt(parsedData.data.avatarId),
    },
  });

  return { message: 'Metadata updated' };
}

export async function getBulkMetadata(userIds: number[]) {
  const metadata = await client.user.findMany({
    where: {
      id: { in: userIds },
    },
    select: {
      avatar: true,
      id: true,
    },
  });

  return {
    avatars: metadata.map((m) => ({
      userId: m.id,
      avatarId: m.avatar?.imageUrl,
    })),
  };
}

export async function getJoinedMaps(userId: number) {
  const joinedMaps = await client.userMapVisit.findMany({
    where: { userId },
    include: {
      map: {
        include: {
          creator: { select: { username: true } },
        },
      },
    },
    orderBy: { visitedAt: 'desc' },
    take: 20,
  });

  return {
    maps: joinedMaps.map((visit) => ({
      id: visit.map.id,
      name: visit.map.name,
      width: visit.map.width,
      height: visit.map.height,
      dimensions: `${visit.map.width}x${visit.map.height}`,
      ownerId: visit.map.creatorId,
      owner: visit.map.creator.username,
      isOwner: visit.map.creatorId === userId,
      lastVisited: visit.visitedAt,
    })),
  };
}

export async function recordMapVisit(userId: number, data: MapVisitData) {
  const { mapId } = data;

  await client.userMapVisit.upsert({
    where: {
      userId_mapId: {
        userId,
        mapId: parseInt(mapId),
      },
    },
    update: { visitedAt: new Date() },
    create: {
      userId,
      mapId: parseInt(mapId),
    },
  });

  return { message: 'Map visit recorded' };
}

export async function getOwnedMaps(userId: number) {
  const ownedMaps = await client.map.findMany({
    where: { creatorId: userId },
    include: {
      creator: { select: { username: true } },
    },
    orderBy: { id: 'desc' },
  });

  return {
    maps: ownedMaps.map((map) => ({
      id: map.id,
      name: map.name,
      width: map.width,
      height: map.height,
      dimensions: `${map.width}x${map.height}`,
      ownerId: map.creatorId,
      owner: map.creator.username,
      isOwner: true,
      accessCode: map.accessCode,
      isTemplate: map.isTemplate,
    })),
  };
}

export async function copyTemplate(userId: number, data: CopyTemplateData) {
  const { templateId, name } = data;

  // Get the template with all its related data
  const template = await client.map.findFirst({
    where: {
      id: parseInt(templateId),
      isTemplate: true,
    },
    include: {
      mapElements: { include: { element: true } },
      mapSpaces: {
        include: {
          space: { include: { elements: { include: { element: true } } } },
        },
      },
    },
  });

  if (!template) {
    throw new Error('Template not found');
  }

  // Generate unique access code
  const generateAccessCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  let accessCode: string;
  let isUnique = false;

  while (!isUnique) {
    accessCode = generateAccessCode();
    const existing = await client.map.findFirst({ where: { accessCode } });
    if (!existing) {
      isUnique = true;
    }
  }

  // Use transaction to ensure all-or-nothing copy
  const copiedMap = await client.$transaction(async (tx) => {
    // 1. Create the new map copy
    const newMap = await tx.map.create({
      data: {
        name,
        width: template.width,
        height: template.height,
        creatorId: userId,
        accessCode,
        isTemplate: false,
        templateId: template.id,
      },
    });

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

      const newSpace = await tx.space.create({
        data: {
          name: originalSpace.name,
          width: originalSpace.width,
          height: originalSpace.height,
          ownerId: userId,
          thumbnail: originalSpace.thumbnail,
        },
      });

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

  // Record a visit
  await client.userMapVisit.create({
    data: {
      userId,
      mapId: copiedMap.id,
    },
  });

  return {
    id: copiedMap.id,
    name: copiedMap.name,
    accessCode: copiedMap.accessCode,
    message: 'Template copied successfully! You can now edit your own version.',
  };
}

export async function createMapFromSpace(userId: number, data: CreateMapData) {
  const { spaceId, name } = data;

  // Check if user owns the space
  const space = await client.space.findFirst({
    where: {
      id: parseInt(spaceId),
      ownerId: userId,
    },
    include: { elements: true },
  });

  if (!space) {
    throw new Error('Space not found or access denied');
  }

  // Generate unique access code
  const generateAccessCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  let accessCode: string = '';
  let isUnique = false;

  while (!isUnique) {
    accessCode = generateAccessCode();
    const existing = await client.map.findFirst({ where: { accessCode } });
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
      creatorId: userId,
      accessCode,
      isTemplate: false,
      mapElements: {
        create: space.elements.map((e) => ({
          elementId: e.elementId,
          x: e.x,
          y: e.y,
        })),
      },
    },
  });

  return {
    id: map.id,
    accessCode: map.accessCode,
    message: 'Map created successfully',
  };
}

export async function addElementToMap(
  userId: number,
  mapId: number,
  data: MapElementData
) {
  // Check if map belongs to current user
  const map = await client.map.findFirst({
    where: { id: mapId, creatorId: userId },
  });

  if (!map) {
    throw new Error('Map not found or access denied');
  }

  const mapElement = await client.mapElement.create({
    data: {
      mapId,
      elementId: parseInt(data.elementId),
      x: data.x,
      y: data.y,
    },
  });

  return { id: mapElement.id };
}

export async function removeElementFromMap(
  userId: number,
  mapId: number,
  data: DeleteElementData
) {
  // Check if map belongs to current user
  const map = await client.map.findFirst({
    where: { id: mapId, creatorId: userId },
  });

  if (!map) {
    throw new Error('Map not found or access denied');
  }

  await client.mapElement.delete({
    where: { id: parseInt(data.id) },
  });

  return { message: 'Element removed' };
}

export async function addSpaceToMap(
  userId: number,
  mapId: number,
  data: MapSpaceData
) {
  // Check if map belongs to current user
  const map = await client.map.findFirst({
    where: { id: mapId, creatorId: userId },
  });

  if (!map) {
    throw new Error('Map not found or access denied');
  }

  // Check if space exists
  const space = await client.space.findFirst({
    where: { id: parseInt(data.spaceId) },
  });

  if (!space) {
    throw new Error('Space not found');
  }

  const mapSpace = await client.mapSpace.create({
    data: {
      mapId,
      spaceId: parseInt(data.spaceId),
      x: data.x,
      y: data.y,
    },
  });

  return { id: mapSpace.id };
}

export async function removeSpaceFromMap(
  userId: number,
  mapId: number,
  data: DeleteElementData
) {
  // Check if map belongs to current user
  const map = await client.map.findFirst({
    where: { id: mapId, creatorId: userId },
  });

  if (!map) {
    throw new Error('Map not found or access denied');
  }

  await client.mapSpace.delete({
    where: { id: parseInt(data.id) },
  });

  return { message: 'Space removed from map' };
}
