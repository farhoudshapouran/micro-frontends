import useSWR from "swr";
import { useMemo } from "react";
// utils
import { fetcher, endpoints } from "../utils/axios";
// types
import { IProductItem } from "@repo/data-context/types/product";

// ----------------------------------------------------------------------

export function useLatestProducts() {
  const URL = endpoints.product.latest;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      latest: data?.data as IProductItem[],
      latestLoading: isLoading,
      latestError: error,
      latestValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useRelatedProducts(id: string) {
  const URL = endpoints.product.related(id);

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      related: data?.data as IProductItem[],
      relatedLoading: isLoading,
      relatedError: error,
      relatedValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
