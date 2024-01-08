// components
import { ScrollArea, ScrollBar } from "@repo/ui/components/scroll-area";
import ProductItem from "@repo/ui/components/product/product-item";
import { ProductListSkeleton } from "@repo/ui/components/skeletons/products-skeleton";
// types
import type { IProductItem } from "@repo/data-context/types/product";

// ----------------------------------------------------------------------

type ProductListProps = {
  products: IProductItem[];
  loading?: boolean;
};

export default function ProductList({
  products = [],
  loading,
}: ProductListProps) {
  const renderSkeleton = <ProductListSkeleton count={10} />;

  const renderList = (
    <div className="relative">
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {products.map((product, index) => (
            <ProductItem
              key={product.id}
              product={product}
              className="w-[246px]"
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );

  return loading ? renderSkeleton : renderList;
}
