const env = import.meta.env ?? {};

const HOST =
  env.VITE_API_BASE_URL ||
  env.VITE_API_URL ||
  (env.DEV ? "/api" : "https://alarcon-webprog-server.vercel.app/api");

export default HOST;
