
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error(
      "JWT_SECRET is missing. Configure it in your backend environment."
    );
  }

  return jwt.sign(
    { id: id.toString(), accountType: "admin" },
    secret,
    { expiresIn: "7d" }
  );
};

// POST /api/admin/login
export const loginAdmin = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    res.status(400);
    throw new Error("Phone number and password are required");
  }

  const admin = await Admin.findOne({
    phone: phone.trim(),
    isActive: true,
  }).select("+password");

  if (!admin || !(await admin.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid phone number or password");
  }

  const token = generateToken(admin._id);

  return res.json({
    success: true,
    message: "Admin login successful",
    token,
    admin: {
      _id: admin._id,
      name: admin.name,
      phone: admin.phone,
      role: "admin",
    },
  });
});

// GET /api/admin/me
export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (!admin || !admin.isActive) {
    res.status(404);
    throw new Error("Admin account not found or inactive");
  }

  res.json({
    success: true,
    admin: {
      _id: admin._id,
      name: admin.name,
      phone: admin.phone,
      role: "admin",
    },
  });
});

// POST /api/admin/create
export const createAdmin = asyncHandler(async (req, res) => {
  const { name, phone, password } = req.body;

  if (!name?.trim() || !phone?.trim() || !password) {
    res.status(400);
    throw new Error("Name, phone number, and password are required");
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters");
  }

  const normalizedPhone = phone.trim();

  const existingAdmin = await Admin.findOne({
    phone: normalizedPhone,
  });

  if (existingAdmin) {
    res.status(409);
    throw new Error("An admin with this phone number already exists");
  }

  const admin = await Admin.create({
    name: name.trim(),
    phone: normalizedPhone,
    password,
    role: "admin",
  });

  res.status(201).json({
    success: true,
    message: "Admin created successfully",
    admin: {
      _id: admin._id,
      name: admin.name,
      phone: admin.phone,
      role: "admin",
    },
  });
});
