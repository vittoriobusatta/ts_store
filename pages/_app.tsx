import Layout from '@/components/Layout';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import '../sass/styles.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} key={router.asPath} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
