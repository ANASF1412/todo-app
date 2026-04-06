import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getMe, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.patch("/update", authMiddleware, updateUser);

export default router;
