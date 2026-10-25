
import express from "express";

import {
  getSkills,
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

import { adminProtect } from "../middleware/adminAuthMiddleware.js";

const skillRouter = express.Router();

// Public route: display skills
skillRouter.get("/", getSkills);

// Admin-only routes
skillRouter.get("/admin/all", adminProtect, getAllSkills);
skillRouter.post("/", adminProtect, createSkill);
skillRouter.put("/:id", adminProtect, updateSkill);
skillRouter.delete("/:id", adminProtect, deleteSkill);

export default skillRouter;
