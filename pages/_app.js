import Layout from '@/Components/Layout';
import { NextUIProvider } from '@nextui-org/react';
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  );

}

export default MyApp
