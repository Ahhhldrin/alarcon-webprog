import assert from "node:assert/strict";
import test from "node:test";

import { registerViewerAccount } from "./signupFlow.js";

test("registerViewerAccount creates account without auto-login and redirects home", async () => {
  const calls = [];
  const result = await registerViewerAccount(
    {
      firstName: "Test",
      lastName: "User",
      email: "test.user@example.com",
      password: "Test123!",
    },
    {
      createUser: async (payload) => {
        calls.push(["createUser", payload]);
        return { data: { id: "new-user", role: "viewer" } };
      },
      loginUser: async () => {
        calls.push(["loginUser"]);
        throw new Error("signup should not auto-login viewer accounts");
      },
    }
  );

  assert.deepEqual(calls, [
    [
      "createUser",
      {
        firstName: "Test",
        lastName: "User",
        email: "test.user@example.com",
        password: "Test123!",
      },
    ],
  ]);
  assert.deepEqual(result, {
    redirectTo: "/",
    message: "Account created successfully.",
  });
});
