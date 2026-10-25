
import skillModel from "../models/skillModel.js";

const handleError = (res, error) => {
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Server error",
  });
};

// PUBLIC: Get active skills
export const getSkills = async (req, res) => {
  try {
    const skills = await skillModel
      .find({ isActive: true })
      .sort({ order: 1, name: 1 });

    res.json({ success: true, data: skills });
  } catch (error) {
    handleError(res, error);
  }
};

// ADMIN: Get all skills, including inactive ones
export const getAllSkills = async (req, res) => {
  try {
    const skills = await skillModel.find().sort({ order: 1, name: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    handleError(res, error);
  }
};

// ADMIN: Create skill
export const createSkill = async (req, res) => {
  try {
    const skill = await skillModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This skill already exists",
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

// ADMIN: Update skill
export const updateSkill = async (req, res) => {
  try {
    const skill = await skillModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    handleError(res, error);
  }
};

// ADMIN: Delete skill
export const deleteSkill = async (req, res) => {
  try {
    const skill = await skillModel.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};
