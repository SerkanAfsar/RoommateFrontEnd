import Layout from '@/Components/Layout';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </NextUIProvider>
    </SessionProvider>
  );

}

export default MyApp
