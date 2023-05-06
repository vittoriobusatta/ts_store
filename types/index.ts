import {
  ImageConnection,
  ProductPriceRange,
  ProductVariantConnection,
  compareAtPriceRange,
} from './productTypes';

export interface Product {
  __typename: string;
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  priceRange: ProductPriceRange;
  compareAtPriceRange: compareAtPriceRange;
  images: ImageConnection;
  color: {
    __typename: string;
    value: string;
  };
  variants: ProductVariantConnection;
}

export interface VariantItem {
  id: string;
  title: string;
  handle: string;
  productType: string;
  variantQuantity: number;
  cartId: string | null;
  image: {
    src: string;
    alt: string;
  };
  price: number;
}

// export interface AllProducts {
//   map(arg0: (product: any) => { params: { handle: any } }): unknown;
//   __typename: string;
//   handle: string;
//   id: string;
//   title: string;
//   productType: string;
//   priceRange: ProductPriceRange;
//   images: ImageConnection;
// }
