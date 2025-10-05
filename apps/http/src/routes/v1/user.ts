import { Router } from "express";
import { PrismaClient } from 'db';

const prisma = new PrismaClient();

export const userRouter: Router = Router();

// Update user metadata (avatar)
userRouter.post("/metadata", async (req, res) => {
    try {
        const { userId, avatarId } = req.body;
        
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { avatarId },
            include: { avatar: true }
        });

        res.json({ 
            message: "User metadata updated", 
            user: {
                id: updatedUser.id,
                username: updatedUser.username,
                avatar: updatedUser.avatar
            }
        });
    } catch (error) {
        console.error('Update metadata error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get bulk user metadata
userRouter.get("/metadata/bulk", async (req, res) => {
    try {
        const { userIds } = req.query;
        
        if (!userIds) {
            return res.status(400).json({ error: "User IDs are required" });
        }

        const userIdArray = Array.isArray(userIds) ? userIds : [userIds];
        const numericIds = userIdArray.map(id => parseInt(id as string));
        
        const users = await prisma.user.findMany({
            where: {
                id: { in: numericIds }
            },
            select: {
                id: true,
                username: true,
                avatar: true
            }
        });

        res.json({ users });
    } catch (error) {
        console.error('Bulk metadata fetch error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});