const toTitleCase = (value) => {
  const normalized = String(value ?? "").trim().toLowerCase();
  return normalized ? `${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}` : "";
};

export const getUserDisplayName = (user) => {
  const fullName = [user?.firstName, user?.lastName]
    .map((part) => String(part ?? "").trim())
    .filter(Boolean)
    .join(" ");

  return fullName || user?.username || user?.email || "Signed in user";
};

export const getUserRoleLabel = (user) => toTitleCase(user?.role) || "User";

export const getAccountInitial = (user) =>
  String(user?.firstName?.[0] || user?.username?.[0] || user?.email?.[0] || "U").toUpperCase();

export const canShowDashboardLink = (user) =>
  ["admin", "editor"].includes(String(user?.role ?? "").toLowerCase());
