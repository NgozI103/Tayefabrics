const HTML_ROUTE_TO_CANONICAL = {
  "home.html": "/home",
  "index.html": "/index",
  "about.html": "/about",
  "shop.html": "/shop",
  "product.html": "/product",
  "cart.html": "/cart",
  "wishlist.html": "/wishlist",
  "checkout.html": "/checkout",
  "contact.html": "/contact",
  "faq.html": "/faq",
  "login.html": "/auth/login",
  "signup.html": "/auth/signup",
  "forgot-password.html": "/auth/forgot-password",
  "profile-details.html": "/profile",
  "urgent-tailor.html": "/urgent-tailor",
  "urgent-tailor-measurements.html": "/urgent-tailor/measurements",
  "urgent-tailor-review.html": "/urgent-tailor/review",
  "urgent-tailor-success.html": "/urgent-tailor/success",
};

function normalizePathname(pathname) {
  if (!pathname) return "/";
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const compacted = withLeadingSlash.replace(/\/{2,}/g, "/");
  if (compacted.length > 1 && compacted.endsWith("/")) {
    return compacted.slice(0, -1);
  }
  return compacted;
}

function pathToCanonical(pathname) {
  const normalizedPath = normalizePathname(pathname);
  const withoutPrefix = normalizedPath.replace(/^\/userpage(?=\/|$)/, "") || "/";
  const trimmed = normalizePathname(withoutPrefix);

  if (trimmed === "/") return "/home";

  const htmlSegment = trimmed.slice(1);
  if (HTML_ROUTE_TO_CANONICAL[htmlSegment]) {
    return HTML_ROUTE_TO_CANONICAL[htmlSegment];
  }

  return trimmed;
}

function isSkippableHref(rawHref) {
  if (!rawHref) return true;
  const href = rawHref.trim().toLowerCase();
  if (!href || href === "#") return true;
  return (
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:") ||
    href.startsWith("data:")
  );
}

function buildSearch(searchParams) {
  const text = searchParams.toString();
  return text ? `?${text}` : "";
}

export function normalizeInternalHref(rawHref, baseHref) {
  if (isSkippableHref(rawHref)) return null;

  const fallbackBase =
    baseHref || (typeof window !== "undefined" ? window.location.href : "http://localhost/");

  let url;
  try {
    url = new URL(rawHref, fallbackBase);
  } catch {
    return null;
  }

  if (typeof window !== "undefined" && url.origin !== window.location.origin) {
    return null;
  }

  const canonicalPath = pathToCanonical(url.pathname);
  const searchParams = new URLSearchParams(url.search);

  const search = buildSearch(searchParams);
  return `${canonicalPath}${search}${url.hash || ""}`;
}

export function navigateWithinApp(rawHref, { replace = false } = {}) {
  if (typeof window === "undefined") return false;

  const normalized = normalizeInternalHref(rawHref, window.location.href);
  if (!normalized) return false;

  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (current === normalized) return true;

  if (replace) {
    window.history.replaceState({}, "", normalized);
  } else {
    window.history.pushState({}, "", normalized);
  }

  window.dispatchEvent(new PopStateEvent("popstate"));
  return true;
}

export const legacyRedirects = Object.entries(HTML_ROUTE_TO_CANONICAL).flatMap(
  ([htmlPath, canonicalPath]) => [
    { from: `/${htmlPath}`, to: canonicalPath },
    { from: `/userpage/${htmlPath}`, to: canonicalPath },
  ],
);
