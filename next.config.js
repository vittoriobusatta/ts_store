/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'graphql-tag/loader',
        },
      ],
    });

    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cdn.shopify.com'],
  },
  env: {
    SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,

    SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_STOREFRONT_API_VERSION:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION,

    SHOPIFY_ADMIN_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN,
    SHOPIFY_ADMIN_API_KEY: process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_KEY,
    SHOPIFY_ADMIN_API_VERSION:
      process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_VERSION,

    STRIPE_SECRET_TEST_KEY: process.env.NEXT_PUBLIC_STRIPE_SECRET_TEST_KEY,
    STRIPE_SECRET_KEY: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,

    SERVER_HOSTNAME: process.env.NEXT_PUBLIC_SERVER_HOSTNAME,
  },
};
