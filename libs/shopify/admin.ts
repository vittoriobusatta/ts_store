const { ApolloClient, InMemoryCache, HttpLink } = require('@apollo/client');

const domain = process.env.SHOPIFY_STORE_DOMAIN;

// Storefront API Access
const storefrontApiAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const storefrontApiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION;

// Create store admin API
export const adminClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://${domain}/admin/api/${storefrontApiVersion}/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontApiAccessToken,
    },
  }),
  cache: new InMemoryCache(),
});
