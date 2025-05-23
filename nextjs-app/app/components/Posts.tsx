import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/live";
import { morePostsQuery, allPostsQuery } from "@/sanity/lib/queries";
import { Post as PostType } from "@/sanity.types";
import DateComponent from "@/app/components/Date";
import OnBoarding from "@/app/components/Onboarding";

const Post = ({ post }: { post: PostType }) => {
  const { _id, title, slug, excerpt, date } = post;

  return (
    <Link
      className=""
      href={`/posts/${slug}`}
    >
    <article
      key={_id}
        className="flex flex-col items-start justify-between h-full bg-slate-50 rounded-sm overflow-hidden border border-gray-200 rounded-lg shadow-xs hover:bg-gray-100">

      <div className="px-6 py-6">

          <div className="text-slate-500 text-sm">
            <DateComponent dateString={date} />
          </div>

          <h3 className="mt-3 text-2xl font-semibold text-slate-700">
              {title}
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
            {excerpt}
          </p>
        </div>
    </article>
    </Link>

  );
};

const Posts = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode;
  heading?: string;
  subHeading?: string;
}) => (
  <div>
    {heading && (
      <h2 className="text-3xl font-medium tracking-tight text-stone-500 sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
    )}
    {subHeading && (
      <p className="mt-2 text-lg leading-8 text-stone-400">{subHeading}</p>
    )}
    <div className="mt-6 pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </div>
);

export const MorePosts = async ({
  skip,
  limit,
}: {
  skip: string;
  limit: number;
}) => {
  const { data } = await sanityFetch({
    query: morePostsQuery,
    params: { skip, limit },
  });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Posts heading={`Recent Writings (${data?.length})`}>
      {data?.map((post: any) => <Post key={post._id} post={post} />)}
    </Posts>
  );
};

export const AllPosts = async () => {
  const { data } = await sanityFetch({ query: allPostsQuery });

  if (!data || data.length === 0) {
    return <OnBoarding />;
  }

  return (
    <Posts
      heading="Recent Writings"
      subHeading='Essays, presentations, or musings.'
    >
      {data.map((post: any) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  );
};
