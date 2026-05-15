const mongoose = require("mongoose");

let didAttemptConnection = false;

const connectDB = async () => {
  if (didAttemptConnection) {
    return mongoose.connection;
  }

  didAttemptConnection = true;
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn("MongoDB URI not configured. Falling back to in-memory data store.");
    return mongoose.connection;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.warn(`MongoDB connection failed. Falling back to in-memory data store. ${error.message}`);
  }

  return mongoose.connection;
};

module.exports = connectDB;
