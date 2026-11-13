import type {Metadata} from "next";
import Link from "next/link";
import {sanityFetch} from "@/sanity/lib/live";
import {allPostsQuery} from "@/sanity/lib/queries";
import AuthorPortrait from "../components/AuthorPortrait";
import Arrow from "../components/Arrow";

export const metadata: Metadata = {
  title: "About Richard P. Himmer",
  alternates: {canonical: "/about", types: {"application/rss+xml": "/feed.xml"}},
  description: "Meet the author behind Gospel Knols, an independent collection of essays on scripture, faith, and discipleship.",
};

export default async function AboutPage() {
  const {data: posts} = await sanityFetch({query: allPostsQuery});
  const author = posts.find((post) => post.author)?.author || null;
  return <>
    <section className="page-shell about-introduction">
      <div className="about-photo"><AuthorPortrait author={author} /></div>
      <div className="about-copy">
        <h1 className="editorial-title">About Richard</h1>
        <p className="about-author-name">Richard P. Himmer, PhD</p>
        <div className="about-prose">
          <p>Gospel Knols is Richard’s collection of essays on scripture, discipleship, and the restored gospel of Jesus Christ.</p>
          <p>His writing brings scriptural passages into conversation with commentary and personal interpretation. References accompany the essays so readers can return to the sources and draw their own conclusions.</p>
          <h2>Reading the essays</h2>
          <p>Read the passages in context, follow the references, and consider where you agree or see things differently. These essays offer Richard’s perspective; they are not official Church teaching.</p>
        </div>
      </div>
    </section>
    <section className="page-shell about-closing"><div><p>The views and interpretations expressed on Gospel Knols are Richard’s own. This site is an independent publication and is not an official publication of The Church of Jesus Christ of Latter-day Saints.</p></div><Link href="/#essays" className="button-primary">Explore the essays <Arrow /></Link></section>
  </>;
}
