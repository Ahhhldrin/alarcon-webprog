const express = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");
const { optionalAuth, requireAuth, requireRoles } = require("../middleware/auth");

const router = express.Router();

router.post("/login", loginUser);
router.get("/", requireAuth, requireRoles("admin"), getAllUsers);
router.post("/", optionalAuth, createUser);
router.put("/:id", requireAuth, requireRoles("admin"), updateUser);
router.delete("/:id", requireAuth, requireRoles("admin"), deleteUser);

module.exports = router;
