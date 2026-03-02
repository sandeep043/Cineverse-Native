// central configuration for TMDB image URLs

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
export const POSTER_SIZE = "w500";
export const BACKDROP_SIZE = "w780";

/**
 * Build a full TMDB image URL for the given path and size.
 * @param {string} path - the `poster_path` or `backdrop_path` returned by TMDB (e.g. "/xyz.jpg").
 * @param {string} size - optional size (defaults to `POSTER_SIZE`).
 * @returns {string|null} complete URL or null if path is falsy.
 */
export function getImageUrl(path, size = POSTER_SIZE) {
  if (!path) return null;
  if (path.startsWith("http")) return path; // already complete
  return `${IMAGE_BASE_URL}${size}${path}`;
}
