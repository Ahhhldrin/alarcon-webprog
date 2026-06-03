import assert from "node:assert/strict";
import test from "node:test";

import HOST from "./constants.js";

test("exports the API host as a usable URL string", () => {
  assert.equal(typeof HOST, "string");
  assert.notEqual(HOST, "[object Object]");
  assert.match(HOST, /\/api$/);
});
