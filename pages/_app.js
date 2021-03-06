import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
