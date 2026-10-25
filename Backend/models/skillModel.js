
import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Skill category is required"],
      trim: true,
      default: "Other",
    },
    level: {
      type: Number,
      min: 0,
      max: 100,
      default: 80,
    },
    icon: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const skillModel = mongoose.model("Skill", skillSchema);

export default skillModel;
