import ProductPage from "product/product";
const Product = ProductPage;
export default Product;

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
