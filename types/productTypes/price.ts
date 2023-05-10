export interface Price {
  __typename: string;
  minVariantPrice: MoneyV2;
}

export interface MoneyV2 {
  __typename: string;
  amount: string;
  currencyCode: string;
}
