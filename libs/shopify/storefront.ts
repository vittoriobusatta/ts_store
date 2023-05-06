const {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} = require('@apollo/client');
import queryAllProducts from '@/graphql/getAllProducts.graphql';
import querySingleProduct from '@/graphql/getSingleProduct.graphql';
import queryHandlesProducts from '@/graphql/getHandleProduct.graphql';

const domain = process.env.SHOPIFY_STORE_DOMAIN;

// Storefront API Access
const storefrontApiAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const storefrontApiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION;

// Create store storefront API
export const storeClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://${domain}/api/${storefrontApiVersion}/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontApiAccessToken,
    },
  }),
  cache: new InMemoryCache(),
});

export async function getAllProducts() {
  const { body } = queryAllProducts.loc.source;

  try {
    const response = await storeClient.query({
      query: gql`
        ${body}
      `,
    });

    return response.data.products.edges.map((edge: any) => edge.node);
  } catch (err) {
    console.error(err);
    // return {} as any;
    return [];
  }
}

export async function getHandleProduct() {
  const { body } = queryHandlesProducts.loc.source;

  try {
    const response = await storeClient.query({
      query: gql`
        ${body}
      `,
    });

    return response.data.products.edges.map((edge: any) => edge.node);
  } catch (err) {
    console.error(err);
    // return {} as any;
    return [];
  }
}

export async function getSingleProduct(handle: string) {
  const { body } = querySingleProduct.loc.source;

  try {
    const response = await storeClient.query({
      query: gql`
        ${body}
      `,
      variables: { handle },
    });

    return response.data.product;
  } catch (err) {
    console.error(err);
    // return {} as any;
    return [];
  }
}

// export async function createCart(id, quantity) {
//   const query = `
//     mutation {
//       cartCreate(
//         input: {
//           lines: [
//             {
//               quantity: ${quantity}
//               merchandiseId: "${id}"
//             }
//           ]
//         }
//       ) {
//         cart {
//           id
//           totalQuantity
//           cost {
//             checkoutChargeAmount {
//               amount
//             }
//           }
//           lines(first: 10) {
//             edges {
//               node {
//                 id
//                 quantity
//                 merchandise {
//                   ... on ProductVariant {
//                     id
//                     quantityAvailable
//                     availableForSale
//                     price {
//                       amount
//                     }
//                     image {
//                       url
//                       altText
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     `;

//   try {
//     const response = await storeClient.mutate({
//       mutation: gql`
//         ${query}
//       `,
//     });

//     return response.data.cartCreate.cart;
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// }

// export async function addToCart(cartId, merchandiseId, quantity) {
//   const query = `
//     mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
//       cartLinesAdd(cartId: $cartId, lines: $lines) {
//         cart {
//           id
//           totalQuantity
//           checkoutUrl
//           cost {
//             checkoutChargeAmount {
//               amount
//             }
//           }
//           lines(first: 10) {
//             edges {
//               node {
//                 id
//                 quantity
//                 merchandise {
//                   ... on ProductVariant {
//                     id
//                     title
//                     quantityAvailable
//                     availableForSale
//                     price {
//                       amount
//                     }
//                     image {
//                       url
//                       altText
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//         userErrors {
//           field
//           message
//         }
//       }
//     }
//   `;

//   const variables = {
//     cartId,
//     lines: [
//       {
//         quantity,
//         merchandiseId,
//       },
//     ],
//   };

//   try {
//     const response = await storeClient.mutate({
//       mutation: gql`
//         ${query}
//       `,
//       variables,
//     });

//     return response.data.cartLinesAdd.cart;
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// }

// export async function delFromCart(cartId, lineId) {
//   const mutation = `
//   mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
//     cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
//       cart {
//         id
//         totalQuantity
//         cost {
//           checkoutChargeAmount {
//             amount
//           }
//         }
//         lines(first: 10) {
//           edges {
//             node {
//               id
//               quantity
//               merchandise {
//                 ... on ProductVariant {
//                   id
//                   title
//                   quantityAvailable
//                   availableForSale
//                   price {
//                     amount
//                   }
//                   image {
//                     url
//                     altText
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//       userErrors {
//         field
//         message
//       }
//     }
//   }
//   `;

//   const variables = {
//     cartId,
//     lineIds: [lineId],
//   };

//   try {
//     const response = await storeClient.mutate({
//       mutation: gql`
//         ${mutation}
//       `,
//       variables,
//     });

//     return response.data.cartLinesRemove.cart;
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// }

// export async function getCart(cartId) {
//   const query = `
//     {
//       cart(
//         id: "${cartId}"
//       ) {
//         id
//         totalQuantity
//         lines(first: 10) {
//           edges {
//             node {
//               id
//               quantity
//               merchandise {
//                 ... on ProductVariant {
//                   id
//                   quantityAvailable
//                   availableForSale
//                   price {
//                     amount
//                   }
//                   image {
//                     url
//                     altText
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     `;

//   try {
//     const response = await storeClient.query({
//       query: gql`
//         ${query}
//       `,
//     });

//     return response.data.cart;
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// }

// export async function productRecommendations(productId) {
//   const query = `
//   query productRecommendations($productId: ID!) {
//     productRecommendations(productId: $productId) {
//       id
//       handle
//       title
//       productType
//       images(first: 5) {
//         edges {
//           node {
//             url
//             altText
//           }
//         }
//       }
//     }
//   }
//   `;
//   const variables = {
//     productId,
//   };

//   try {
//     const response = await storeClient.query({
//       query: gql`
//         ${query}
//       `,
//       variables,
//     });

//     return response.data.productRecommendations;
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// }
