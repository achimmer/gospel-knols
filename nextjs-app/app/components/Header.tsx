"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import BrandMark from "./BrandMark";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="site-header no-print">
      <div className="page-shell flex h-full items-center justify-between gap-4">
        <Link href="/" className="brand" aria-label="Gospel Knols home">
          <BrandMark className="brand-mark" />
          <span className="brand-name">Gospel Knols<span className="brand-subtitle">more writings by Richard P. Himmer</span></span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-6 sm:gap-9">
          <Link href="/#essays" className="nav-link" aria-current={pathname === "/" ? "page" : undefined}>Essays</Link>
          <Link href="/about" className="nav-link" aria-current={pathname === "/about" ? "page" : undefined}>About</Link>
        </nav>
      </div>
    </header>
  );
}
