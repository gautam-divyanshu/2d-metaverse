import { Router } from "express";
import { userRouter } from "./user.js";
import { spaceRouter } from "./space.js";
import { adminRouter } from "./admin.js";


export const router = Router();

router.get("/signin", (req, res) => {
    res.json({ message: "Sign In Route" });
});

router.get("/signup", (req, res) => {
    res.json({ message: "Sign Up Route" });
});

router.get("/elements", (req, res) => {});

router.get("/avatars", (req, res) => {});

router.use("/users", userRouter);
router.use("/spaces", spaceRouter);
router.use("/admins", adminRouter);


