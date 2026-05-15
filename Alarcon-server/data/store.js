const bcrypt = require("bcryptjs");
const crypto = require("node:crypto");
const { usersSeed, articlesSeed } = require("./seedData");

let users = [];
let articles = [];
let initialized = false;

const clone = (value) => JSON.parse(JSON.stringify(value));

const seedPasswordIfNeeded = async (value) => {
  if (String(value).startsWith("$2")) {
    return value;
  }

  return bcrypt.hash(value, 10);
};

const initializeStore = async () => {
  if (initialized) {
    return;
  }

  users = await Promise.all(
    usersSeed.map(async (user) => ({
      ...clone(user),
      password: await seedPasswordIfNeeded(user.password),
    }))
  );

  articles = articlesSeed.map((article) => clone(article));
  initialized = true;
};

const getUsers = async () => {
  await initializeStore();
  return clone(users);
};

const getArticles = async () => {
  await initializeStore();
  return clone(articles);
};

const saveUser = async (user) => {
  await initializeStore();
  const nextUser = {
    ...clone(user),
    id: user.id || crypto.randomUUID(),
  };

  users.unshift(nextUser);
  return clone(nextUser);
};

const replaceUser = async (userId, updates) => {
  await initializeStore();
  const index = users.findIndex((user) => String(user.id) === String(userId));
  if (index === -1) {
    return null;
  }

  users[index] = {
    ...users[index],
    ...clone(updates),
    id: users[index].id,
  };

  return clone(users[index]);
};

const removeUser = async (userId) => {
  await initializeStore();
  const before = users.length;
  users = users.filter((user) => String(user.id) !== String(userId));
  return before !== users.length;
};

const saveArticle = async (article) => {
  await initializeStore();
  const nextArticle = {
    ...clone(article),
    id: article.id || crypto.randomUUID(),
  };

  articles.unshift(nextArticle);
  return clone(nextArticle);
};

const replaceArticle = async (articleId, updates) => {
  await initializeStore();
  const index = articles.findIndex((article) => String(article.id) === String(articleId));
  if (index === -1) {
    return null;
  }

  articles[index] = {
    ...articles[index],
    ...clone(updates),
    id: articles[index].id,
  };

  return clone(articles[index]);
};

const removeArticle = async (articleId) => {
  await initializeStore();
  const before = articles.length;
  articles = articles.filter((article) => String(article.id) !== String(articleId));
  return before !== articles.length;
};

module.exports = {
  initializeStore,
  getUsers,
  getArticles,
  saveUser,
  replaceUser,
  removeUser,
  saveArticle,
  replaceArticle,
  removeArticle,
};
