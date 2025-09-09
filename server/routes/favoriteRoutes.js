// src/routes/favoriteRoutes.js
import express from "express";
import { addFavoriteRoute, getFavoriteRoutes } from "../controllers/favoriteController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware(["COMMUTER"]), addFavoriteRoute);
router.get("/", authMiddleware(["COMMUTER"]), getFavoriteRoutes);

export default router;