import { ImageType } from 'types/productTypes/image';

export interface Cart {
  id: string;
  totalQuantity: number;
  cost: {
    checkoutChargeAmount: {
      amount: number;
    };
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise?: {
          id: string;
          quantityAvailable: number;
          availableForSale: boolean;
          price: {
            amount: number;
          };
          image: ImageType;
        };
      };
    }[];
    userErrors: {
      code: string;
      field?: string;
      message: string;
    }[];
  };
}
