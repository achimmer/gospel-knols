import {readFile} from 'node:fs/promises';

// Export only drafts; no network requests, imports, publication, or replacement.
for (const slug of ['privacy', 'terms']) {
  const path = new URL(`../nextjs-app/content/policy-pages/${slug}.json`, import.meta.url);
  const document = JSON.parse(await readFile(path, 'utf8'));
  if (document._type !== 'page' || document.slug?.current !== slug || !document.pageBuilder?.length) {
    throw new Error(`Invalid Page document: ${slug}`);
  }
  process.stdout.write(JSON.stringify({...document, _id: `drafts.${document._id.replace(/^drafts\./, '')}`}) + '\n');
}
