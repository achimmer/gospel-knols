import {readFile} from 'node:fs/promises';
import {getCliClient} from 'sanity/cli';
import assert from 'node:assert/strict';

const client = getCliClient({apiVersion:'2024-10-28'}).withConfig({useCdn:false,perspective:'raw'});
assert.equal(client.config().projectId,'cazyq47g');
assert.equal(client.config().dataset,'production');
const documents = await Promise.all(['privacy','terms'].map(async slug => {
  const d = JSON.parse(await readFile(new URL(`../nextjs-app/content/policy-pages/${slug}.json`,import.meta.url),'utf8'));
  assert.equal(d._type,'page'); assert.equal(d.slug.current,slug);
  assert.ok(!/pending confirmation|before publication|before this notice is published/.test(JSON.stringify(d)));
  return d;
}));
const existing = await client.fetch('*[_type == "page" && (slug.current in $slugs || _id in $ids)]{_id,slug}', {slugs:['privacy','terms'],ids:documents.flatMap(d=>[d._id,`drafts.${d._id}`])});
assert.equal(existing.length,0,'Policy pages already exist; review in Studio instead of overwriting.');
const before = await client.fetch('*[_type == "post"] | order(_id asc){_id,_rev}');
console.log('Validated two new Pages; no existing Page will be overwritten.');
if (process.argv.includes('--publish')) {
  let transaction = client.transaction();
  for (const document of documents) transaction = transaction.create(document);
  await transaction.commit();
  const after = await client.fetch('*[_type == "post"] | order(_id asc){_id,_rev}');
  assert.deepEqual(after,before,'Article revisions changed during publication; investigate concurrent edits.');
  console.log('Published Privacy Policy and Terms & Disclaimer; article revisions unchanged.');
} else console.log('Dry run only. Pass --publish after approval.');
