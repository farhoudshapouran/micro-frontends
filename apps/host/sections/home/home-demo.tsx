"use client";

import Link from "next/link";
import { lazy, Suspense } from "react";
// routes
import { paths } from "@repo/utils/routes/paths";
// skeletons
import { ProductListSkeleton } from "@repo/ui/components/skeletons/products-skeleton";

const LatestProducts = lazy(() => import("product/latest-products"));

export default function HomeDemo() {
  return (
    <section className="py-8">
      <div className="home-latest mb-10">
        <Suspense
          fallback={<ProductListSkeleton className="ml-5" count={10} />}
        >
          <LatestProducts />
        </Suspense>
      </div>
      <div className="container flex flex-col items-center text-center">
        <p className="max-w-3xl text-lg text-muted-foreground">
          For example, this product list is imported from a remote application,
          you can check the full example from{" "}
          <Link href={paths.product.root} className="text-primary underline">
            here
          </Link>{" "}
          and experience a real shopping process. For more information about
          micro frontends and this project please read the{" "}
          <Link href={paths.docs.root} className="text-primary underline">
            documentation
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
