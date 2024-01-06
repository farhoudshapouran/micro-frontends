import Link from "next/link";
// routes
import { paths } from "@repo/utils/routes/paths";
// components
import { Logo } from "@repo/ui/components/logo";

// ----------------------------------------------------------------------

export function NavMain() {
  return (
    <div className="mr-16 hidden md:flex">
      <div className="mr-12">
        <Logo />
      </div>
      <nav className="flex items-center space-x-6 text-sm font-medium ml-1">
        <Link
          href={paths.docs.root}
          className="transition-colors hover:text-foreground/80"
        >
          Docs
        </Link>
        <Link
          href={paths.product.root}
          className="transition-colors hover:text-foreground/80"
        >
          Demo
        </Link>
      </nav>
    </div>
  );
}
