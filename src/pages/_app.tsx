import "@/styles/globals.css";

import { Box, ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box padding={4} color={"#fff"} bgColor={"#333"} height={"100vh"}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}
