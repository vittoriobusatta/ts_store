import { ImageType } from 'types/productTypes/image';
import { MoneyV2 } from 'types/productTypes/price';

export interface Cart {
  id: string;
  totalQuantity: number;
  cost: {
    checkoutChargeAmount: MoneyV2;
    __typename: string;
  };
  lines: {
    edges: CartLineEdge[];
    __typename: string;
  };
  __typename: string;
}

export type CartLineItem = {
  line: CartLineEdge;
  cartItem: CartItem;
};

export type CartItem = {
  handle: string;
  id: string;
  title: string;
  variantQuantity: number;
};

type CartLineEdge = {
  node: CartLine;
  __typename: string;
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise?: Merchandise;
  __typename: string;
};

type Merchandise = {
  id: string;
  title: string;
  quantityAvailable: number;
  availableForSale: boolean;
  price: MoneyV2;
  image: ImageType;
  __typename: string;
};
