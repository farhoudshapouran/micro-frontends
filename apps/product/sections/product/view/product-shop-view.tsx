"use client";

import orderBy from "lodash/orderBy";
import isEqual from "lodash/isEqual";
import { useCallback, useState } from "react";
// api
import { useGetProducts } from "@/api/product";
// types
import {
  IProductFilters,
  IProductFilterValue,
  IProductItem,
} from "@repo/data-context/types/product";
//
import ProductFilter from "../product-filters";
import ProductGrid from "../product-grid";
import Head from "next/head";

const defaultFilters: IProductFilters = {
  sort: "featured",
  gender: [],
  category: [],
  colors: [],
};

export default function ProductShopView() {
  const [filters, setFilters] = useState(defaultFilters);

  const { products, productsLoading, productsEmpty } = useGetProducts();

  const handleFilters = useCallback(
    (name: string, value: IProductFilterValue) => {
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const dataFiltered = applyFilter({
    inputData: products,
    filters,
  });

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = !dataFiltered.length && canReset;

  const handleSearch = useCallback((inputValue: string) => {
    //setSearchQuery(inputValue);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <Head>
        <title>Shop Demo - Micro Frontends</title>
      </Head>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 hidden w-full shrink-0 md:sticky md:block">
          <ProductFilter filters={filters} onFilters={handleFilters} />
        </aside>
        <main className="relative py-3 md:gap-10 md:py-6">
          <ProductGrid products={dataFiltered} />
        </main>
      </div>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  filters,
}: {
  inputData: IProductItem[];
  filters: IProductFilters;
}) {
  const { sort, gender, category, colors } = filters;

  // SORT BY
  if (sort === "featured") {
    inputData = orderBy(inputData, ["totalSold"], ["desc"]);
  }

  if (sort === "newest") {
    inputData = orderBy(inputData, ["createdAt"], ["desc"]);
  }

  if (sort === "priceDesc") {
    inputData = orderBy(inputData, ["price"], ["desc"]);
  }

  if (sort === "priceAsc") {
    inputData = orderBy(inputData, ["price"], ["asc"]);
  }

  // FILTERS
  if (gender.length) {
    inputData = inputData.filter((product) =>
      gender.includes(product.gender.value)
    );
  }

  if (category.length) {
    inputData = inputData.filter((product) =>
      category.includes(product.category.value)
    );
  }

  if (colors.length) {
    inputData = inputData.filter((product) =>
      product.colors.some((color) => colors.includes(color))
    );
  }

  return inputData;
}
