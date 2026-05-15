const VALID_ROLES = ["admin", "editor", "viewer"];

const normalizeRole = (role) => {
  const normalized = String(role ?? "")
    .trim()
    .toLowerCase();

  return VALID_ROLES.includes(normalized) ? normalized : "viewer";
};

const slugifyArticleName = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const sanitizeUsername = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

const generateUsernameFromProfile = ({ email, firstName, lastName }) => {
  const emailLocalPart = sanitizeUsername(String(email ?? "").split("@")[0]);
  if (emailLocalPart) {
    return emailLocalPart;
  }

  const fullName = sanitizeUsername(`${firstName ?? ""}${lastName ?? ""}`);
  return fullName || "viewer";
};

const ensureUniqueUsername = (baseUsername, existingUsers, excludedId = null) => {
  const normalizedBase = sanitizeUsername(baseUsername) || "viewer";
  const reserved = new Set(
    existingUsers
      .filter((user) => {
        if (excludedId === null || excludedId === undefined) {
          return true;
        }

        return String(user.id ?? user._id ?? "") !== String(excludedId);
      })
      .map((user) => sanitizeUsername(user.username))
      .filter(Boolean)
  );

  if (!reserved.has(normalizedBase)) {
    return normalizedBase;
  }

  let counter = 1;
  while (reserved.has(`${normalizedBase}${counter}`)) {
    counter += 1;
  }

  return `${normalizedBase}${counter}`;
};

const normalizeArticleContent = (content) => {
  if (Array.isArray(content)) {
    return content.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(content ?? "")
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
};

module.exports = {
  VALID_ROLES,
  normalizeRole,
  slugifyArticleName,
  sanitizeUsername,
  generateUsernameFromProfile,
  ensureUniqueUsername,
  normalizeArticleContent,
};
