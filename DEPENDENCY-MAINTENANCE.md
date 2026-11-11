# Dependency and security maintenance

## Supported toolchain

Use Node 22 LTS (at least 22.13) and npm 10.9.8. Run `nvm install` (if needed), `nvm use`, then `npm ci` from the repository root. The root manifest declares the toolchain, and CI uses it explicitly. Avoid npm 11 for dependency updates in this workspace: its override handling can report overridden packages as invalid and can revert overrides during updates ([upstream issue](https://github.com/npm/cli/issues/9514)).

The application now uses Next.js 16.4.6, Sanity Studio 6.23.0, next-sanity 13.4.0, React 19.3.1, and Tailwind CSS 4. Major integration changes include current live-preview import paths, the replacement for the removed draft-environment hook, the current TypeGen CLI configuration, modern Sanity icon imports, and flat ESLint configuration.

Both workspaces share the modern Sanity React/TypeScript/accessibility lint preset; the website adds the official Next.js plugin's recommended and Core Web Vitals rules. This avoids the older React/import lint plugins that require ESLint 9 while the rest of the toolchain uses ESLint 10.

## Security overrides

Root `package.json` contains reviewed overrides for indirect dependencies that upstream packages still pin to vulnerable versions:

| Dependency | Selected version | Reason and scope |
| --- | --- | --- |
| brace-expansion 1.x | 1.1.22 or later in 1.x | Patched parsing and resource-exhaustion issues; preserves the existing major version. |
| @sanity/uuid | 3.0.3 | Patch release replaces the older vulnerable uuid dependency. |
| postcss-selector-parser 6.x | 6.1.6 | Patched selector parsing while preserving the existing major version. |
| @vercel/frameworks → js-yaml | 3.15.2 | Pinned upstream YAML parser needs security fixes within 3.x. |
| @vercel/frameworks → smol-toml | 1.9.1 | Pinned upstream TOML parser needs parsing fixes within 1.x. |
| zod-validation-error → zod | 4.6.7 | The adapter accepts Zod 3 or 4; select its supported patched major. |
| minimatch 10.x consumers | 11.0.8 | The fix for GHSA-g3hv-75wg-m249 is only available in 11.0.1 or later. Lint, schema generation, and builds exercise these tooling consumers. |

Keep the overrides until the parent packages adopt patched versions. Re-run the complete verification after changing or removing them. Do not use `npm audit fix --force` to chase a lower count: it can propose downgrading the CMS or replacing compatible packages with incompatible versions.

## Routine checks

- `npm ci`: reproducible installation from the committed lockfile.
- `npm run check`: lint and TypeScript checks for both workspaces, then a full dependency audit including development tooling.
- `npm run build`: extract the schema and build Studio, generate frontend query types, then build the website. Website builds require the existing Sanity environment configuration.
- After schema changes, run `npm run extract-types --workspace=studio` and `npm run typegen --workspace=nextjs-app`; commit both generated files.

The GitHub workflow checks installation, generated schema/query consistency, lint, TypeScript, and the audit on pull requests and pushes to main/master. It does not publish or deploy. Full website builds use the private environment configuration locally or in Vercel; no secrets are required for the repository checks.

## Verified on November 11, 2026

- A clean `npm ci` using Node 22 and npm 10.9.8 succeeded.
- Full `npm audit`, including development tooling, reported **0 known vulnerabilities**, down from 43 in the starting dependency tree for this upgrade.
- Lint and TypeScript checks passed for both workspaces.
- Studio and website production builds passed.
- Schema and query type generation produced identical files using the CI placeholder project configuration.
- Four public pages loaded in a production-mode local server, article images loaded, the missing-post route returned 404, and the sitemap ignored an untrusted Host header.
- Three unauthenticated or invalid-secret preview requests returned 401 without a draft cookie.
- The configured read token was absent from public JavaScript and anonymous HTML responses.
- Rendering checks covered heading anchors, cropped body-image proportions, alternative text, captions/credits, downloadable-file metadata and filename handling, and incomplete assets.
- Mobile layout was inspected and checked for horizontal overflow. No browser page or console errors were observed in the final website smoke check. Studio's HTTP endpoint responded successfully.

The hosted GitHub workflow has been added but has not run remotely. Authenticated Studio preview, a real attachment upload/download, and hosted account settings remain acceptance/operational checks. Builds still emit non-blocking notices about the optional Studio deployment app ID and Tailwind's TypeScript configuration module format.

## Deployment and operational limits

Changes here do not update the running website or hosted Studio until deployed. Preserve the existing environment configuration, set the hosting runtime to Node 22, and deploy both applications after review. Studio automatic runtime updates remain enabled in the new `deployment.autoUpdates` configuration.

A clean dependency audit reports known advisories for the resolved package versions; it is not a comprehensive penetration test or a review of hosted account permissions. Sanity token roles, CORS settings, hosting access, and backup policy are managed outside this checkout. The read token must remain a server environment variable and should have only the reader permissions needed for previews.

References: [Sanity Studio 6 migration](https://www.sanity.io/docs/help/v5-to-v6), [next-sanity migration guides](https://github.com/sanity-io/next-sanity), [Next.js 16 migration](https://nextjs.org/docs/app/guides/upgrading/version-16), [minimatch advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249).
