const {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} = require('@apollo/client');
import queryAllProducts from '@/graphql/product/getAllProducts.graphql';
import querySingleProduct from '@/graphql/product/getSingleProduct.graphql';
import queryHandlesProducts from '@/graphql/product/getHandleProduct.graphql';
import mutationAddToCart from '@/graphql/cart/AddToCart.graphql';
import mutationCreateCart from '@/graphql/cart/CreateCart.graphql';
import mutationDelFromCart from '@/graphql/cart/DelFromCart.graphql';

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

export async function createCart(id: string, quantity: number) {
  const { body } = mutationCreateCart.loc.source;

  try {
    const response = await storeClient.mutate({
      mutation: gql`
        ${body}
      `,
      variables: {
        id,
        quantity,
      },
    });

    return response.data.cartCreate.cart;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function addToCart(
  cartId: string,
  merchandiseId: string,
  quantity: number,
) {
  const { body } = mutationAddToCart.loc.source;

  const variables = {
    cartId,
    lines: [
      {
        quantity,
        merchandiseId,
      },
    ],
  };

  try {
    const response = await storeClient.mutate({
      mutation: gql`
        ${body}
      `,
      variables,
    });

    return response.data.cartLinesAdd.cart;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function delFromCart(cartId: string, lineId: string) {
  const { body } = mutationDelFromCart.loc.source;

  const variables = {
    cartId,
    lineIds: [lineId],
  };

  try {
    const response = await storeClient.mutate({
      mutation: gql`
        ${body}
      `,
      variables,
    });

    return response.data.cartLinesRemove.cart;
  } catch (err) {
    console.error(err);
    return [];
  }
}

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
