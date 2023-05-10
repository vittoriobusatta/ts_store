import { ThunkDispatch } from 'redux-thunk';

import { RootState } from 'redux/store';
import { Action } from '@reduxjs/toolkit';
import { MoneyV2, Price } from './productTypes/price';
import { ImageConnection, ImageType } from './productTypes/image';
import { ProductVariantConnection } from './productTypes/variant';

export type Product = {
  __typename: string;
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  priceRange: Price;
  compareAtPriceRange: Price;
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
  price: MoneyV2;
  compareAtPrice: MoneyV2;
  image: ImageType;
};

export type AppDispatch = ThunkDispatch<RootState, any, Action>;
