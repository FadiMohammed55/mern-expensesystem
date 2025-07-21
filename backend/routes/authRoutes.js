import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import rateLimit from "../middleware/rateLimit.js";

const router = express.Router();

router.post("/register", rateLimit, registerUser);
router.post("/login", rateLimit, loginUser);

export default router;
