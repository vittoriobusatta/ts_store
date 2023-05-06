import Layout from '@/components/Layout';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} key={router.asPath} />
          </Layout>
        </Provider>
      </PersistGate>
    </>
  );
}

export default MyApp;
