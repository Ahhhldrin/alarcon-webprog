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
      try {
        await connectDB();
        await initializeStore();
        const didSeedMongo = await seedMongoDatabase();
        if (didSeedMongo) {
          console.log("MongoDB seed sync complete.");
        }
      } catch (error) {
        initPromise = null;
        throw error;
      }
    })();
  }

  return initPromise;
};

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(async (req, res, next) => {
  try {
    await ensureReady();
    next();
  } catch (error) {
    console.error("Initialization error:", error);
    res.status(500).json({ message: "Server initialization failed." });
  }
});

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

app.ensureReady = ensureReady;

module.exports = app;
