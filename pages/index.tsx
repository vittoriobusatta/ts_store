import Head from 'next/head';
import { getAllProducts } from 'libs/shopify/storefront';

export async function getServerSideProps() {
  const products = await getAllProducts();
  return {
    props: {
      products,
    },
  };
}

export default function Home({ products }: { products: any }) {
  console.log(products);

  return (
    <>
      <Head>
        <title>Accueil</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Home" />
        <meta
          property="og:description"
          content="Generated by create next app"
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://www.example.com" />
      </Head>
      <main>
        <h1>Salut</h1>
      </main>
    </>
  );
}
