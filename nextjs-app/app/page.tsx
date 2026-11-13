import type {Metadata} from "next";
import Link from "next/link";
import {sanityFetch} from "@/sanity/lib/live";
import {allPostsQuery} from "@/sanity/lib/queries";
import CoverImage from "./components/CoverImage";
import AuthorPortrait from "./components/AuthorPortrait";
import DateComponent from "./components/Date";
import Arrow from "./components/Arrow";
import {EssayList} from "./components/Posts";

export const metadata: Metadata = {
  title: {absolute: "Gospel Knols — Essays by Richard P. Himmer"},
  alternates: {canonical: "/", types: {"application/rss+xml": "/feed.xml"}},
  description: "Essays on scripture, discipleship, and the restored gospel of Jesus Christ, by Richard P. Himmer.",
};

export default async function HomePage() {
  const {data: posts} = await sanityFetch({query: allPostsQuery});
  const featured = posts[0];
  return (
    <>
      <section className="page-shell home-hero">
        <div className="hero-copy">
          <h1 className="editorial-title home-headline"><span>Clarifying doctrine.</span><span>Challenging assumptions.</span></h1>
          <p className="hero-description">Richard P. Himmer writes about scripture, discipleship, and questions of faith.</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#essays" className="button-primary">Explore the essays <Arrow /></a>
            <Link href="/about" className="text-link">Meet the author <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        {featured && <Link href={`/posts/${featured.slug}`} className="featured-card group">
          <CoverImage image={featured.coverImage} priority className="featured-image" sizes="(max-width: 900px) calc(100vw - 48px), 500px" />
          <div className="featured-copy">
            <div className="flex flex-wrap items-center justify-between gap-3"><span className="featured-label">Latest essay</span><span className="meta"><DateComponent dateString={featured.date} /></span></div>
            <h2>{featured.title}</h2>
            {featured.excerpt && <p className="line-clamp-3">{featured.excerpt}</p>}
            <span className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-forest">Read the essay <Arrow className="transition-transform group-hover:translate-x-1" /></span>
          </div>
        </Link>}
      </section>
      <section id="essays" className="collection-section">
        <div className="page-shell">
          <div className="section-heading"><div><h2 className="section-title">The essays</h2></div><p>A different way to look at the restored gospel.</p></div>
          <EssayList posts={posts} />
          {!posts.length && <p className="py-12 text-muted">The first essays will appear here soon.</p>}
        </div>
      </section>
      <section className="page-shell author-section">
        <div className="author-introduction">
          <AuthorPortrait author={featured?.author || null} />
          <div><h2 className="section-title">Richard P. Himmer, PhD</h2><p>These essays bring together Richard’s study of scripture and his interpretations of the restored gospel.</p><Link href="/about" className="text-link mt-5 inline-flex items-center gap-3">About Richard & Gospel Knols <Arrow /></Link></div>
        </div>

      </section>
    </>
  );
}
