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
