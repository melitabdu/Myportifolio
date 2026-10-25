
import mongoose from "mongoose";

const insightSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Insight title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Insight slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, "Insight excerpt is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Insight content is required"],
    },
    coverImage: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

insightSchema.index({ status: 1, publishedAt: -1 });

const insightModel = mongoose.model("Insight", insightSchema);

export default insightModel;
