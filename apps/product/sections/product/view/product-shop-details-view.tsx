"use client";

import { lazy, Suspense } from "react";
import Link from "next/link";
import Head from "next/head";
// routes
import { paths } from "@repo/utils/routes/paths";
// api
import { useGetProduct } from "@/api/product";
// components
import { Button } from "@repo/ui/components/button";
import { Iconify } from "@repo/ui/components/iconify";
import { Breadcrumbs } from "@repo/ui/components/breadcrumbs";
//
import ProductDetailsSummary from "../product-details-summary";
import ProductDetailsCarousel from "../product-details-carousel";
import RelatedProducts from "@/components/related-products";

const EmptyContent = lazy(() => import("@repo/ui/components/empty-content"));

type Props = {
  id: string;
};

export default function ProductShopDetailsView({ id }: Props) {
  const { product, productLoading, productError } = useGetProduct(id);

  const renderError = (
    <EmptyContent
      title={`${productError?.message}`}
      action={
        <Button variant="link" asChild>
          <Link href={paths.product.root}>
            <Iconify icon="eva:arrow-ios-back-fill" className="mr-2 h-4 w-4" />
            Back to List
          </Link>
        </Button>
      }
    />
  );

  const renderProduct = product && (
    <div className="mx-auto xl:mx-40">
      <Breadcrumbs
        links={[
          { name: "Home", href: "/" },
          {
            name: "Shop",
            href: paths.product.root,
          },
          { name: product?.name },
        ]}
        className="mb-6"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 justify-center gap-6 lg:gap-16 xl:gap-20 mb-6">
        <div className="lg:col-span-7">
          <ProductDetailsCarousel product={product} />
        </div>
        <div className="lg:col-span-5">
          <ProductDetailsSummary product={product} />
        </div>
      </div>
      <div className="my-16">
        <h3 className="text-lg font-bold mb-4 overflow-auto">
          Related Products
        </h3>
        <RelatedProducts productId={id} />
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Product Details - Micro Frontends</title>
      </Head>
      <div className="container mx-auto">
        {productError && <Suspense>{renderError}</Suspense>}
        <main className="relative">{product && renderProduct}</main>
      </div>
    </>
  );
}
