import { ProductVariant } from 'types';

type ProductVariantEdge = {
  node: ProductVariant;
};

export type ProductVariantConnection = {
  edges: ProductVariantEdge[];
};
