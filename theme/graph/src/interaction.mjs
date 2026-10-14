// Shared by the official renderer adaptation and its regression tests.
export const CLICK_DISTANCE = 6;
export function canNavigateGesture(start, end, maxDistance, elapsed) {
  return Math.max(maxDistance, Math.hypot(end.x - start.x, end.y - start.y)) <= CLICK_DISTANCE && elapsed < 500;
}
export function nodeHitRadius(zoom = 1) {
  return 22 / Math.max(zoom, 0.25); // at least a 44 CSS-pixel target
}
export function pageRoute(slug) {
  if (slug === "index") return "";
  return slug.endsWith("/index") ? slug.slice(0, -5) : slug;
}
