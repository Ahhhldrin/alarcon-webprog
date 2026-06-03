const mongoose = require("mongoose");

let didAttemptConnection = false;

const connectDB = async () => {
  if (didAttemptConnection) {
    return mongoose.connection;
  }

  didAttemptConnection = true;
  const mongoUri = String(process.env.MONGODB_URI || process.env.MONGO_URI || "")
    .trim()
    .replace(/^\uFEFF/, "");

  if (!mongoUri) {
    console.warn("MongoDB URI not configured. Falling back to in-memory data store.");
    return mongoose.connection;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.warn(`MongoDB connection failed. Falling back to in-memory data store. ${error.message}`);
  }

  return mongoose.connection;
};

module.exports = connectDB;
