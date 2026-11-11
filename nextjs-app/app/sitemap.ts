import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery, sitemapData } from "@/sanity/lib/queries";
import { getSiteUrl } from "@/sanity/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data: documents }, { data: settings }] = await Promise.all([
    sanityFetch({ query: sitemapData, perspective: "published", stega: false }),
    sanityFetch({ query: settingsQuery, perspective: "published", stega: false }),
  ]);
  const origin = getSiteUrl(settings?.ogImage?.metadataBase);
  return [
    { url: origin.href, priority: 1, changeFrequency: "monthly" },
    ...documents.flatMap((document) => {
      if (!document.slug) return [];
      const path = document._type === "post" ? `/posts/${document.slug}` : `/${document.slug}`;
      return [{
        url: new URL(path, origin).href,
        lastModified: document._updatedAt,
        priority: document._type === "post" ? 0.5 : 0.8,
        changeFrequency: "monthly" as const,
      }];
    }),
  ];
}
