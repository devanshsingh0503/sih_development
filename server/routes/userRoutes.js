// src/routes/userRoutes.js
import express from "express";
import { updateUserRole } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to update a user's role. Protected by the authMiddleware for admins.
router.put("/users/role", authMiddleware(["admin"]), updateUserRole);

export default router;