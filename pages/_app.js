import Layout from '@/Components/Layout';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from "next-auth/react"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss'

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </SessionProvider>
  );

}

export default MyApp
