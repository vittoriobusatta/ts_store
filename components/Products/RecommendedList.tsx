import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type RecommendedListProps = {
  current: any;
  allProducts: any;
};

export default function RecommendedList({
  current,
  allProducts,
}: RecommendedListProps) {
  function shuffle(array: any) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const products = shuffle(allProducts)
    .filter((product: any) => product.id !== current.id)
    .slice(0, 4);

  return (
    <div className="recommended">
      <h2>Vous aimerez peut-être aussi</h2>
      <ul className="recommended__list">
        {products.map((product: any) => {
          const { url, altText } = product.images.edges[0].node;
          const { handle } = product;

          return (
            <li key={product.id}>
              <Link href={`/products/${handle}`} key={product.id}>
                <Image width={200} height={200} src={url} alt={altText} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
