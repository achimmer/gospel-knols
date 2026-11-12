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
  title: {absolute: "Gospel Knols — Deeper study. Thoughtful faith."},
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
          <p className="eyebrow"><span className="eyebrow-rule" /> Scripture · Discipleship · Reflection</p>
          <h1 className="editorial-title">Deeper study.<br /><em>Thoughtful faith.</em></h1>
          <p className="hero-description">Essays on scripture, discipleship, and the restored gospel of Jesus Christ, by Richard P. Himmer.</p>
          <p className="hero-invitation">Explore connections across scripture, examine challenging questions, and find ideas worth carrying into your own study.</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="#essays" className="button-primary">Explore the essays <Arrow /></Link>
            <Link href="/about" className="text-link">Meet the author <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        {featured && <Link href={`/posts/${featured.slug}`} className="featured-card group">
          <CoverImage image={featured.coverImage} priority className="featured-image" sizes="(max-width: 900px) calc(100vw - 48px), 500px" />
          <div className="featured-copy">
            <div className="flex flex-wrap items-center justify-between gap-3"><span className="eyebrow">Latest writings</span><span className="meta"><DateComponent dateString={featured.date} /></span></div>
            <h2>{featured.title}</h2>
            {featured.excerpt && <p className="line-clamp-3">{featured.excerpt}</p>}
            <span className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-forest">Read the essay <Arrow className="transition-transform group-hover:translate-x-1" /></span>
          </div>
        </Link>}
      </section>
      <section id="essays" className="collection-section scroll-mt-24">
        <div className="page-shell">
          <div className="section-heading"><div><p className="eyebrow">The collection</p><h2 className="section-title">Ideas to spend time with.</h2></div><p>A different way to look at the restored gospel.</p></div>
          <EssayList posts={posts} />
          {!posts.length && <p className="py-12 text-muted">The first essays will appear here soon.</p>}
        </div>
      </section>
      <section className="page-shell author-section">
        <div className="author-introduction">
          <AuthorPortrait author={featured?.author || null} />
          <div><p className="eyebrow">The voice behind the essays</p><h2 className="section-title">Richard P. Himmer, PhD</h2><p>Exploring scripture, faith, and the questions that invite us to look a little closer.</p><Link href="/about" className="text-link mt-5 inline-flex items-center gap-3">About Richard & Gospel Knols <Arrow /></Link></div>
        </div>
        <div className="knol-note"><span className="knol-mark" aria-hidden="true">“</span><p>Something to consider.<br /><em>Something to carry with you.</em></p><span className="eyebrow">One insight at a time</span></div>
      </section>
    </>
  );
}
