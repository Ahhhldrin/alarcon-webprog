const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    seedKey: { type: String, unique: true, sparse: true, trim: true },
    name: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    content: {
      type: [String],
      default: [],
    },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Article || mongoose.model("Article", articleSchema);
