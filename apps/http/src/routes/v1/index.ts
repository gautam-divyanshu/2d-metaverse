import { Router } from "express";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { adminRouter } from "./admin";
import { SigninSchema, SignupSchema } from "../../types";
import { hash, compare } from "../../scrypt";
import client from "@repo/db/client";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";

export const router = Router();

// Database health check endpoint
router.get("/health", async (req, res) => {
  try {
    console.log("Testing database connection...");
    await client.$connect();
    console.log("Database connection successful");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Database connection failed:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ status: "error", database: "disconnected", error: errorMessage });
  }
});

router.post("/signup", async (req, res) => {
  console.log("inside signup");
  console.log("Environment check - DATABASE_URL exists:", !!process.env.DATABASE_URL);
  
  // check the user
  const parsedData = SignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log("parsed data incorrect", parsedData.error);
    res.status(400).json({ message: "Validation failed", errors: parsedData.error.issues });
    return;
  }

  try {
    console.log("Attempting to hash password...");
    const hashedPassword = await hash(parsedData.data.password);
    console.log("Password hashed successfully");

    console.log("Attempting database connection...");
    const user = await client.user.create({
      data: {
        username: parsedData.data.username,
        password: hashedPassword,
        role: parsedData.data.type === "admin" ? "admin" : "user",
        avatarId: parsedData.data.avatarId ? parseInt(parsedData.data.avatarId) : undefined,
      },
    });
    console.log("User created successfully:", user.id);
    res.json({
      userId: user.id,
    });
  } catch (e) {
    console.log("Database error occurred:");
    console.error(e);
    
    // Check if it's a specific Prisma error
    if (e && typeof e === 'object' && 'code' in e) {
      if (e.code === 'P2002') {
        res.status(400).json({ message: "Username already exists" });
      } else if (e.code === 'P1001') {
        res.status(500).json({ message: "Database connection failed" });
      } else {
        res.status(500).json({ message: "Database error", code: e.code });
      }
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

router.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({ message: "Validation failed" });
    return;
  }

  try {
    const user = await client.user.findUnique({
      where: {
        username: parsedData.data.username,
      },
    });

    if (!user) {
      res.status(403).json({ message: "User not found" });
      return;
    }
    const isValid = await compare(parsedData.data.password, user.password);

    if (!isValid) {
      res.status(403).json({ message: "Invalid password" });
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
      avatarId: user.avatarId
    });
  } catch (e) {
    res.status(400).json({ message: "Internal server error" });
  }
});

router.get("/elements", async (req, res) => {
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

router.get("/avatars", async (req, res) => {
  const avatars = await client.avatar.findMany();

  res.json({
    avatars: avatars.map((x) => ({
      id: x.id,
      imageUrl: x.imageUrl,
      name: x.name,
    })),
  });
});

router.get("/maps", async (req, res) => {
  const maps = await client.map.findMany();

  res.json({
    maps: maps.map((m) => ({
      id: m.id,
      name: m.name,
      width: m.width,
      height: m.height,
      dimensions: `${m.width}x${m.height}`,
    })),
  });
});

router.use("/user", userRouter);
router.use("/space", spaceRouter);
router.use("/admin", adminRouter);
