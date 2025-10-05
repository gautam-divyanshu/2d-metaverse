import { Router } from "express";
import { PrismaClient } from 'db';

const prisma = new PrismaClient();

export const adminRouter: Router = Router();

// Create a new element
adminRouter.post("/element", async (req, res) => {
    try {
        const { width, height, imageUrl, isStatic } = req.body;
        
        if (!width || !height || !imageUrl) {
            return res.status(400).json({ error: "Width, height, and image URL are required" });
        }

        const element = await prisma.element.create({
            data: {
                width,
                height,
                imageUrl,
                isStatic: isStatic || false
            }
        });

        res.status(201).json({ 
            message: "Element created successfully", 
            element 
        });
    } catch (error) {
        console.error('Create element error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update an element
adminRouter.put("/element/:elementId", async (req, res) => {
    try {
        const { elementId } = req.params;
        const { width, height, imageUrl, isStatic } = req.body;
        const id = parseInt(elementId);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid element ID" });
        }

        const updatedElement = await prisma.element.update({
            where: { id },
            data: {
                ...(width && { width }),
                ...(height && { height }),
                ...(imageUrl && { imageUrl }),
                ...(isStatic !== undefined && { isStatic })
            }
        });

        res.json({ 
            message: "Element updated successfully", 
            element: updatedElement 
        });
    } catch (error) {
        console.error('Update element error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Create a new avatar
adminRouter.post("/avatar", async (req, res) => {
    try {
        const { name, imageUrl } = req.body;
        
        if (!name || !imageUrl) {
            return res.status(400).json({ error: "Name and image URL are required" });
        }

        const avatar = await prisma.avatar.create({
            data: {
                name,
                imageUrl
            }
        });

        res.status(201).json({ 
            message: "Avatar created successfully", 
            avatar 
        });
    } catch (error) {
        console.error('Create avatar error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get all avatars
adminRouter.get("/avatar", async (req, res) => {
    try {
        const avatars = await prisma.avatar.findMany();
        res.json({ avatars });
    } catch (error) {
        console.error('Get avatars error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Create or get a map
adminRouter.post("/map", async (req, res) => {
    try {
        const { name, width, height } = req.body;
        
        if (!name || !width || !height) {
            return res.status(400).json({ error: "Name, width, and height are required" });
        }

        const map = await prisma.map.create({
            data: {
                name,
                width,
                height
            }
        });

        res.status(201).json({ 
            message: "Map created successfully", 
            map 
        });
    } catch (error) {
        console.error('Create map error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get a specific map with its elements
adminRouter.get("/map/:mapId", async (req, res) => {
    try {
        const { mapId } = req.params;
        const id = parseInt(mapId);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid map ID" });
        }

        const map = await prisma.map.findUnique({
            where: { id },
            include: {
                mapElements: {
                    include: {
                        element: true
                    }
                }
            }
        });

        if (!map) {
            return res.status(404).json({ error: "Map not found" });
        }

        res.json({ map });
    } catch (error) {
        console.error('Get map error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});