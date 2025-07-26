import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controllers/dashboardController.js";

const dashboardRoutes = Router();

dashboardRoutes.get("/",protect, getDashboardData);

export default dashboardRoutes