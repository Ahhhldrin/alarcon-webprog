export const ARTICLE_IMAGE_MAX_BYTES = 1024 * 1024;

const supportedImageTypes = ["image/jpeg", "image/png", "image/webp"];

export const validateArticleImageFile = (file) => {
  if (!file) {
    return "";
  }

  if (!supportedImageTypes.includes(file.type)) {
    return "Please upload a JPG, PNG, or WebP image.";
  }

  if (file.size > ARTICLE_IMAGE_MAX_BYTES) {
    return "Image file must be 1 MB or smaller.";
  }

  return "";
};

export const readArticleImageAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const validationError = validateArticleImageFile(file);
    if (validationError) {
      reject(new Error(validationError));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
