import Image from 'next/image';
import { useState } from 'react';
import { Product } from 'types';
// import ProductDetails from './ProductDetails';
// import RecommendedList from './RecommendedList';

interface Image {
  url: string;
  altText: string;
}

export default function ProductPageContent({ product }: { product: Product }) {
  const [Loading, setLoading] = useState(true);

  const images: Image[] = [];
  product.images.edges.forEach((image) => {
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
          />
        ))}
      </div>

      {/* <ProductDetails product={product} />

      <RecommendedList current={product} allProducts={allProducts} /> */}
    </section>
  );
}
