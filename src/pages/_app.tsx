import { Content } from "@/components/Content";
import { AuthProvider } from "@/context/AuthProvider";
import "@/styles/globals.css";

import { Box, ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Content>
          <Box color={"#fff"} bg="#333" minHeight="100vh">
            <Component {...pageProps} />
          </Box>
        </Content>
      </AuthProvider>
    </ChakraProvider>
  );
}
