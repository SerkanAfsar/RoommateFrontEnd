import AppContextProvider from "../Contexts";
import "bootstrap-icons/font/bootstrap-icons.css";
import '../styles/globals.scss'
import Layout from "@/Components/Layout";
import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <AppContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContextProvider>
    </NextUIProvider>
  )
}

export default MyApp
