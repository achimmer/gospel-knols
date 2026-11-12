import type { ReactNode } from "react";
import { PortableText, toPlainText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import { Image } from "next-sanity/image";
import { getImageDimensions } from "@sanity/asset-utils";
import { stegaClean } from "@sanity/client/stega";

import type { BlockContent, PostQueryResult } from "@/sanity.types";
import ResolvedLink from "@/app/components/ResolvedLink";
import { urlForImage } from "@/sanity/lib/utils";
import { articleSections } from "@/sanity/lib/article";

export type ContentBlock = BlockContent[number] | NonNullable<NonNullable<PostQueryResult>["content"]>[number];

type HeadingProps = {
  children?: ReactNode;
  value: PortableTextBlock;
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

function Heading({ children, value, level }: HeadingProps) {
  const Tag = `h${level}` as const;
  const id = value._key;
  const label = toPlainText(value) || "section";
  return (
    <Tag id={id} className="group relative scroll-mt-28">
      {children}
      {id && (
        <a
          href={`#${id}`}
          aria-label={`Link to ${stegaClean(label)}`}
          className="heading-anchor ml-2 inline-block text-sm opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100"
        >
          <span aria-hidden="true">#</span>
        </a>
      )}
    </Tag>
  );
}

const components: PortableTextComponents = {
  block: {
    h1: (props) => <Heading {...props} level={1} />,
    h2: (props) => <Heading {...props} level={2} />,
    h3: (props) => <Heading {...props} level={3} />,
    h4: (props) => <Heading {...props} level={4} />,
    h5: (props) => <Heading {...props} level={5} />,
    h6: (props) => <Heading {...props} level={6} />,
  },
  types: {
    image: ({ value }: { value: Extract<BlockContent[number], { _type: "image" }> }) => {
      const builder = urlForImage(value);
      if (!builder) return null;
      const dimensions = getImageDimensions(value.asset!);
      const crop = value.crop;
      const width = Math.max(1, Math.round(dimensions.width * (1 - (crop?.left || 0) - (crop?.right || 0))));
      const height = Math.max(1, Math.round(dimensions.height * (1 - (crop?.top || 0) - (crop?.bottom || 0))));
      return (
        <figure>
          <Image
            src={builder.width(Math.min(width, 1600)).url()}
            alt={stegaClean(value.alt || "")}
            width={width}
            height={height}
            sizes="(max-width: 768px) calc(100vw - 4rem), 672px"
            className="h-auto w-full rounded-lg"
          />
          {(value.caption || value.credit) && (
            <figcaption className="text-sm text-stone-600">
              {value.caption}
              {value.caption && value.credit && " — "}
              {value.credit}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value: link }) => <ResolvedLink link={link}>{children}</ResolvedLink>,
  },
};

export default function CustomPortableText({ className, value, headingOffset = 0, editorialSections = false }: { className?: string; value: ContentBlock[]; headingOffset?: number; editorialSections?: boolean }) {
  const shifted = (level: number) => Math.min(6, level + headingOffset) as HeadingProps["level"];
  const articleComponents: PortableTextComponents = {
    ...components,
    block: {
      h1: (props) => <Heading {...props} level={shifted(1)} />,
      h2: (props) => <Heading {...props} level={shifted(2)} />,
      h3: (props) => <Heading {...props} level={shifted(3)} />,
      h4: (props) => <Heading {...props} level={shifted(4)} />,
      h5: (props) => <Heading {...props} level={shifted(5)} />,
      h6: (props) => <Heading {...props} level={shifted(6)} />,
    },
  };
  return (
    <div className={["prose min-w-0 w-full [overflow-wrap:anywhere]", className].filter(Boolean).join(" ")}>
      {editorialSections ? articleSections(value).map((section) => section.kind === "body"
        ? <PortableText<ContentBlock> key={section.blocks[0]._key} components={articleComponents} value={section.blocks} />
        : <section key={section.blocks[0]._key} className={`article-endmatter article-${section.kind}`} aria-labelledby={section.blocks[0]._key}>
            <PortableText<ContentBlock> components={articleComponents} value={section.blocks} />
          </section>) : <PortableText<ContentBlock> components={articleComponents} value={value} />}
    </div>
  );
}
