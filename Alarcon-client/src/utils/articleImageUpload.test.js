import assert from "node:assert/strict";
import test from "node:test";

import {
  ARTICLE_IMAGE_MAX_BYTES,
  validateArticleImageFile,
} from "./articleImageUpload.js";

const makeFile = ({ type = "image/jpeg", size = 1024 } = {}) => ({
  type,
  size,
});

test("validateArticleImageFile accepts supported image files within the size limit", () => {
  assert.equal(validateArticleImageFile(makeFile()), "");
  assert.equal(validateArticleImageFile(makeFile({ type: "image/png" })), "");
  assert.equal(validateArticleImageFile(makeFile({ type: "image/webp" })), "");
});

test("validateArticleImageFile rejects unsupported file types", () => {
  assert.equal(
    validateArticleImageFile(makeFile({ type: "application/pdf" })),
    "Please upload a JPG, PNG, or WebP image."
  );
});

test("validateArticleImageFile rejects images larger than one megabyte", () => {
  assert.equal(
    validateArticleImageFile(makeFile({ size: ARTICLE_IMAGE_MAX_BYTES + 1 })),
    "Image file must be 1 MB or smaller."
  );
});
