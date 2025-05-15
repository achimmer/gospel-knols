import { Suspense } from "react";
import Link from "next/link";

import { AllPosts } from "@/app/components/Posts";
import GetStartedCode from "@/app/components/GetStartedCode";

export default async function Page() {
  return (
    <>
      <section className="bg-linear-to-r from-zinc-300 from-0% via-white via-60%  relative">
        <div className="bg-linear-to-b from-white w-full h-40 absolute top-0"></div>
        <div className="bg-linear-to-t from-white w-full h-40 absolute bottom-0"></div>
        <div className="container relative">
          <div className="mx-auto max-w-2xl py-20 lg:max-w-4xl lg:px-12 text-center">
            <div className="flex flex-col gap-4 items-center">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-stone-500">
               Gospel Knols
              </h1>
            </div>
            <div className="mt-6 space-y-6 prose sm:prose-lg md:prose-xl lg:prose-2xl text-slate-700">
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
