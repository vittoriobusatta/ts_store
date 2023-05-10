export interface ImageType {
  __typename: string;
  url: string;
  altText: string;
}

export interface ImageEdge {
  __typename: string;
  node: ImageType;
}

export interface ImageConnection {
  __typename: string;
  edges: ImageEdge[];
}
