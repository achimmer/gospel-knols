# Policy drafts and release preparation

## Local review

- http://localhost:3000/privacy
- http://localhost:3000/terms

Copy is stored as Sanity **Page** documents in `nextjs-app/content/policy-pages/*.json`, using the existing `pageBuilder → Info Section → Content` rich-text fields. No policy text is embedded in React components. In development only, setting `LOCAL_POLICY_DRAFTS=1` enables these documents for review. By default local and production builds both read Sanity Pages. Production reads Pages from Sanity; it never substitutes these local drafts. Footer policy links in production appear only for published matching Pages.

The owner authorized publication of these documents on November 13, 2026, with a public contact email deferred. No article content has been changed. The development-only review banner and noindex metadata are not part of the CMS copy.

## Confirmed decisions and follow-up

- Owner confirmed: Richard P. Himmer, operating the Gospel Knols publication; no LLC or corporation claimed.
- Operator location confirmed: Texas, United States. No court venue, arbitration clause, or governing-law provision has been inferred from this.
- Public contact email deferred by owner. Published copy explicitly states it is unavailable. Add a working contact channel promptly; no privacy-compliance or legal-protection guarantee is made.
- Permission required for redistribution of articles/PDFs (including Church/group study), republication, adaptation, and commercial use, subject to statutory rights and separate licenses. Link sharing and individual reading/printing remain available.
- Richard owns his writings and some graphics. Verify each third-party image license and required attribution before use; “free” or publicly available is not itself a license.
- No newsletter is active. Review any retained historical email list separately; before a future launch, confirm consent/provenance, provider, unsubscribe handling, and retention. Do not import or email the historical list as part of this work.
- Confirm actual log, correspondence, and provider retention practices. Avoid promising a retention period that has not been established.
- Placeholder language has been replaced with accurate current-state wording. Revision date: November 13, 2026.
- Have legal wording reviewed for the actual operator and audience. This implementation does not establish enforceability or comprehensive legal compliance.

## Audit scope and findings (November 13, 2026)

Source review found Vercel hosting, Vercel Speed Insights, Sanity delivery/live content, browser sharing, and printing. No reader accounts, comments, signup/contact form, advertising pixel, or third-party iframe embed was found in the current reading templates. External article links may lead to services with separate practices.

The live homepage DOM included Vercel's Speed Insights script and no iframes. A browser cookie inspection on the observed public origin returned no first-party cookies. That is a point-in-time observation in this browser, not a guarantee across all pages, browsers, server-side processing, or editorial login sessions. Local/session storage enumeration was unavailable through the browser tooling and is not claimed as verified. Provider retention/dashboard settings have not been verified.

Provider references:
- https://vercel.com/docs/speed-insights/privacy-policy
- https://vercel.com/legal/privacy-notice
- https://www.sanity.io/legal/privacy

No consent banner was added. Reassess if tracking, embeds, signup, or monetization is introduced, or applicable law requires it.

## Coordinated release

Git deployment and CMS publication are separate actions; one Git push does not publish Sanity records.

1. Finalize the two canonical JSON drafts and review their contents locally.
2. Export drafts without network access: `node scripts/export-policy-drafts.mjs > /tmp/gospel-knols-policy-drafts.ndjson`.
3. Inspect the export; import into the intended dataset as drafts only, using Sanity's dataset import with `--missing`. Do not use `--replace`. If matching IDs or slugs already exist, reconcile them in Studio rather than overwriting existing content.
4. In Studio → Pages, review Privacy Policy and Terms & Disclaimer, then explicitly publish the approved text. They remain ordinary editable Pages thereafter.
5. Release the approved website edits through the normal PR/CI/main deployment workflow. No Studio schema change is needed for these policy pages.
6. Verify both live pages, canonical links, footer links, mobile layout, and sitemap entries. Published CMS text is the production source of truth; later edits belong in Pages, not the local seed documents.

The guarded publication script `scripts/publish-policy-pages.mjs` defaults to a dry run. Under Sanity CLI with the authenticated user token, `--publish` creates only the two named published Pages, refuses existing matching IDs/slugs, and verifies article revisions remain unchanged. It never replaces existing content. Once published, edit policy copy in Studio Pages; seed files are a record of the initial publication.
