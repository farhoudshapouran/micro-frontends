// components
import ProductItem from "@repo/ui/components/product/product-item";
// types
import { IProductItem } from "@repo/data-context/types/product";

type ProductListProps = {
  products: IProductItem[];
  loading?: boolean;
};

export default function ProductGrid({
  products = [],
  loading,
}: ProductListProps) {
  return (
    <div className="mx-auto w-full min-w-0 pl-0 xl:pl-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 flex-1">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} ratio={5 / 6} />
        ))}
      </div>
    </div>
  );
}
