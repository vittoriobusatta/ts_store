import ProductPageContent from '@/components/Products/ProductPageContent';
import { getHandleProduct, getSingleProduct } from 'libs/shopify/storefront';
import { GetStaticProps } from 'next';
import { Product } from 'types';

type ProductPageProps = {
  product: Product;
};
type StaticPaths = {
  paths: { params: { handle: string } }[];
  fallback: boolean;
};
type ProductHandle = {
  handle: string;
};

export default function ProductPage({ product }: ProductPageProps) {
  return (
    <>
      <ProductPageContent product={product} />
    </>
  );
}

export const getStaticPaths = async (): Promise<StaticPaths> => {
  const productHandles: ProductHandle[] = await getHandleProduct();
  const paths: { params: ProductHandle }[] = productHandles.map(
    (item: ProductHandle) => ({
      params: { handle: item.handle },
    }),
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params?.handle === 'string') {
    const product: Product = await getSingleProduct(params.handle);
    return { props: { product } };
  }
  return { props: {} };
};
