import { Router } from "express";
import { UpdateMetadataSchema, UpdatePasswordSchema, UpdateAvatarInfoSchema } from "../../types";
import client from "@repo/db/client";
import { userMiddleware } from "../../middleware/user";
import { hash, compare } from "../../scrypt";

export const userRouter = Router();

userRouter.post("/metadata", userMiddleware, async (req, res) => {
  const parsedData = UpdateMetadataSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log("parsed data incorrect");
    res.status(400).json({ message: "Validation failed" });
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
    res.json({ message: "Metadata updated" });
  } catch (e) {
    console.log("error");
    res.status(400).json({ message: "Internal server error" });
  }
});

userRouter.get("/metadata/bulk", async (req, res) => {
  const userIdString = (req.query.ids ?? "[]") as string;
  const userIds = userIdString
    .slice(1, userIdString?.length - 1)
    .split(",")
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
userRouter.get("/profile", userMiddleware, async (req, res) => {
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
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Count unique days of activity from the last 7 days
    const activityCount = await client.activityLog.count({
      where: {
        userId: userId,
        date: {
          gte: sevenDaysAgo
        }
      }
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
    console.error("Error fetching profile:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update password
userRouter.put("/password", userMiddleware, async (req, res) => {
  const parsedData = UpdatePasswordSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }

  try {
    const userId = parseInt(req.userId!);
    
    const user = await client.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Verify current password
    const isValidPassword = await compare(
      parsedData.data.currentPassword,
      user.password
    );

    if (!isValidPassword) {
      res.status(401).json({ message: "Current password is incorrect" });
      return;
    }

    // Hash and update new password
    const hashedPassword = await hash(parsedData.data.newPassword);
    await client.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.json({ message: "Password updated successfully" });
  } catch (e) {
    console.error("Error updating password:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update avatar info
userRouter.put("/avatar-info", userMiddleware, async (req, res) => {
  const parsedData = UpdateAvatarInfoSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
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

    res.json({ message: "Avatar info updated successfully" });
  } catch (e) {
    console.error("Error updating avatar info:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete account
userRouter.delete("/account", userMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.userId!);
    
    await client.user.delete({
      where: { id: userId },
    });

    res.json({ message: "Account deleted successfully" });
  } catch (e) {
    console.error("Error deleting account:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Track activity (called when user visits/opens the app)
userRouter.post("/activity", userMiddleware, async (req, res) => {
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
          date: today
        }
      },
      update: {},
      create: {
        userId: userId,
        date: today
      }
    });

    res.json({ message: "Activity tracked" });
  } catch (e) {
    console.error("Error tracking activity:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});
