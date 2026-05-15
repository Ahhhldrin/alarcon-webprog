const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/Users");
const { JWT_SECRET } = require("../middleware/auth");
const {
  getUsers,
  saveUser,
  replaceUser,
  removeUser,
} = require("../data/store");
const {
  normalizeRole,
  generateUsernameFromProfile,
  ensureUniqueUsername,
} = require("../utils/normalizers");
const { canAccessDashboard } = require("../utils/accessPolicy");

const isDbReady = () => mongoose.connection.readyState === 1;

const serializeUser = (user) => ({
  id: String(user._id ?? user.id),
  firstName: user.firstName ?? "",
  lastName: user.lastName ?? "",
  age: user.age ?? "",
  gender: user.gender ?? "",
  contactNumber: user.contactNumber ?? "",
  email: String(user.email ?? "").toLowerCase(),
  role: normalizeRole(user.role),
  username: String(user.username ?? "").toLowerCase(),
  address: user.address ?? "",
  isActive: Boolean(user.isActive),
});

const findUsers = async () => {
  if (isDbReady()) {
    return User.find().sort({ createdAt: -1 }).lean();
  }

  return getUsers();
};

const findUserByEmail = async (email) => {
  if (isDbReady()) {
    return User.findOne({ email: String(email).toLowerCase().trim() });
  }

  const users = await getUsers();
  return users.find((user) => user.email === String(email).toLowerCase().trim()) ?? null;
};

const findUserByUsername = async (username) => {
  if (isDbReady()) {
    return User.findOne({ username: String(username).toLowerCase().trim() });
  }

  const users = await getUsers();
  return users.find((user) => user.username === String(username).toLowerCase().trim()) ?? null;
};

const findUserById = async (userId) => {
  if (isDbReady()) {
    return User.findById(userId);
  }

  const users = await getUsers();
  return users.find((user) => String(user.id) === String(userId)) ?? null;
};

const buildFullUserPayload = async (payload, existingUsers, userId = null) => {
  const email = String(payload.email ?? "").trim().toLowerCase();
  const username = ensureUniqueUsername(
    String(payload.username ?? "").trim().toLowerCase(),
    existingUsers,
    userId
  );

  return {
    firstName: String(payload.firstName ?? "").trim(),
    lastName: String(payload.lastName ?? "").trim(),
    age: payload.age === "" || payload.age === null || payload.age === undefined ? null : Number(payload.age),
    gender: String(payload.gender ?? "").trim().toLowerCase(),
    contactNumber: String(payload.contactNumber ?? "").trim(),
    email,
    role: normalizeRole(payload.role),
    username,
    password: String(payload.password ?? ""),
    address: String(payload.address ?? "").trim(),
    isActive: typeof payload.isActive === "boolean" ? payload.isActive : true,
  };
};

const buildSignupPayload = async (payload, existingUsers) => {
  const email = String(payload.email ?? "").trim().toLowerCase();
  const username = ensureUniqueUsername(
    generateUsernameFromProfile({
      email,
      firstName: payload.firstName,
      lastName: payload.lastName,
    }),
    existingUsers
  );

  return {
    firstName: String(payload.firstName ?? "").trim(),
    lastName: String(payload.lastName ?? "").trim(),
    age: null,
    gender: "",
    contactNumber: "",
    email,
    role: "viewer",
    username,
    password: String(payload.password ?? ""),
    address: "",
    isActive: true,
  };
};

const validateUserPayload = (payload, { isSignup = false, isUpdate = false } = {}) => {
  if (!payload.firstName || !payload.lastName || !payload.email || (!isUpdate && !payload.password)) {
    return "Please complete all required fields.";
  }

  if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
    return "Please provide a valid email address.";
  }

  if (payload.password && payload.password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  if (!isSignup) {
    if (
      payload.age !== null &&
      payload.age !== "" &&
      (Number.isNaN(payload.age) || payload.age < 18 || payload.age > 120)
    ) {
      return "Age must be from 18 to 120.";
    }

    if (payload.contactNumber && !/^\d{11}$/.test(payload.contactNumber)) {
      return "Contact number must be exactly 11 digits.";
    }

    if (!payload.gender || !payload.username || !payload.address) {
      return "Please complete all required fields.";
    }
  }

  return null;
};

const createTokenPayload = (user) => ({
  id: String(user._id ?? user.id),
  email: user.email,
  role: normalizeRole(user.role),
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
});

const createUserRecord = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const nextPayload = {
    ...payload,
    password: hashedPassword,
  };

  if (isDbReady()) {
    const created = await User.create(nextPayload);
    return created.toObject();
  }

  return saveUser(nextPayload);
};

const updateUserRecord = async (userId, payload) => {
  const nextPayload = { ...payload };
  if (!String(nextPayload.password).startsWith("$2")) {
    nextPayload.password = await bcrypt.hash(nextPayload.password, 10);
  }

  if (isDbReady()) {
    const updated = await User.findByIdAndUpdate(userId, nextPayload, {
      new: true,
      runValidators: true,
    });
    return updated ? updated.toObject() : null;
  }

  return replaceUser(userId, nextPayload);
};

const deleteUserRecord = async (userId) => {
  if (isDbReady()) {
    const deleted = await User.findByIdAndDelete(userId);
    return Boolean(deleted);
  }

  return removeUser(userId);
};

const getAllUsers = async (_req, res) => {
  const users = await findUsers();
  return res.json(users.map(serializeUser));
};

const createUser = async (req, res) => {
  try {
    const existingUsers = await findUsers();
    const isAdminCreate = req.authUser && ["admin", "editor"].includes(req.authUser.role);
    const payload = isAdminCreate
      ? await buildFullUserPayload(req.body, existingUsers)
      : await buildSignupPayload(req.body, existingUsers);

    const validationError = validateUserPayload(payload, { isSignup: !isAdminCreate });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const duplicateEmail = existingUsers.find((user) => user.email === payload.email);
    if (duplicateEmail) {
      return res.status(409).json({ message: "A user with this email already exists." });
    }

    const duplicateUsername = existingUsers.find((user) => user.username === payload.username);
    if (duplicateUsername) {
      return res.status(409).json({ message: "Username is already taken." });
    }

    const createdUser = await createUserRecord(payload);
    return res.status(201).json(serializeUser(createdUser));
  } catch (error) {
    return res.status(500).json({ message: "Failed to create user." });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await findUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const existingUsers = await findUsers();
    const payload = await buildFullUserPayload(req.body, existingUsers, userId);
    const validationError = validateUserPayload(payload, { isSignup: false, isUpdate: true });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const duplicateEmail = existingUsers.find(
      (user) => String(user.id ?? user._id) !== String(userId) && user.email === payload.email
    );
    if (duplicateEmail) {
      return res.status(409).json({ message: "A user with this email already exists." });
    }

    const duplicateUsername = existingUsers.find(
      (user) => String(user.id ?? user._id) !== String(userId) && user.username === payload.username
    );
    if (duplicateUsername) {
      return res.status(409).json({ message: "Username is already taken." });
    }

    const updatedUser = await updateUserRecord(userId, {
      ...payload,
      password: payload.password ? payload.password : existingUser.password,
    });
    return res.json(serializeUser(updatedUser));
  } catch {
    return res.status(500).json({ message: "Failed to update user." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await deleteUserRecord(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json({ message: "User deleted successfully." });
  } catch {
    return res.status(500).json({ message: "Failed to delete user." });
  }
};

const loginUser = async (req, res) => {
  try {
    const email = String(req.body.email ?? "").trim().toLowerCase();
    const password = String(req.body.password ?? "");

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "This account is inactive." });
    }

    if (!canAccessDashboard(user.role)) {
      return res.status(403).json({ message: "This account cannot access the dashboard." });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const safeUser = serializeUser(user);
    const token = jwt.sign(createTokenPayload(safeUser), JWT_SECRET, { expiresIn: "7d" });

    return res.json({
      token,
      data: safeUser,
    });
  } catch {
    return res.status(500).json({ message: "Login failed. Please try again." });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
