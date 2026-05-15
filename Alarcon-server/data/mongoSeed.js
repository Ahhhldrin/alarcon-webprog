const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/Users");
const Article = require("../models/Articles");
const { usersSeed, articlesSeed } = require("./seedData");

const hashIfNeeded = async (value) => {
  if (String(value).startsWith("$2")) {
    return value;
  }

  return bcrypt.hash(value, 10);
};

const buildSeedUserRecord = async (user) => ({
  ...user,
  password: await hashIfNeeded(user.password),
});

const seedCollectionByKey = async (Model, key, records) => {
  for (const record of records) {
    await Model.updateOne(
      { [key]: record[key] },
      { $set: record },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
};

const seedMongoDatabase = async () => {
  if (mongoose.connection.readyState !== 1) {
    return false;
  }

  const seededUsers = await Promise.all(
    usersSeed.map(async ({ id, ...user }) => buildSeedUserRecord(user))
  );
  const seededArticles = articlesSeed.map(({ id, ...article }) => article);

  await seedCollectionByKey(User, "seedKey", seededUsers);
  await seedCollectionByKey(Article, "seedKey", seededArticles);

  return true;
};

module.exports = {
  buildSeedUserRecord,
  seedCollectionByKey,
  seedMongoDatabase,
  hashIfNeeded,
};
