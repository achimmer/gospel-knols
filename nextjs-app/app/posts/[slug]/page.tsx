import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import {stegaClean} from "@sanity/client/stega";
import ArticleActions from "@/app/components/ArticleActions";
import {DesktopContents, MobileContents} from "@/app/components/ArticleContents";
import AuthorPortrait from "@/app/components/AuthorPortrait";
import DateComponent from "@/app/components/Date";
import {articleDetails, articleEndmatter} from "@/sanity/lib/article";
import {getSiteUrl} from "@/sanity/lib/site-url";

import ArticleDownloads from "@/app/components/ArticleDownloads";
import CoverImage from "@/app/components/CoverImage";
import { MorePosts } from "@/app/components/Posts";
import PortableText from "@/app/components/PortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { postPagesSlugs, postQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const { data: post } = await sanityFetch({
    query: postQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    alternates: {canonical: new URL(`/posts/${params.slug}`, getSiteUrl()).href},
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{ name: `${post.author.firstName} ${post.author.lastName}` }]
        : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      type: "article",
      publishedTime: post?.date,
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage(props: Props) {
  const params = await props.params;
  const [{ data: post }] = await Promise.all([
    sanityFetch({ query: postQuery, params }),
  ]);

  if (!post?._id) {
    return notFound();
  }

  const endmatter = articleEndmatter(post);
  const {minutes, headings, headingOffset} = articleDetails(endmatter.body);
  if (endmatter.references.length) headings.push({id: "article-references", text: "References", level: Math.min(...headings.map((item) => item.level), 2)});
  const canonical = new URL(`/posts/${params.slug}`, getSiteUrl()).href;
  const authorName = [post.author?.firstName, post.author?.lastName].filter(Boolean).join(" ");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: stegaClean(post.title),
    description: stegaClean(post.excerpt || ""),
    datePublished: post.date,
    mainEntityOfPage: canonical,
    url: canonical,
    author: {"@type": "Person", name: stegaClean(authorName), url: new URL("/about", getSiteUrl()).href},
    image: resolveOpenGraphImage(post.coverImage)?.url,
    publisher: {"@type": "Organization", name: "Gospel Knols", url: getSiteUrl().href},
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData).replace(/</g, "\\u003c")}} />
    <article>
      <header className="page-shell article-header">
        <Link href="/#essays" className="back-link no-print"><span aria-hidden="true">←</span> The collection</Link>
        <h1 id="article-title" className="scroll-mt-28">{post.title}</h1>
        <div className="article-meta-row">
          <div className="article-byline">
            <AuthorPortrait author={post.author} />
            <div className="article-author-details"><Link href="/about" className="author-name">{authorName}</Link><p className="meta"><DateComponent dateString={post.date} /><span aria-hidden="true"> · </span><span title="Estimated reading time">{minutes} min read</span></p></div>
          </div>
          <ArticleActions title={stegaClean(post.title)} url={canonical} />
        </div>
      </header>
      <div className="page-shell article-cover-shell"><CoverImage image={post.coverImage} priority className="article-cover" sizes="(max-width: 800px) 100vw, (max-width: 1148px) calc(100vw - 96px), 1052px" /></div>
      <div className="page-shell article-layout">
        <div className="article-main">
          <MobileContents items={headings} />
          {endmatter.body.length ? <PortableText className="reading-prose article-body" value={endmatter.body} headingOffset={headingOffset} editorialSections /> : null}
          {(endmatter.references.length > 0 || endmatter.disclaimer.length > 0) && <div className="reading-prose prose article-separate-endmatter">
            {endmatter.references.length > 0 && <section className="article-endmatter article-references" aria-labelledby="article-references"><h2 id="article-references">References</h2><PortableText value={endmatter.references} headingOffset={2} /></section>}
            {endmatter.disclaimer.length > 0 && <section className="article-endmatter article-disclaimer" aria-labelledby="article-disclaimer"><h2 id="article-disclaimer">Disclaimer</h2><PortableText value={endmatter.disclaimer} headingOffset={2} /></section>}
          </div>}
          <ArticleDownloads attachments={post.attachments} />
          <p className="print-only print-source">Richard P. Himmer · Gospel Knols<br />{canonical}</p>
        </div>
        <DesktopContents items={headings} />
      </div>
    </article>
    <Suspense fallback={null}><MorePosts skip={post._id} limit={2} /></Suspense>
  </>;
}
