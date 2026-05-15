const STORAGE_KEYS = {
  token: "authToken",
  user: "userData",
};

export const getAuthToken = () => localStorage.getItem(STORAGE_KEYS.token) || "";

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.user);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setAuthSession = ({ token, user }) => {
  localStorage.setItem(STORAGE_KEYS.token, token);
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
};

export const clearAuthSession = () => {
  localStorage.removeItem(STORAGE_KEYS.token);
  localStorage.removeItem(STORAGE_KEYS.user);
};

export const hasAllowedRole = (allowedRoles, user = getStoredUser()) => {
  if (!user?.role) {
    return false;
  }

  return allowedRoles.includes(String(user.role).toLowerCase());
};

export const getDashboardNavItems = (user = getStoredUser()) => {
  const base = [{ label: "Dashboard", to: "/dashboard" }];
  const role = String(user?.role ?? "").toLowerCase();

  if (role === "admin") {
    return [
      ...base,
      { label: "Reports", to: "/dashboard/reports" },
      { label: "Articles", to: "/dashboard/articles" },
      { label: "Users", to: "/dashboard/users" },
    ];
  }

  if (role === "editor") {
    return [...base, { label: "Reports", to: "/dashboard/reports" }, { label: "Articles", to: "/dashboard/articles" }];
  }

  return [];
};

export const getFirstAllowedDashboardPath = (user = getStoredUser()) => {
  const items = getDashboardNavItems(user);
  return items[0]?.to || "/auth/signin";
};
