const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    seedKey: { type: String, unique: true, sparse: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    age: { type: Number, default: null },
    gender: { type: String, default: "" },
    contactNumber: { type: String, default: "" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, enum: ["admin", "editor", "viewer"], default: "viewer" },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
