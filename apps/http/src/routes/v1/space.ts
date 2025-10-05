import { Router } from "express";
import { PrismaClient } from 'db';

const prisma = new PrismaClient();

export const spaceRouter: Router = Router();

// Create a new space
spaceRouter.post("/", async (req, res) => {
    try {
        const { name, width, height, ownerId, thumbnail } = req.body;
        
        if (!name || !width || !height || !ownerId) {
            return res.status(400).json({ error: "Name, width, height, and owner ID are required" });
        }

        const newSpace = await prisma.space.create({
            data: {
                name,
                width,
                height,
                ownerId,
                thumbnail
            },
            include: {
                owner: {
                    select: { id: true, username: true }
                }
            }
        });

        res.status(201).json({ 
            message: "Space created successfully", 
            space: newSpace 
        });
    } catch (error) {
        console.error('Create space error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get a specific space
spaceRouter.get("/:spaceid", async (req, res) => {
    try {
        const { spaceid } = req.params;
        const spaceId = parseInt(spaceid);
        
        if (isNaN(spaceId)) {
            return res.status(400).json({ error: "Invalid space ID" });
        }

        const space = await prisma.space.findUnique({
            where: { id: spaceId },
            include: {
                owner: {
                    select: { id: true, username: true }
                },
                elements: {
                    include: {
                        element: true
                    }
                }
            }
        });

        if (!space) {
            return res.status(404).json({ error: "Space not found" });
        }

        res.json({ space });
    } catch (error) {
        console.error('Get space error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete a space
spaceRouter.delete("/:spaceid", async (req, res) => {
    try {
        const { spaceid } = req.params;
        const spaceId = parseInt(spaceid);
        
        if (isNaN(spaceId)) {
            return res.status(400).json({ error: "Invalid space ID" });
        }

        await prisma.space.delete({
            where: { id: spaceId }
        });

        res.json({ message: "Space deleted successfully" });
    } catch (error) {
        console.error('Delete space error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get all spaces
spaceRouter.get("/all", async (req, res) => {
    try {
        const spaces = await prisma.space.findMany({
            include: {
                owner: {
                    select: { id: true, username: true }
                }
            }
        });

        res.json({ spaces });
    } catch (error) {
        console.error('Get all spaces error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Add element to space
spaceRouter.post("/element", async (req, res) => {
    try {
        const { spaceId, elementId, x, y } = req.body;
        
        if (!spaceId || !elementId || x === undefined || y === undefined) {
            return res.status(400).json({ error: "Space ID, element ID, x, and y coordinates are required" });
        }

        const spaceElement = await prisma.spaceElement.create({
            data: {
                spaceId,
                elementId,
                x,
                y
            },
            include: {
                element: true,
                space: true
            }
        });

        res.status(201).json({ 
            message: "Element added to space", 
            spaceElement 
        });
    } catch (error) {
        console.error('Add element to space error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Remove element from space
spaceRouter.delete("/element", async (req, res) => {
    try {
        const { spaceElementId } = req.body;
        
        if (!spaceElementId) {
            return res.status(400).json({ error: "Space element ID is required" });
        }

        await prisma.spaceElement.delete({
            where: { id: spaceElementId }
        });

        res.json({ message: "Element removed from space" });
    } catch (error) {
        console.error('Remove element from space error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});