import { Content } from "@/components/Content";
import { AuthProvider } from "@/context/AuthProvider";
import "@/styles/globals.css";

import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";

import type { AppProps } from "next/app";
import { theme as customTheme } from "@/styles/theme";
import Head from "next/head";

const theme = extendTheme(customTheme);

export default function App({ Component, pageProps }: AppProps) {
  console.log(process.env.API_URL);

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
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
