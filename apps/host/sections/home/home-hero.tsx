import Link from "next/link";
// utils
import { cn } from "@repo/ui/lib/utils";
// components
import { buttonVariants } from "@repo/ui/components/button";
import { Iconify } from "@repo/ui/components/iconify";

export default function HomeHero() {
  return (
    <section className="flex flex-col items-center gap-2 px-4 py-8 md:py-12 border-b">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        Micro Frontends
      </h1>
      <p className="text-center text-lg text-muted-foreground md:text-xl">
        Powered by Turborepo, Next.js and Module Federation
      </p>
      <div className="flex w-full items-center justify-center space-x-4 pb-8 pt-4 md:pb-10">
        <Link
          target="_blank"
          rel="noreferrer"
          href=""
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Iconify icon="fa:github" className="mr-2 h-4 w-4" />
          View on GitHub
        </Link>
      </div>
    </section>
  );
}
