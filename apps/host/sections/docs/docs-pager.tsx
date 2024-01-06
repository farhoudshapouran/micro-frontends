import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Doc } from "contentlayer/generated";
// types
import { SidebarNavItem } from "@/types/nav";
// routes
import { docs } from "@/utils/routes/docs";
import { cn } from "@repo/ui/lib/utils";
import { buttonVariants } from "@repo/ui/components/button";

interface DocsPagerProps {
  doc: Doc;
}

export function DocsPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc);

  if (!pager) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev?.href && (
        <Link
          href={pager.prev.href}
          className={buttonVariants({ variant: "outline" })}
        >
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next?.href && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: "outline" }), "ml-auto")}
        >
          {pager.next.title}
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export function getPagerForDoc(doc: Doc) {
  const flattenedLinks = [null, ...flatten(docs), null];
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link?.href
  );
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;
  return {
    prev,
    next,
  };
}

export function flatten(links: SidebarNavItem[]): SidebarNavItem[] {
  return links
    .reduce<SidebarNavItem[]>((flat, link) => {
      return flat.concat(link);
    }, [])
    .filter((link) => !link?.disabled);
}
