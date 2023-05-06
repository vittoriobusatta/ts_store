interface ProductVariant {
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

type ProductVariantEdge = {
  node: ProductVariant;
};

export type ProductVariantConnection = {
  edges: ProductVariantEdge[];
};

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

export interface Image {
  __typename: string;
  url: string;
  altText: string;
}

export interface ImageEdge {
  __typename: string;
  node: Image;
}

export interface ImageConnection {
  __typename: string;
  edges: ImageEdge[];
}
