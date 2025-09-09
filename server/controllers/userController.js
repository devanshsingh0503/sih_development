// src/controllers/userController.js
import prisma from "../config/prisma.js";

export const updateUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    // Optional: Add validation to ensure the new role is a valid one (e.g., 'admin', 'user')
    const validRoles = ['ADMIN', 'COMMUTOR', 'DRIVER']; // Or whatever roles you have
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ error: "Invalid role specified" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    res.json({ message: "User role updated successfully", user: updatedUser });
  } catch (err) {
    // Handle cases where the userId is not found
    res.status(500).json({ error: "Failed to update user role" });
  }
};