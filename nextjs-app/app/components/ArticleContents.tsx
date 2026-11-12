import Disclosure from "./Disclosure";

export type ContentsItem = {id: string; text: string; level: number};

function ContentsLinks({items}: {items: ContentsItem[]}) {
  const minLevel = Math.min(...items.map((item) => item.level));
  return <ol>{items.map((item) => <li key={item.id} className={item.level > minLevel ? "toc-subitem" : undefined}><a href={`#${item.id}`}>{item.text}</a></li>)}</ol>;
}

export function DesktopContents({items}: {items: ContentsItem[]}) {
  if (items.length < 2) return null;
  return <aside className="article-sidebar no-print"><nav className="article-toc" aria-label="Contents"><p className="eyebrow">In this essay</p><ContentsLinks items={items} /><a href="#article-title" className="mt-7 text-link">Back to top ↑</a></nav></aside>;
}
export function MobileContents({items}: {items: ContentsItem[]}) {
  if (items.length < 2) return null;
  return <Disclosure className="mobile-toc no-print" label="On this page" description={`${items.length} sections`}><nav aria-label="Mobile contents"><ContentsLinks items={items} /></nav></Disclosure>;
}
