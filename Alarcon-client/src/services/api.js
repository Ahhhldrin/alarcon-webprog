import HOST from "../constants";
import { getAuthToken } from "../utils/auth";

const buildUrl = (path) => `${HOST}${path}`;

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

  let response;
  try {
    response = await fetch(buildUrl(path), {
      ...options,
      headers,
      signal: AbortSignal.timeout(15000),
    });
  } catch (fetchError) {
    const error = new Error(
      fetchError.name === "TimeoutError"
        ? "Request timed out. Make sure the server is running (npm run dev in Alarcon-server)."
        : "Cannot reach the API. Start Alarcon-server on port 5000, then try again."
    );
    error.cause = fetchError;
    throw error;
  }

  const data = await readJsonSafely(response);

  if (!response.ok) {
    const error = new Error(data?.message || "Request failed.");
    error.response = { data, status: response.status };
    throw error;
  }

  return { data };
};
