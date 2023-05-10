import { ThunkDispatch } from 'redux-thunk';

import { RootState } from 'redux/store';
import { Action } from '@reduxjs/toolkit';
import { ProductPriceRange, compareAtPriceRange } from './productTypes/price';
import { ImageConnection } from './productTypes/image';
import { ProductVariantConnection } from './productTypes/variant';

export type Product = {
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
};

export type VariantCartAdded = {
  id: string;
  title: string;
  variantQuantity: number;
  cartId: string;
  price: number;
  handle: string;
};

export type ProductVariant = {
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
};

export type AppDispatch = ThunkDispatch<RootState, any, Action>;
