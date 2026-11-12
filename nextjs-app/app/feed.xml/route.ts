import {sanityFetch} from "@/sanity/lib/live";
import {allPostsQuery} from "@/sanity/lib/queries";
import {getSiteUrl} from "@/sanity/lib/site-url";

export const revalidate = 3600;
function xml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
export async function GET() {
  const {data: posts} = await sanityFetch({query: allPostsQuery, perspective: "published", stega: false});
  const origin = getSiteUrl();
  const items = posts.slice(0, 50).map((post) => {
    const url = new URL(`/posts/${post.slug}`, origin).href;
    const date = new Date(post.date);
    return `<item><title>${xml(post.title)}</title><link>${xml(url)}</link><guid isPermaLink="true">${xml(url)}</guid><description>${xml(post.excerpt || "")}</description>${Number.isNaN(date.getTime()) ? "" : `<pubDate>${date.toUTCString()}</pubDate>`}</item>`;
  }).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Gospel Knols</title><link>${origin.href}</link><description>Essays on scripture, faith, and discipleship by Richard P. Himmer.</description><language>en-us</language><atom:link href="${new URL("/feed.xml", origin).href}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, {headers: {"Content-Type": "application/rss+xml; charset=utf-8", "X-Content-Type-Options": "nosniff"}});
}
