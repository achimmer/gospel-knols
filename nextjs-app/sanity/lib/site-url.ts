/** One origin for metadata and sitemaps, independent of request Host headers. */
export function getSiteUrl(configuredUrl?: string | null): URL {
  const value = process.env.NEXT_PUBLIC_SITE_URL || configuredUrl || "https://www.gospelknols.org";
  const url = new URL(value);
  if (!["https:", "http:"].includes(url.protocol)) {
    throw new Error("The website URL must use https:// or http://.");
  }
  return new URL(url.origin);
}
