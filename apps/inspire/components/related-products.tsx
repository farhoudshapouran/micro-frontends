// api
import { useRelatedProducts } from "@/api/product";
// components
import { ScrollArea, ScrollBar } from "@repo/ui/components/scroll-area";
// sections
import ProductList from "@/sections/product/product-list";

// ----------------------------------------------------------------------

type Props = {
  productId: string;
};

export default function RelatedProducts({ productId }: Props) {
  const { related, relatedLoading, relatedError } =
    useRelatedProducts(productId);

  return <ProductList products={related} loading={relatedLoading} />;
}
