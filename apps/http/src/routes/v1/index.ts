import { Router } from "express";
import { userRouter } from "./user.js";
import { spaceRouter } from "./space.js";
import { adminRouter } from "./admin.js";
import { PrismaClient } from 'db';

const prisma = new PrismaClient();

export const router: Router = Router();

// Sign in route - authenticate user
router.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const user = await prisma.user.findUnique({
            where: { username },
            include: { avatar: true }
        });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.json({ 
            message: "Sign in successful", 
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Sign up route - create new user
router.post("/signup", async (req, res) => {
    try {
        const { username, password, avatarId } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            return res.status(409).json({ error: "Username already exists" });
        }

        const newUser = await prisma.user.create({
            data: {
                username,
                password, // In production, hash this password!
                avatarId: avatarId || null,
                role: 'user'
            },
            include: { avatar: true }
        });

        res.status(201).json({ 
            message: "User created successfully", 
            user: {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role,
                avatar: newUser.avatar
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get all elements
router.get("/elements", async (req, res) => {
    try {
        const elements = await prisma.element.findMany();
        res.json({ elements });
    } catch (error) {
        console.error('Elements fetch error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get all avatars
router.get("/avatars", async (req, res) => {
    try {
        const avatars = await prisma.avatar.findMany();
        res.json({ avatars });
    } catch (error) {
        console.error('Avatars fetch error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.use("/users", userRouter);
router.use("/spaces", spaceRouter);
router.use("/admins", adminRouter);


