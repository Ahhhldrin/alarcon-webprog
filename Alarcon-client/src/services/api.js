import constants from "../constants";
import { getAuthToken } from "../utils/auth";

const buildUrl = (path) => `${constants.HOST}${path}`;

const readJsonSafely = async (response) => {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

export const apiRequest = async (path, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildUrl(path), {
    ...options,
    headers,
  });

  const data = await readJsonSafely(response);

  if (!response.ok) {
    const error = new Error(data?.message || "Request failed.");
    error.response = { data, status: response.status };
    throw error;
  }

  return { data };
};
