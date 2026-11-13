import Link from "next/link";
import {sanityFetch} from "@/sanity/lib/live";
import {morePostsQuery} from "@/sanity/lib/queries";
import type {AllPostsQueryResult} from "@/sanity.types";
import CoverImage from "./CoverImage";
import DateComponent from "./Date";

type ListedPost = Omit<AllPostsQueryResult[number], "status">;
export function EssayList({posts}: {posts: ListedPost[]}) {
  return <div className="essay-list">{posts.map((post) => <article key={post._id} className="essay-row">
    <div className="essay-card-copy min-w-0"><p className="meta"><DateComponent dateString={post.date} /></p><h3><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3>{post.excerpt && <p className="essay-summary line-clamp-2">{post.excerpt}</p>}</div>
    <Link href={`/posts/${post.slug}`} className="essay-thumbnail" aria-label={`Read ${post.title}`} tabIndex={-1}><CoverImage image={post.coverImage} sizes="(max-width: 480px) 96px, (max-width: 800px) 160px, 240px" /></Link>
  </article>)}</div>;
}

export async function MorePosts({skip, limit}: {skip: string; limit: number}) {
  const {data} = await sanityFetch({query: morePostsQuery, params: {skip, limit}});
  if (!data?.length) return null;
  return <section className="related-section no-print"><div className="page-shell"><h2 className="section-title">More essays</h2><EssayList posts={data} /></div></section>;
}
