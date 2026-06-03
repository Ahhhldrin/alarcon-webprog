const HOST =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? "https://alarcon-webprog-server.vercel.app/api"
    : "http://localhost:5000/api");

export default HOST;
