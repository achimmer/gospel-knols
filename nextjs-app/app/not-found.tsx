import Link from "next/link";
import Arrow from "./components/Arrow";

export default function NotFound() {
  return <section className="page-shell py-20 sm:py-28"><p className="eyebrow"><span className="eyebrow-rule" /> Page not found</p><h1 className="editorial-title mt-7 max-w-3xl">A different place<br />to <em>begin.</em></h1><p className="mt-7 max-w-lg text-base leading-8 text-muted">This address isn’t in the collection. Return to the essays to find something worth exploring.</p><Link href="/#essays" className="button-primary mt-8">Explore the essays <Arrow /></Link></section>;
}
