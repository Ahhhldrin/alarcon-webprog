const normalize = (role) => String(role ?? "").trim().toLowerCase();

const canAccessDashboard = (role) => ["admin", "editor"].includes(normalize(role));

const canAccessUsersPage = (role) => normalize(role) === "admin";

const canAccessReportsPage = (role) => ["admin", "editor"].includes(normalize(role));

const canAccessArticlesPage = (role) => ["admin", "editor"].includes(normalize(role));

module.exports = {
  canAccessDashboard,
  canAccessUsersPage,
  canAccessReportsPage,
  canAccessArticlesPage,
};
