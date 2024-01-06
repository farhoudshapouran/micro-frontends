import ProductShopDetailsView from "@/sections/product/view/product-shop-details-view";

type PageProps = {
  id: string;
};

export default function Product({ id }: PageProps) {
  return <ProductShopDetailsView id={id} />;
}

export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const id = params.id;
  return {
    props: { id },
  };
};
