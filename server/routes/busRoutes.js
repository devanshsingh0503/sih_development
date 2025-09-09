import express from "express";
import { createBus, updateBusLocation, getBus } from "../controllers/busController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only admin can create buses
router.post("/", authMiddleware(["ADMIN"]), createBus);

// Only driver can update bus location
router.post("/:id/location", authMiddleware(["DRIVER"]), updateBusLocation);

router.get("/:id", getBus);

export default router;