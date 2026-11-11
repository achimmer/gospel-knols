# Article images and downloads

## Local development

Use Node 22 LTS (`nvm install` if needed, then `nvm use`, with the included `.nvmrc`) and npm 10.9.8, then `npm ci` and `npm run dev` from the repository root. The website runs at http://localhost:3000 and Studio at http://localhost:3333. Existing environment files are preserved. See `nextjs-app/.env.example` for website configuration.

Set `NEXT_PUBLIC_SITE_URL` to the real public HTTPS origin in production. Existing Settings > Open Graph Image > metadataBase remains a fallback; otherwise the canonical origin defaults to https://www.gospelknols.org. The sitemap does not trust the incoming Host header.

## Images inside an article

Open a Post in Studio. In Content, insert an **Article image** between text blocks. Upload or select an image, supply alternative text, and optionally add a caption and image credit. Crop/hotspot editing is supported. This shared rich-text field also supports images in informational page sections.

These are images placed between paragraphs, rather than text wrapping around a small image. For a complex table or chart, a screenshot is an interim option; describe the essential information in nearby text. Native editable tables are on the roadmap.

## Downloadable attachments

In a Post, add items under **Downloads**. Upload a file, add a descriptive Download title, and optionally a description. Readers see a Downloads section below the body, with a file type and size. PDFs and other file types are supported. Only attach files intended for public distribution. These uploaded files are separate from the future generated article-PDF feature.

Existing posts require no migration. Images and downloads are optional. Preview changes before publishing. Deploy both the Studio and website to make the editor fields and public rendering available together.

## Dependency maintenance

The website and Studio now use Next.js 16 and Sanity 6. Use Node 22 LTS and npm 10.9.8 for installation and checks. See [DEPENDENCY-MAINTENANCE.md](DEPENDENCY-MAINTENANCE.md) for security overrides, validation commands, CI, and deployment requirements.

## Verification

After the Next.js 16 / Sanity 6 upgrade, schema extraction and type generation passed. Both production builds passed under Node 22, as did frontend lint and TypeScript checks. Local browser checks covered desktop/mobile body images, captions, missing assets, heading anchors and keyboard visibility, attachment link formatting, existing articles, and sitemap independence from request Host headers. Sample content was used only in a temporary local route and removed afterward; no content was uploaded or published. A real attachment upload/download remains an editor acceptance check.

Studio's automatic runtime updates remain enabled, so its hosted runtime can differ from the locally locked version. Dependency audit results and the operational limits of the security review are documented in DEPENDENCY-MAINTENANCE.md.
