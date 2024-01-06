// api
import { useLatestProducts } from "@/api/product";
// sections
import ProductList from "@/sections/product/product-list";

// ----------------------------------------------------------------------

export default function LatestProducts() {
  const { latest, latestLoading } = useLatestProducts();

  return <ProductList products={latest} loading={latestLoading} />;
}
