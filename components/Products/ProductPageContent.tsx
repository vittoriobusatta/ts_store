import Image from 'next/image';
import { useState } from 'react';
import { Product } from 'types';
import ProductDetails from './ProductDetails';
import RecommendedList from './RecommendedList';
import { ImageType } from 'types/productTypes/image';

type ProductPageContentProps = {
  product: Product;
  allProducts: any;
};

type Images = ImageType[];

export default function ProductPageContent({
  product,
  allProducts,
}: ProductPageContentProps) {
  const [Loading, setLoading] = useState(true);

  // Create an empty array to hold the images
  const images: Images = [];
  // Loop through the images and add them to the array
  product.images.edges.forEach((image: any) => {
    images.push(image.node);
  });

  return (
    <section
      className="product"
      style={
        {
          '--color': product.color.value,
        } as React.CSSProperties
      }
    >
      <div className="product__container">
        <div className="placeholder" />
        {images.map((image) => (
          <Image
            key={product.id}
            src={image.url}
            alt={image.altText}
            width={286}
            height={429}
            onLoadingComplete={() => setLoading(false)}
            className={`product__container__image ${
              !Loading
                ? 'product__container__image--visible placeholder__image'
                : ''
            }
            `}
            priority
          />
        ))}
      </div>

      <ProductDetails product={product} />
      <RecommendedList current={product} allProducts={allProducts} />
    </section>
  );
}
