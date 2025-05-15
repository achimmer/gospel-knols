import { Suspense } from "react";
import Link from "next/link";

import { AllPosts } from "@/app/components/Posts";
import GetStartedCode from "@/app/components/GetStartedCode";

export default async function Page() {
  return (
    <>
      <section className="bg-neutral-100 relative">
        <div className="container relative">
          <div className="mx-auto max-w-2xl py-20 lg:max-w-4xl lg:px-12 text-center">
            <div className="flex flex-col gap-4 items-center">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-stone-500">
               Gospel Knols
              </h1>
              <p className="font-display text-md sm:text-lg md:text-xl text-stone-400">By Richard P. Himmer, PhD.</p>
            </div>
            <div className="mt-6 space-y-6 prose sm:prose-lg md:prose-xl lg:prose-2xl text-stone-600">
              <p>
                Collection of thought provoking treatises on the restored gospel of Jesus Christ.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-gray-100">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>{await AllPosts()}</Suspense>
          </aside>
        </div>
      </section>
    </>
  );
}
