// src/controllers/busController.js

import prisma from "../config/prisma.js";
import { calculateDistance } from "../utils/geoUtils.js";

// A simple in-memory cache to store the last known location of each bus
const lastKnownLocation = {};

export const createBus = async (req, res) => {
  try {
    const { number, routeId } = req.body;
    const bus = await prisma.bus.create({
      data: { number, routeId },
    });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBusLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { lat, lng, occupancy } = req.body;

    const newLocation = { lat, lng };
    const lastLocation = lastKnownLocation[id];
    const MIN_DISTANCE_METERS = 200;

    // Check if the bus has moved far enough from its last known location
    if (lastLocation) {
      const distanceTraveled = calculateDistance(
        lastLocation.lat,
        lastLocation.lng,
        newLocation.lat,
        newLocation.lng
      );

      // If the bus has moved less than 200 meters, don't update the database
      if (distanceTraveled < MIN_DISTANCE_METERS) {
        // Update the in-memory cache even if we don't hit the DB, to track the latest location
        lastKnownLocation[id] = newLocation; 
        return res.status(200).json({ message: "Bus has not moved far enough to update." });
      }
    }

    // Update the database with the new location and occupancy
    const updatedBus = await prisma.bus.update({
      where: { id },
      data: { lat, lng, occupancy },
    });

    // Update the last known location in the in-memory cache
    lastKnownLocation[id] = newLocation;

    res.json(updatedBus);
  } catch (err) {
    console.error("Error updating bus location:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getBus = async (req, res) => {
  try {
    const { id } = req.params;
    const bus = await prisma.bus.findUnique({
      where: { id },
      include: { route: true },
    });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};