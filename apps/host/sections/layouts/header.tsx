"use client";

import { lazy, Suspense } from "react";
// components
import { NavMain } from "./nav/nav-main";
import { NavMobile } from "./nav/nav-mobile";
import { UserMenu } from "./common/user-menu";
// skeletons
import {
  ButtonSkeleton,
  IconButtonSkeleton,
} from "@repo/ui/components/skeletons/button-skeleton";

const CartMenu = lazy(() => import("checkout/cart-menu"));
const ProductSearch = lazy(() => import("product/search"));

// ----------------------------------------------------------------------

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center">
        <NavMain />
        <NavMobile />
        <div className="flex flex-1 items-center space-x-4 md:justify-end">
          <Suspense fallback={<ButtonSkeleton className="sm:pr-12 lg:w-80" />}>
            <ProductSearch />
          </Suspense>
          <div className="flex space-x-1">
            <UserMenu />
            <Suspense fallback={<IconButtonSkeleton />}>
              <CartMenu />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
