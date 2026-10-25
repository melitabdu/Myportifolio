
import express from "express";

import {
  getInsights,
  getInsightBySlug,
  getAllInsights,
  createInsight,
  updateInsight,
  deleteInsight,
} from "../controllers/insightController.js";

import { adminProtect } from "../middleware/adminAuthMiddleware.js";

const insightRouter = express.Router();

// Public routes
insightRouter.get("/", getInsights);
insightRouter.get("/slug/:slug", getInsightBySlug);

// Admin-only routes
insightRouter.get("/admin/all", adminProtect, getAllInsights);
insightRouter.post("/", adminProtect, createInsight);
insightRouter.put("/:id", adminProtect, updateInsight);
insightRouter.delete("/:id", adminProtect, deleteInsight);

export default insightRouter;
