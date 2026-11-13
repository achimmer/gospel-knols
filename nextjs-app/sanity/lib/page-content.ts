import 'server-only';
import {sanityFetch} from './live';
import {getPageQuery} from './queries';
import type {GetPageQueryResult} from '@/sanity.types';

/** Local Sanity Page documents are review fixtures, never a production content source. */
export async function getPageContent(slug: string, stega = true) {
  if (process.env.NODE_ENV === 'development' && process.env.LOCAL_POLICY_DRAFTS === '1' && ['privacy', 'terms'].includes(slug)) {
    const document = slug === 'privacy'
      ? (await import('@/content/policy-pages/privacy.json')).default
      : (await import('@/content/policy-pages/terms.json')).default;
    return {page: document as NonNullable<GetPageQueryResult>, localDraft: true};
  }
  const {data: page} = await sanityFetch({query: getPageQuery, params: {slug}, stega});
  return {page: page as GetPageQueryResult, localDraft: false};
}
