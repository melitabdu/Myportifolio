
import express from "express";

import {
  getProjects,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import { adminProtect } from "../middleware/adminAuthMiddleware.js";

const projectRouter = express.Router();

// Public: published projects
projectRouter.get("/", getProjects);

// Admin-only: manage projects
projectRouter.get("/admin/all", adminProtect, getAllProjects);
projectRouter.post("/", adminProtect, createProject);
projectRouter.put("/:id", adminProtect, updateProject);
projectRouter.delete("/:id", adminProtect, deleteProject);

export default projectRouter;
