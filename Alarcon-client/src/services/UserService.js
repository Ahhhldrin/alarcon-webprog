import { apiRequest } from "./api";

export const fetchUsers = () => apiRequest("/users");

export const createUser = (user) =>
  apiRequest("/users", {
    method: "POST",
    body: JSON.stringify(user),
  });

export const updateUser = (id, user) =>
  apiRequest(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });

export const deleteUser = (id) =>
  apiRequest(`/users/${id}`, {
    method: "DELETE",
  });

export const loginUser = (credentials) =>
  apiRequest("/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
