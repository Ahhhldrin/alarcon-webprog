import { apiRequest } from "./api";

export const fetchArticles = ({ publishedOnly = false } = {}) =>
  apiRequest(`/articles${publishedOnly ? "?published=true" : ""}`);

export const fetchArticleByName = (name) => apiRequest(`/articles/${name}`);

export const createArticle = (article) =>
  apiRequest("/articles", {
    method: "POST",
    body: JSON.stringify(article),
  });

export const updateArticle = (id, article) =>
  apiRequest(`/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify(article),
  });

export const deleteArticle = (id) =>
  apiRequest(`/articles/${id}`, {
    method: "DELETE",
  });
