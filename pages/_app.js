import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Script from "next/script";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* This is the only way for the MercadoPago certification bot to detect the security script*/}
      <Head>
        <Script
          src="https://www.mercadopago.com/v2/security.js"
          view="item"
          strategy="beforeInteractive"
        />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>

      {/*
      Sets CSS styles so that each page occupies the whole height of the viewport. This is neccesary so that childs
      of the Page component can set the height with a %. Without this code that way of setting the height won't work
      because Next wraps the whole app with other internal divs.
      Source: https://gist.github.com/dmurawsky/d45f068097d181c733a53687edce1919
      */}
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div,
        div#__next > div > div {
          height: 100%;
        }
      `}</style>
    </>
  );
}

export default MyApp;
