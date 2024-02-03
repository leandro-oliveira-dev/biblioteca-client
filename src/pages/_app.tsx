import { Content } from "@/components/Content";
import "@/styles/globals.css";

import { Box, ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Content>
        <Box color={"#fff"} bg="#333" minHeight="100vh" p={4}>
          <Component {...pageProps} />
        </Box>
      </Content>
    </ChakraProvider>
  );
}
