const test = require("node:test");
const assert = require("node:assert/strict");

const {
  normalizeRole,
  generateUsernameFromProfile,
  ensureUniqueUsername,
  normalizeArticleContent,
  slugifyArticleName,
} = require("../utils/normalizers");

test("normalizeRole falls back to viewer for unsupported roles", () => {
  assert.equal(normalizeRole("admin"), "admin");
  assert.equal(normalizeRole("EDITOR"), "editor");
  assert.equal(normalizeRole("anything-else"), "viewer");
});

test("generateUsernameFromProfile prefers email local part and sanitizes it", () => {
  assert.equal(
    generateUsernameFromProfile({
      email: "Jane.Doe+news@example.com",
      firstName: "Jane",
      lastName: "Doe",
    }),
    "janedoenews"
  );
});

test("ensureUniqueUsername appends a numeric suffix when the base is taken", () => {
  const existingUsers = [{ username: "johndoe" }, { username: "johndoe1" }];

  assert.equal(ensureUniqueUsername("JohnDoe", existingUsers), "johndoe2");
});

test("normalizeArticleContent trims items and removes blanks", () => {
  assert.deepEqual(
    normalizeArticleContent(["  First paragraph  ", "", "Second paragraph"]),
    ["First paragraph", "Second paragraph"]
  );

  assert.deepEqual(
    normalizeArticleContent(" First paragraph \n\n Second paragraph "),
    ["First paragraph", "Second paragraph"]
  );
});

test("slugifyArticleName creates url-safe slugs", () => {
  assert.equal(slugifyArticleName("French Parker Shirt"), "french-parker-shirt");
  assert.equal(slugifyArticleName("  AI Sweater!  "), "ai-sweater");
});
