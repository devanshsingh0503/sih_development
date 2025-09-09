import express from "express";
import { getRoutes, createRoute } from "../controllers/routeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getRoutes);
router.post("/", authMiddleware(["ADMIN"]), createRoute);

export default router;