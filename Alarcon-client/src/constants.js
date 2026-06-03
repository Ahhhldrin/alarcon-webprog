const HOST =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? "/api"
    : "https://alarcon-webprog-server.vercel.app/api");

export default HOST;
