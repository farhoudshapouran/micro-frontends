"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// types
import { SidebarNavItem } from "@/types/nav";
// utils
import { cn } from "@repo/ui/lib/utils";

// ----------------------------------------------------------------------

interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname();

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <DocsSidebarNavItems key={index} item={item} pathname={pathname} />
      ))}
    </div>
  ) : null;
}

// ----------------------------------------------------------------------

interface DocsSidebarNavItemsProps {
  item: SidebarNavItem;
  pathname: string | null;
}

export function DocsSidebarNavItems({
  item,
  pathname,
}: DocsSidebarNavItemsProps) {
  return (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {item.href && !item.disabled ? (
        <Link
          href={item.href}
          className={cn(
            "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
            item.disabled && "cursor-not-allowed opacity-60",
            pathname === item.href
              ? "font-medium text-foreground"
              : "text-muted-foreground"
          )}
          target={item.external ? "_blank" : ""}
          rel={item.external ? "noreferrer" : ""}
        >
          {item.title}
          {item.label && (
            <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
              {item.label}
            </span>
          )}
        </Link>
      ) : (
        <span
          className={cn(
            "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
            item.disabled && "cursor-not-allowed opacity-60"
          )}
        >
          {item.title}
          {item.label && (
            <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
              {item.label}
            </span>
          )}
        </span>
      )}
    </div>
  );
}
