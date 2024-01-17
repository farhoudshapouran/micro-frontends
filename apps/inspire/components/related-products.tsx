// api
import { useRelatedProducts } from "@/api/product";
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
