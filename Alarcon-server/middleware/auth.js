const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "alarcon-dashboard-secret";

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.slice("Bearer ".length).trim();
};

const optionalAuth = (req, _res, next) => {
  const token = getTokenFromRequest(req);
  if (!token) {
    req.authUser = null;
    return next();
  }

  try {
    req.authUser = jwt.verify(token, JWT_SECRET);
  } catch {
    req.authUser = null;
  }

  return next();
};

const requireAuth = (req, res, next) => {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    req.authUser = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

const requireRoles = (...roles) => (req, res, next) => {
  if (!req.authUser) {
    return res.status(401).json({ message: "Authentication required." });
  }

  if (!roles.includes(req.authUser.role)) {
    return res.status(403).json({ message: "You do not have access to this resource." });
  }

  return next();
};

module.exports = {
  JWT_SECRET,
  optionalAuth,
  requireAuth,
  requireRoles,
};
