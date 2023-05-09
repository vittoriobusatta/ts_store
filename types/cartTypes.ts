export interface CartResponse {
  cartCreate: {
    cart?: Cart;
  };
}
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
          image: {
            url: string;
            altText: string;
          };
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

export interface CartData {
  id: string;
  totalQuantity: number;
  cost: {
    checkoutChargeAmount: {
      amount: number;
      __typename: string;
    };
    __typename: string;
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          quantityAvailable: number;
          availableForSale: boolean;
          price: {
            amount: string;
            __typename: string;
          };
          image: {
            url: string;
            altText: string;
            __typename: string;
          };
          __typename: string;
        };
        __typename: string;
      };
      __typename: string;
    }[];
    __typename: string;
  };
  __typename: string;
}
