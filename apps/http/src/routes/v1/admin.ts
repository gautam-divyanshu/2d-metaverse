import { Router } from "express";
import { adminMiddleware } from "../../middleware/admin";
import {
  AddElementSchema,
  CreateAvatarSchema,
  CreateElementSchema,
  CreateMapSchema,
  UpdateElementSchema,
} from "../../types";
import client from "@repo/db/client";
export const adminRouter = Router();
adminRouter.use(adminMiddleware);

adminRouter.post("/element", async (req, res) => {
  const parsedData = CreateElementSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }

  const element = await client.element.create({
    data: {
      width: parsedData.data.width,
      height: parsedData.data.height,
      isStatic: parsedData.data.static,
      imageUrl: parsedData.data.imageUrl,
      creatorId: req.userId!, // Set the creator to the current admin user
    },
  });

  res.json({
    id: element.id,
  });
});

adminRouter.put("/element/:elementId", async (req, res) => {
  const parsedData = UpdateElementSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
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
    res.status(404).json({ message: "Element not found or access denied" });
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
  
  res.json({ message: "Element updated" });
});

adminRouter.post("/avatar", async (req, res) => {
  const parsedData = CreateAvatarSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
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

adminRouter.post("/map", async (req, res) => {
  const parsedData = CreateMapSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  const map = await client.map.create({
    data: {
      name: parsedData.data.name,
      width: parseInt(parsedData.data.dimensions.split("x")[0]),
      height: parseInt(parsedData.data.dimensions.split("x")[1]),
      creatorId: parseInt(req.userId!), // Set the creator to the current admin user
      mapElements: {
        create: parsedData.data.defaultElements.map((e) => ({
          elementId: parseInt(e.elementId),
          x: e.x,
          y: e.y,
        })),
      },
    },
  });

  res.json({
    id: map.id,
  });
});

// Get elements created by current admin
adminRouter.get("/elements", async (req, res) => {
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
adminRouter.get("/avatars", async (req, res) => {
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
adminRouter.get("/maps", async (req, res) => {
  const maps = await client.map.findMany({
    where: {
      creatorId: parseInt(req.userId!),
    },
    select: {
      id: true,
      name: true,
      width: true,
      height: true,
    },
  });
  res.json(maps);
});
