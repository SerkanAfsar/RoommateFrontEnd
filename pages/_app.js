import AppContextProvider from "../Contexts";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/globals.scss'
import Layout from "@/Components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  )
}

export default MyApp
