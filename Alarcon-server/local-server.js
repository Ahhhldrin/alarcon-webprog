require("dotenv").config();

const app = require("./app");
const PORT = process.env.PORT || 5000;

app
  .ensureReady()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Server startup failed.", error);
    process.exit(1);
  });
