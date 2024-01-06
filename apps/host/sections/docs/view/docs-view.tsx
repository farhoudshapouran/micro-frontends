import Link from "next/link";
import { Doc } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
// layouts
import DocsLayout from "@/sections/layouts/docs";
// utils
import { cn } from "@repo/ui/lib/utils";
// components
import { badgeVariants } from "@repo/ui/components/badge";
import { Iconify } from "@repo/ui/components/iconify";
import { ScrollArea } from "@repo/ui/components/scroll-area";
//
import { DocsPager } from "../docs-pager";
import { DocsMdxContent } from "../docs-mdx-content";
import Head from "next/head";

// ----------------------------------------------------------------------

interface DocsViewProps {
  doc: Doc;
}

export default function DocsView({ doc }: DocsViewProps) {
  return (
    <DocsLayout>
      <Head>
        <title>{doc.title} - Micro Frontends</title>
      </Head>
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            Docs
          </div>
          <Iconify icon="mdi:chevron-right" className="h-5 w-5" />
          <div className="font-medium text-foreground">{doc.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-lg text-muted-foreground">
              <Balancer>{doc.description}</Balancer>
            </p>
          )}
        </div>
        {doc.links ? (
          <div className="flex items-center space-x-2 pt-4">
            {doc.links?.doc && (
              <Link
                href={doc.links.doc}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                Docs
                <Iconify
                  icon="heroicons-outline:external-link"
                  className="h-3 w-3"
                />
              </Link>
            )}
          </div>
        ) : null}
        <div className="pb-12 pt-8">
          <DocsMdxContent code={doc.body.code} />
        </div>
        <DocsPager doc={doc} />
      </div>
      {/* Table of Contents */}
    </DocsLayout>
  );
}
