
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/Admin.js";

export const adminProtect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token. Please log in again.",
    });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is missing");
    return res.status(500).json({
      success: false,
      message: "Authentication configuration error",
    });
  }

  const token = authHeader.split(" ")[1];

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }

  const admin = await Admin.findById(decoded.id);

  if (!admin || !admin.isActive || admin.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Admin not found or inactive. Please log in again.",
    });
  }

  req.user = {
    _id: admin._id,
    role: admin.role,
    name: admin.name,
  };

  next();
});
