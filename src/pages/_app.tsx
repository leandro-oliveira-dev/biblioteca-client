import { Content } from "@/components/Content";
import { AuthProvider } from "@/context/AuthProvider";
import "@/styles/globals.css";

import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";

import type { AppProps } from "next/app";
import { theme as customTheme } from "@/styles/theme";

const theme = extendTheme(customTheme);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Content>
          <Box minHeight="100vh">
            <Component {...pageProps} />
          </Box>
        </Content>
      </AuthProvider>
    </ChakraProvider>
  );
}
