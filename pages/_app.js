import { NextUIProvider } from '@nextui-org/react';
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );

}

export default MyApp
