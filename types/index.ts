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
  cartId: string;
  image: {
    src: string;
    alt: string;
  };
  price: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  quantityAvailable: number;
  availableForSale: boolean;
  price: {
    amount: string;
  };
  compareAtPrice: {
    amount: string;
  } | null;
  image: {
    url: string;
    altText: string;
  };
}
