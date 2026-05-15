const mongoose = require("mongoose");
const Article = require("../models/Articles");
const {
  getArticles,
  saveArticle,
  replaceArticle,
  removeArticle,
} = require("../data/store");
const { normalizeArticleContent, slugifyArticleName } = require("../utils/normalizers");

const isDbReady = () => mongoose.connection.readyState === 1;

const serializeArticle = (article) => ({
  id: String(article._id ?? article.id),
  name: article.name,
  title: article.title,
  image: article.image ?? "",
  content: normalizeArticleContent(article.content),
  isPublished: Boolean(article.isPublished),
});

const findArticles = async ({ publishedOnly = false } = {}) => {
  if (isDbReady()) {
    const query = publishedOnly ? { isPublished: true } : {};
    return Article.find(query).sort({ createdAt: -1 }).lean();
  }

  const articles = await getArticles();
  return publishedOnly ? articles.filter((article) => article.isPublished) : articles;
};

const findArticleById = async (articleId) => {
  if (isDbReady()) {
    return Article.findById(articleId);
  }

  const articles = await getArticles();
  return articles.find((article) => String(article.id) === String(articleId)) ?? null;
};

const findArticleByName = async (name) => {
  if (isDbReady()) {
    return Article.findOne({ name });
  }

  const articles = await getArticles();
  return articles.find((article) => article.name === name) ?? null;
};

const buildArticlePayload = async (payload) => ({
  name: slugifyArticleName(payload.name || payload.title),
  title: String(payload.title ?? "").trim(),
  image: String(payload.image ?? "").trim(),
  content: normalizeArticleContent(payload.content),
  isPublished: typeof payload.isPublished === "boolean" ? payload.isPublished : true,
});

const validateArticlePayload = (payload) => {
  if (!payload.name || !payload.title) {
    return "Article title is required.";
  }

  if (!payload.content.length) {
    return "Please provide article content.";
  }

  return null;
};

const createArticleRecord = async (payload) => {
  if (isDbReady()) {
    const created = await Article.create(payload);
    return created.toObject();
  }

  return saveArticle(payload);
};

const updateArticleRecord = async (articleId, payload) => {
  if (isDbReady()) {
    const updated = await Article.findByIdAndUpdate(articleId, payload, {
      new: true,
      runValidators: true,
    });
    return updated ? updated.toObject() : null;
  }

  return replaceArticle(articleId, payload);
};

const deleteArticleRecord = async (articleId) => {
  if (isDbReady()) {
    const deleted = await Article.findByIdAndDelete(articleId);
    return Boolean(deleted);
  }

  return removeArticle(articleId);
};

const getArticlesList = async (req, res) => {
  const publishedOnly = req.query.published === "true";
  const articles = await findArticles({ publishedOnly });
  return res.json(articles.map(serializeArticle));
};

const getArticleByName = async (req, res) => {
  const article = await findArticleByName(req.params.name);
  if (!article || (!article.isPublished && !req.authUser)) {
    return res.status(404).json({ message: "Article not found." });
  }

  return res.json(serializeArticle(article));
};

const createArticle = async (req, res) => {
  try {
    const payload = await buildArticlePayload(req.body);
    const validationError = validateArticlePayload(payload);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const existing = await findArticleByName(payload.name);
    if (existing) {
      return res.status(409).json({ message: "An article with this slug already exists." });
    }

    const article = await createArticleRecord(payload);
    return res.status(201).json(serializeArticle(article));
  } catch {
    return res.status(500).json({ message: "Failed to create article." });
  }
};

const updateArticle = async (req, res) => {
  try {
    const payload = await buildArticlePayload(req.body);
    const validationError = validateArticlePayload(payload);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const existingArticle = await findArticleById(req.params.id);
    if (!existingArticle) {
      return res.status(404).json({ message: "Article not found." });
    }

    const duplicate = await findArticleByName(payload.name);
    if (duplicate && String(duplicate._id ?? duplicate.id) !== String(req.params.id)) {
      return res.status(409).json({ message: "An article with this slug already exists." });
    }

    const updated = await updateArticleRecord(req.params.id, payload);
    return res.json(serializeArticle(updated));
  } catch {
    return res.status(500).json({ message: "Failed to update article." });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const deleted = await deleteArticleRecord(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Article not found." });
    }

    return res.json({ message: "Article deleted successfully." });
  } catch {
    return res.status(500).json({ message: "Failed to delete article." });
  }
};

module.exports = {
  getArticlesList,
  getArticleByName,
  createArticle,
  updateArticle,
  deleteArticle,
};
