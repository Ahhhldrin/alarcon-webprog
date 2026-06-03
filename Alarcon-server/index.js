require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/useRoutes");
const articleRoutes = require("./routes/articleRoutes");
const { initializeStore } = require("./data/store");
const { seedMongoDatabase } = require("./data/mongoSeed");

const app = express();

let initPromise = null;

const ensureReady = async () => {
  if (!initPromise) {
    initPromise = (async () => {
      await connectDB();
      await initializeStore();
      const didSeedMongo = await seedMongoDatabase();
      if (didSeedMongo) {
        console.log("MongoDB seed sync complete.");
      }
    })();
  }

  return initPromise;
};

app.use(async (req, res, next) => {
  try {
    await ensureReady();
    next();
  } catch (error) {
    next(error);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const corsOptions = {
  origin: "*",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.options(/.*/, cors(corsOptions));
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

module.exports = app;

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;

  ensureReady()
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => {
      console.error("Server startup failed.", error);
      process.exit(1);
    });
}
