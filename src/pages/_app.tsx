import { Content } from "@/components/Content";
import { AuthProvider } from "@/context/AuthProvider";
import "@/styles/globals.css";

import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";

import type { AppProps } from "next/app";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },

  styles: {
    global: {
      body: {
        _dark: {
          bg: "#333",
          color: "white",
        },
        _light: {
          bg: "#f1f1f1",
          color: "black",
        },
      },
      button: {
        color: "#333",
      },
      option: {
        color: "#333",
      },
    },
  },
});

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
