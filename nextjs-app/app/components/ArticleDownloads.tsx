import { stegaClean } from "@sanity/client/stega";
import type { PostQueryResult } from "@/sanity.types";

type Attachment = NonNullable<NonNullable<PostQueryResult>["attachments"]>[number];

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ArticleDownloads({ attachments }: { attachments?: Attachment[] | null }) {
  const downloads = attachments?.filter((attachment) => attachment.asset?.url);
  if (!downloads?.length) return null;

  return (
    <section aria-labelledby="article-downloads" className="downloads-section">
      <h2 id="article-downloads" className="font-editorial text-2xl text-ink">Downloads</h2>
      <ul className="mt-4 space-y-4">
        {downloads.map(({ _key, label, description, asset }) => {
          if (!asset?.url) return null;
          const url = new URL(stegaClean(asset.url));
          // Sanity's CDN sets Content-Disposition; HTML download alone does not work across origins.
          url.searchParams.set("dl", stegaClean(asset.originalFilename || "download"));
          const metadata = [asset.extension?.toUpperCase(), asset.size != null ? formatFileSize(asset.size) : null].filter(Boolean).join(" · ");
          return (
            <li key={_key}>
              <a href={url.href} download className="break-words font-medium text-forest underline underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4">
                {label || asset.originalFilename || "Download file"}
              </a>
              {metadata && <span className="ml-2 text-sm text-muted">({metadata})</span>}
              {description && <p className="mt-1 text-sm text-muted">{description}</p>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
