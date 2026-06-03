import assert from "node:assert/strict";
import test from "node:test";

import {
  canShowDashboardLink,
  getAccountInitial,
  getUserDisplayName,
  getUserRoleLabel,
} from "./navAccount.js";

test("getUserDisplayName prefers full name, then username, then email", () => {
  assert.equal(
    getUserDisplayName({ firstName: "Aira", lastName: "Santos", username: "airasantos", email: "aira@example.com" }),
    "Aira Santos"
  );
  assert.equal(getUserDisplayName({ username: "airasantos", email: "aira@example.com" }), "airasantos");
  assert.equal(getUserDisplayName({ email: "aira@example.com" }), "aira@example.com");
});

test("viewer accounts do not show dashboard link but editor and admin accounts do", () => {
  assert.equal(canShowDashboardLink({ role: "viewer" }), false);
  assert.equal(canShowDashboardLink({ role: "editor" }), true);
  assert.equal(canShowDashboardLink({ role: "admin" }), true);
});

test("getUserRoleLabel formats stored roles for the account menu", () => {
  assert.equal(getUserRoleLabel({ role: "viewer" }), "Viewer");
  assert.equal(getUserRoleLabel({ role: "ADMIN" }), "Admin");
  assert.equal(getUserRoleLabel({}), "User");
});

test("getAccountInitial uses the first available account identity letter", () => {
  assert.equal(getAccountInitial({ firstName: "Aira", email: "aira@example.com" }), "A");
  assert.equal(getAccountInitial({ username: "markadmin", email: "admin@example.com" }), "M");
  assert.equal(getAccountInitial({ email: "admin@example.com" }), "A");
  assert.equal(getAccountInitial({}), "U");
});
