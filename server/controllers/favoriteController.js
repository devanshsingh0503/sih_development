// src/controllers/favoriteController.js
import prisma from "../config/prisma.js";

// Controller to add a route to a commuter's favorites
export const addFavoriteRoute = async (req, res) => {
  try {
    const { routeId } = req.body;
    const commuterId = req.user.id; // Get the commuter's ID from the authenticated token

    const favorite = await prisma.favoriteRoute.create({
      data: {
        commuterId,
        routeId,
      },
      include: {
        route: true, // Optionally include the full route details in the response
      },
    });

    res.status(201).json({ message: "Route added to favorites", favorite });
  } catch (err) {
    res.status(500).json({ error: "Failed to add favorite route." });
  }
};

// Controller to get a commuter's favorite routes
export const getFavoriteRoutes = async (req, res) => {
  try {
    const commuterId = req.user.id; // Get the commuter's ID from the authenticated token

    const favorites = await prisma.favoriteRoute.findMany({
      where: { commuterId },
      include: {
        route: true, // Include the full route details for the frontend
      },
    });

    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ error: "Failed to get favorite routes." });
  }
};