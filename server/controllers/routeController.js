import prisma from "../config/prisma.js";

export const getRoutes = async (req, res) => {
  try {
    const routes = await prisma.route.findMany({ include: { buses: true } });
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createRoute = async (req, res) => {
  try {
    const { name, stops } = req.body;
    const route = await prisma.route.create({ data: { name, stops } });
    res.json(route);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};