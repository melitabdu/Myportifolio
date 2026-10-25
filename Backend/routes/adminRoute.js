
import express from "express";
import {
  loginAdmin,
  getAdminProfile,
  createAdmin,
} from "../controllers/adminController.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const adminRouter = express.Router();

// Public login
adminRouter.post("/login", loginAdmin);

// Protected routes
adminRouter.get("/me", protect, admin, getAdminProfile);
adminRouter.post("/create", protect, admin, createAdmin);

export default adminRouter;
