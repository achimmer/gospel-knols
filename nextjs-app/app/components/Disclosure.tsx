"use client";

import type {ReactNode} from "react";
import {Disclosure as HeadlessDisclosure, DisclosureButton, DisclosurePanel} from "@headlessui/react";
import {ChevronDown} from "lucide-react";

export default function Disclosure({label, description, children, className = ""}: {label: string; description?: string; children: ReactNode; className?: string}) {
  return <HeadlessDisclosure as="div" className={`editorial-disclosure ${className}`}>
    <DisclosureButton className="group flex min-h-12 w-full items-center justify-between gap-4 rounded px-4 py-3 text-left text-sm font-medium text-forest transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">
      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1"><span>{label}</span>{description && <span className="text-xs font-normal text-muted">{description}</span>}</span>
      <ChevronDown aria-hidden="true" strokeWidth={1.75} className="size-4 shrink-0 transition-transform duration-200 group-data-open:rotate-180 motion-reduce:transition-none" />
    </DisclosureButton>
    <DisclosurePanel transition className="origin-top px-4 pb-4 transition duration-150 ease-out data-closed:-translate-y-1 data-closed:opacity-0 motion-reduce:transition-none">{children}</DisclosurePanel>
  </HeadlessDisclosure>;
}
