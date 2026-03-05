function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProductSlug(product) {
  if (!product) return "";
  const byName = slugify(product.name);
  if (byName) return byName;
  return product.id ? `product-${product.id}` : "product";
}

export function getProductPath(product) {
  return `/product/${getProductSlug(product)}`;
}

export function findProductBySlug(products, slug) {
  const normalized = slugify(slug);
  if (!normalized) return null;
  return products.find((product) => getProductSlug(product) === normalized) || null;
}
