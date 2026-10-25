
import insightModel from "../models/insightModel.js";

const handleError = (res, error) => {
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Server error",
  });
};

// PUBLIC: Get published insights
export const getInsights = async (req, res) => {
  try {
    const insights = await insightModel
      .find({ status: "published" })
      .sort({ publishedAt: -1, createdAt: -1 });

    res.json({ success: true, data: insights });
  } catch (error) {
    handleError(res, error);
  }
};

// PUBLIC: Get one published insight by slug
export const getInsightBySlug = async (req, res) => {
  try {
    const insight = await insightModel.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: "Insight not found",
      });
    }

    res.json({ success: true, data: insight });
  } catch (error) {
    handleError(res, error);
  }
};

// ADMIN: Get all insights, including drafts
export const getAllInsights = async (req, res) => {
  try {
    const insights = await insightModel
      .find()
      .sort({ updatedAt: -1 });

    res.json({ success: true, data: insights });
  } catch (error) {
    handleError(res, error);
  }
};

// ADMIN: Create insight
export const createInsight = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (payload.status === "published" && !payload.publishedAt) {
      payload.publishedAt = new Date();
    }

    const insight = await insightModel.create(payload);

    res.status(201).json({
      success: true,
      message: "Insight created successfully",
      data: insight,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An insight with this slug already exists",
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

// ADMIN: Update insight
export const updateInsight = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (payload.status === "published" && !payload.publishedAt) {
      payload.publishedAt = new Date();
    }

    if (payload.status === "draft") {
      payload.publishedAt = null;
    }

    const insight = await insightModel.findByIdAndUpdate(
      req.params.id,
      { $set: payload },
      { new: true, runValidators: true }
    );

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: "Insight not found",
      });
    }

    res.json({
      success: true,
      message: "Insight updated successfully",
      data: insight,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An insight with this slug already exists",
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

// ADMIN: Delete insight
export const deleteInsight = async (req, res) => {
  try {
    const insight = await insightModel.findByIdAndDelete(req.params.id);

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: "Insight not found",
      });
    }

    res.json({
      success: true,
      message: "Insight deleted successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};
