const test = require("node:test");
const assert = require("node:assert/strict");

const {
  canAccessUsersPage,
  canAccessDashboard,
  canAccessReportsPage,
  canAccessArticlesPage,
} = require("../utils/accessPolicy");

test("only admin can access the users page", () => {
  assert.equal(canAccessUsersPage("admin"), true);
  assert.equal(canAccessUsersPage("editor"), false);
  assert.equal(canAccessUsersPage("viewer"), false);
});

test("viewers cannot access the dashboard", () => {
  assert.equal(canAccessDashboard("admin"), true);
  assert.equal(canAccessDashboard("editor"), true);
  assert.equal(canAccessDashboard("viewer"), false);
});

test("reports and articles remain available only to admin and editor", () => {
  assert.equal(canAccessReportsPage("admin"), true);
  assert.equal(canAccessReportsPage("editor"), true);
  assert.equal(canAccessReportsPage("viewer"), false);

  assert.equal(canAccessArticlesPage("admin"), true);
  assert.equal(canAccessArticlesPage("editor"), true);
  assert.equal(canAccessArticlesPage("viewer"), false);
});
