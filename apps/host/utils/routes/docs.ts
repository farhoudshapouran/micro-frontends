import { SidebarNavItem } from "@/types/nav";
import { paths } from "@repo/utils/routes/paths";

const ROOT = paths.docs.root;

export const docs: SidebarNavItem[] = [
  {
    title: "Introduction",
    href: ROOT,
  },
  {
    title: "Monorepo",
    href: `${ROOT}/monorepo`,
  },
  {
    title: "Module Federation",
    href: `${ROOT}/module-federation`,
  },
];
