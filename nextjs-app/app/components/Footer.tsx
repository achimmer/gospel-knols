import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Footer() {
  return (
    <footer className="site-footer no-print">
      <div className="page-shell">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand"><BrandMark className="brand-mark" /><span className="brand-name">Gospel Knols</span></Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-muted">An insight to carry into your next gospel study.</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-start gap-x-8 gap-y-4 text-sm">
            <Link href="/#essays" className="text-link">Explore the essays</Link>
            <Link href="/about" className="text-link">About Richard</Link>
            <a href="/feed.xml" className="text-link">RSS feed <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Gospel Knols</p>
          <p>Independent writing. The views expressed are the author’s own.</p>
        </div>
      </div>
    </footer>
  );
}
