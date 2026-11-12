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
    <section className="page-shell about-hero"><p className="eyebrow"><span className="eyebrow-rule" /> The author & the idea</p><h1 className="editorial-title">An invitation<br />to <em>look closer.</em></h1><p className="about-lead">Gospel Knols brings together Richard P. Himmer’s essays on scripture, faith, and discipleship.</p></section>
    <section className="page-shell about-author"><div className="about-portrait"><AuthorPortrait author={author} /><p className="eyebrow mt-5">The author</p><h2>Richard P. Himmer, PhD</h2></div><div className="about-prose"><h2>Study that opens a conversation.</h2><p>Richard’s writing considers connections across scripture and the questions that arise in a life of faith. These essays bring together scriptural passages, commentary, and personal interpretation within the restored gospel of Jesus Christ.</p><p>This collection is a companion to your own study: read the passages, follow the references, and consider the ideas for yourself.</p><p>A knol is an insight to carry into that next study. Some ideas begin with a familiar verse. Others begin with a question that deserves more time.</p></div></section>
    <section className="about-principles"><div className="page-shell"><p className="eyebrow">An approach to reading</p><h2 className="section-title">Bring your questions.</h2><div className="principles-grid"><div><h3>Read in context.</h3><p>Return to the passages themselves. Consider the surrounding text, the setting, and the questions an interpretation raises.</p></div><div><h3>Follow the sources.</h3><p>Use the references as a starting point for further reading, and distinguish a source’s words from an author’s interpretation.</p></div><div><h3>Keep studying.</h3><p>Let an essay open the conversation. Take what prompts reflection into your own reading, discussion, and study.</p></div></div></div></section>
    <section className="page-shell about-closing"><div><p className="eyebrow">Independent writing. Shared study.</p><p>The views and interpretations expressed on Gospel Knols are Richard’s own. This site is an independent publication and is not an official publication of The Church of Jesus Christ of Latter-day Saints.</p></div><Link href="/#essays" className="button-primary">Explore the essays <Arrow /></Link></section>
  </>;
}
