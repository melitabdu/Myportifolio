
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js";

// =======================
// Route Imports
// =======================
import adminRoutes from "./routes/adminRoute.js";
import skillRouter from "./routes/skillRoute.js";
import projectRouter from "./routes/projectRoute.js";
import insightRouter from "./routes/insightRoute.js";

// =======================
// Error Middleware
// =======================
import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

// =======================
// Load Environment Variables
// =======================
dotenv.config();

// =======================
// Initialize Express
// =======================
const app = express();

// =======================
// Allowed Frontend Origins
// =======================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5734",
  "http://localhost:3000",

  // Production Vercel frontend
  "https://myportifolio-h8vw.vercel.app",
];

// =======================
// CORS Configuration
// =======================
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // (for example, some server-to-server requests).
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("CORS blocked origin:", origin);

      return callback(
        new Error(`CORS blocked origin: ${origin}`)
      );
    },
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// =======================
// Body Parsing Middleware
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// Request Logger
// =======================
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// =======================
// Health Check Routes
// =======================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running successfully.",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "Server is running.",
    environment: process.env.NODE_ENV || "development",
  });
});

// =======================
// API Routes
// =======================

// Admin authentication and management
app.use("/api/admin", adminRoutes);

// Skills
app.use("/api/skills", skillRouter);

// Projects
app.use("/api/projects", projectRouter);

// Insights
app.use("/api/insights", insightRouter);

// =======================
// 404 Handler
// Must come after all valid routes
// =======================
app.use(notFound);

// =======================
// Global Error Handler
// Must be the last middleware
// =======================
app.use(errorHandler);

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB before accepting requests.
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `Server running in ${
          process.env.NODE_ENV || "development"
        } mode on port ${PORT}`
      );

      console.log(`Port: ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error.message
    );

    process.exit(1);
  }
};

startServer();
