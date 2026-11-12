# Local editorial design review

Branch: `codex/local-editorial-redesign`. Approved for commit and branch push; production deployment is a separate step.

## Review links

- Home: http://localhost:3000/
- About: http://localhost:3000/about
- Article template: http://localhost:3000/posts/woman-as-a-type-of-christ
- Longer article and contents list: http://localhost:3000/posts/millennials-and-religion
- RSS: http://localhost:3000/feed.xml

## Included

A parchment/charcoal editorial palette with restrained terracotta accents, Source Serif 4 with Inter, a responsive masthead, featured essay and collection index, author introduction, compact footer, and a rewritten About draft. The article template adds a wide cover independent of the centered reading column, readable serif typography, estimated reading time, desktop/mobile contents navigation, canonical sharing, print/save-PDF controls, print styles, and article structured data. The site also includes RSS discovery, canonical page metadata, keyboard navigation, reduced-motion support, and a branded 404 page.

## Content boundary

Article titles, summaries, publication dates, references, and body text remain sourced from the existing Sanity records. No Sanity content records were written or changed. Additive schema fields support separate References and Standard/Custom/None disclaimer choices; the shared standard wording is configured in Site Settings. Legacy content continues to render without migration. Heading levels are normalized in the template to retain one page H1; the words remain unchanged. The featured article is selected from the existing published ordering, without changing its stored content.

The About text is approved code-based copy at `nextjs-app/app/about/page.tsx`; it overrides the existing CMS About route in this implementation. The published CMS page still retains its original content. About copy can be moved into the CMS in a separate step. The draft does not invent education, career history, or personal milestones.

## Boundaries of the feature preview

“Print / save PDF” opens the browser print dialog using a dedicated print layout. It is not server-generated one-click PDF export. The sharing controls deliberately use public canonical URLs, even in local preview, and omit preview secrets and tracking queries. Native table authoring, generated PDF files, newsletter subscriptions, and the article editorial review remain separate work.

## Verification

Frontend lint, TypeScript, and the production build passed. Browser checks covered the four main routes at desktop and mobile widths, including 320px, and automated WCAG accessibility scans returned no violations on the tested pages. The rendered article words were compared with the live site, and the published Sanity records (including revisions) matched the pre-redesign snapshot exactly. Contents anchors, keyboard skip navigation, canonical metadata, native-share/clipboard payloads with stubbed browser APIs, print layout, branded 404s, favicon, and RSS were checked. The RSS feed parsed as valid XML with both published articles.

Next.js automatically generated `nextjs-app/AGENTS.md` while starting the local development server. That framework-managed file was not manually authored or edited as part of the design.

## Final review refinements

The homepage collection uses two desktop columns with full-height image thumbnails. Article metadata is inline within the reading width; utility controls use Lucide icons and hide labels on tablet/mobile while retaining accessible names. Headless UI Disclosure provides the reusable contents control. References use charcoal headings and a subtle top rule; the disclaimer has a faint warm background. The header subtitle reads “more writings by Richard P. Himmer”; logo bounds and responsive sizing were tightened.
