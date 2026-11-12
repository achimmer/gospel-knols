# Gospel Knols roadmap

## Implemented locally
- Upgrade Next.js and Sanity, update the toolchain and previews, fix known dependency advisories, and add repository checks.
- Fix sitemap origins and article heading links.
- Add article-body images with alt text, captions, and credits.
- Add downloadable article attachments with labels, descriptions, file types, and sizes.

## Next
- Review and deploy the upgraded website and Studio; verify preview and real attachment authoring before release.
- Maintain dependencies and review security overrides as upstream fixes are released.
- Redesign the article reading experience, then the homepage and browsing experience.
- Add native tables inside article content: column headings, text cells, optional caption, accessible header markup, and horizontal scrolling on small screens. Use structured data so tables can also be rendered in article PDFs. Images are an interim option, but cannot replace accessible, selectable table text.
- Add copy-link, device sharing, email sharing, and section links.
- Keep the simple browser Print / save PDF feature for now.
- Consider topic/scripture navigation, search, and pagination based on readers' needs.

## Later: branded article PDF downloads
- Generate a branded PDF from each published Sanity article, with controlled typography, logo, headers, footers, and page numbers, without browser-added timestamps or URLs.
- Use a separate generation service, triggered on publication, to create one PDF per published revision. Store the generated file in Sanity and associate it with the matching article revision.
- Offer a Download PDF button on the website and a Regenerate PDF action in Sanity Studio. Handle regeneration failures without presenting an outdated file as current.
- Include article images, references, and native tables when available. Keep generated article PDFs distinct from manually uploaded attachments.
- Deferred by request; retain the current browser print feature until this work is prioritized.
