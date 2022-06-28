import AppContextProvider from "../Contexts";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

export default MyApp
