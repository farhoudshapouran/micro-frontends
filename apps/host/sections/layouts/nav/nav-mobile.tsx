"use client";

import { useState } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
// utils
import { cn } from "@repo/ui/lib/utils";
// components
import { Iconify } from "@repo/ui/components/iconify";
import { Button } from "@repo/ui/components/button";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@repo/ui/components/sheet";
import { Logo } from "@repo/ui/components/logo";
// routes
import { paths } from "@repo/utils/routes/paths";

// ----------------------------------------------------------------------

export function NavMobile() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-4 px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Iconify icon="solar:hamburger-menu-linear" className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Logo className="mr-2" disabledLink={true} />
        </MobileLink>
        <ScrollArea className="my-6 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <MobileLink href={paths.docs.root} onOpenChange={setOpen}>
              Docs
            </MobileLink>
            <MobileLink href={paths.product.root} onOpenChange={setOpen}>
              Demo
            </MobileLink>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
