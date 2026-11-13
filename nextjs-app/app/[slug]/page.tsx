import type { Metadata } from "next";
import {notFound} from "next/navigation";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { pagesSlugs } from "@/sanity/lib/queries";
import {getPageContent} from "@/sanity/lib/page-content";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data.filter(({slug}) => slug !== "about");
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const {page, localDraft} = await getPageContent(params.slug, false);

  return {
    title: page?.name,
    description: page?.subheading || page?.heading,
    alternates: {canonical: `/${params.slug}`},
    ...(localDraft ? {robots: {index: false, follow: false}} : {}),
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const {page, localDraft} = await getPageContent(params.slug);

  if (!page?._id) {
    return notFound();
  }

  return (
    <article className="cms-page page-shell">
      {localDraft && <aside className="policy-review-note"><strong>Local draft — not published.</strong> The public contact address and retention practices need confirmation before release.</aside>}
      <header className="cms-page-header">
        <h1 className="editorial-title">{page.heading}</h1>
        {page.subheading && <p>{page.subheading}</p>}
      </header>
      <PageBuilderPage page={page} />
    </article>
  );
}
