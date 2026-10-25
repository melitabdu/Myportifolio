
import projectModel from "../models/projectModel.js";

const handleError = (res, error) => {
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Server error",
  });
};

// PUBLIC: Get published projects
export const getProjects = async (req, res) => {
  try {
    const projects = await projectModel
      .find({ status: "published" })
      .sort({ order: 1, createdAt: -1 });

    res.json({ success: true, data: projects });
  } catch (error) {
    handleError(res, error);
  }
};

// ADMIN: Get every project
export const getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel
      .find()
      .sort({ order: 1, createdAt: -1 });

    res.json({ success: true, data: projects });
  } catch (error) {
    handleError(res, error);
  }
};

// ADMIN: Create project
export const createProject = async (req, res) => {
  try {
    const project = await projectModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A project with this slug already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    handleError(res, error);
  }
};

// ADMIN: Update project
export const updateProject = async (req, res) => {
  try {
    const project = await projectModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A project with this slug already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    handleError(res, error);
  }
};

// ADMIN: Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await projectModel.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};
