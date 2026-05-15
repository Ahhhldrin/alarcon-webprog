const express = require("express");
const {
  getArticlesList,
  getArticleByName,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");
const { optionalAuth, requireAuth, requireRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/", getArticlesList);
router.get("/:name", optionalAuth, getArticleByName);
router.post("/", requireAuth, requireRoles("admin", "editor"), createArticle);
router.put("/:id", requireAuth, requireRoles("admin", "editor"), updateArticle);
router.delete("/:id", requireAuth, requireRoles("admin", "editor"), deleteArticle);

module.exports = router;
