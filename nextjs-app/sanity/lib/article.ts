import {stegaClean} from "@sanity/client/stega";

type TextItem = {_type: string; _key: string; style?: string; children?: {text?: string}[]};
export function articleDetails(content: readonly TextItem[] | null | undefined) {
  const blocks = content?.filter((block) => block._type === "block") || [];
  const textOf = (block: TextItem) => stegaClean(block.children?.map((span) => span.text || "").join("") || "");
  const words = blocks.map(textOf).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const sections = articleSections(content || []);
  const bodyHeadings = sections.filter((section) => section.kind === "body").flatMap((section) => section.blocks)
    .filter((block) => /^h[1-3]$/.test(block.style || ""));
  const topLevel = Math.min(...bodyHeadings.map((block) => Number(block.style?.slice(1))), 3);
  const headings = sections.flatMap((section) => {
    if (section.kind === "disclaimer") return [];
    if (section.kind === "references") {
      const first = section.blocks[0];
      return [{id: first._key, text: textOf(first), level: topLevel}];
    }
    return section.blocks.filter((block) => /^h[1-3]$/.test(block.style || ""))
      .map((block) => ({id: block._key, text: textOf(block), level: Number(block.style?.slice(1))}));
  }).filter((item) => item.text);
  return {minutes: Math.max(1, Math.ceil(words / 225)), headings, headingOffset: blocks.some((block) => block.style === "h1") ? 1 : 0};
}

/** Presentation-only grouping. Keep the original blocks, order, text, and keys. */
export function articleSections<T extends TextItem>(content: readonly T[]) {
  type SectionKind = "body" | "references" | "disclaimer";
  const sections: {kind: SectionKind; blocks: T[]}[] = [];
  let current: {kind: SectionKind; blocks: T[]} | undefined;
  let sectionLevel = 0;
  for (const block of content) {
    const isHeading = block._type === "block" && /^h[1-6]$/.test(block.style || "");
    const level = isHeading ? Number(block.style?.slice(1)) : 0;
    const label = isHeading ? stegaClean(block.children?.map((span) => span.text || "").join("") || "").trim().replace(/[:.]$/, "").toLowerCase() : "";
    const special: SectionKind | undefined = /^(references?|sources?|bibliography|works cited|source notes|notes and references)$/.test(label)
      ? "references" : /^disclaimers?$/.test(label) ? "disclaimer" : undefined;
    // A nested Sources heading belongs to its existing References section.
    const startsSpecial = special && !(current?.kind === special && level > sectionLevel);
    const returnsToBody = !special && current?.kind !== "body" && isHeading && level <= sectionLevel;
    if (!current || startsSpecial || returnsToBody) {
      current = {kind: special || "body", blocks: []};
      sectionLevel = level;
      sections.push(current);
    }
    current.blocks.push(block);
  }
  return sections;
}

/** New fields take precedence; untouched legacy posts retain every original block. */
export function articleEndmatter<T extends TextItem>({content, references, disclaimerMode, customDisclaimer, standardDisclaimer}: {
  content?: readonly T[] | null;
  references?: readonly T[] | null;
  disclaimerMode?: string | null;
  customDisclaimer?: readonly T[] | null;
  standardDisclaimer?: readonly T[] | null;
}) {
  const referenceBlocks = references?.length ? [...references] : [];
  const selectedDisclaimer = disclaimerMode === "custom" ? customDisclaimer
    : disclaimerMode === "standard" ? standardDisclaimer : null;
  const disclaimerBlocks = selectedDisclaimer?.length ? [...selectedDisclaimer] : [];
  const body = articleSections(content || []).filter((section) =>
    !(section.kind === "references" && referenceBlocks.length) &&
    !(section.kind === "disclaimer" && (disclaimerBlocks.length || disclaimerMode === "none"))
  ).flatMap((section) => section.blocks);
  return {body, references: referenceBlocks, disclaimer: disclaimerBlocks};
}
