export interface ProductPriceRange {
  __typename: string;
  minVariantPrice: MoneyV2;
}

export interface compareAtPriceRange {
  __typename: string;
  minVariantPrice: MoneyV2;
}

export interface MoneyV2 {
  __typename: string;
  amount: string;
  currencyCode: string;
}
