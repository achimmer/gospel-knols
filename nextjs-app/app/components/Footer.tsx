import Link from "next/link";
import BrandMark from "./BrandMark";
import {sanityFetch} from "@/sanity/lib/live";
import {pagesSlugs} from "@/sanity/lib/queries";

export default async function Footer() {
  const {data: pages} = await sanityFetch({query: pagesSlugs});
  const available = new Set(pages.map((page) => page.slug));
  if (process.env.NODE_ENV === 'development' && process.env.LOCAL_POLICY_DRAFTS === '1') {available.add('privacy'); available.add('terms');}
  return (
    <footer className="site-footer no-print">
      <div className="page-shell">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand"><BrandMark className="brand-mark" /><span className="brand-name">Gospel Knols</span></Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-muted">Writings by Richard P. Himmer.</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-start gap-x-8 gap-y-4 text-sm">
            <Link href="/#essays" className="text-link">Explore the essays</Link>
            <Link href="/about" className="text-link">About Richard</Link>
            <a href="/feed.xml" className="text-link">RSS feed <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Gospel Knols</p>
          <div className="footer-legal"><p>Independent writing. The views expressed are the author’s own.</p><nav aria-label="Policies">
            {available.has('privacy') && <Link href="/privacy">Privacy & cookies</Link>}
            {available.has('terms') && <Link href="/terms">Terms & disclaimer</Link>}
          </nav></div>
        </div>
      </div>
    </footer>
  );
}
