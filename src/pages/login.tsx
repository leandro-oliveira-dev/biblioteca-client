import { useEffect, useState } from "react";

import {
  Text,
  Heading,
  Input,
  Stack,
  VStack,
  Button,
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useAuth } from "@/context/AuthProvider";
import Head from "next/head";

export default function Login() {
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [ra, setRa] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setEmail("admin@email.com");
      setRa("1111");
      setPassword("1234");
    }
  }, []);

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        email,
        ra,
        password,
      });
    } catch (error) {
      setError("Login ou senha invalidos");
      console.log("Error during login:", error);
    }
  };

  return (
    <Box display="flex" flexDirection="row">
      <Head>
        <title>Login Biblioteca</title>
      </Head>
      <Box p={4} flex={1}>
        <VStack>
          <Heading color={"white"}>Bibli-Etec</Heading>
          <Stack color="white" spacing={3}>
            {error.length > 0 && (
              <Alert status="error">
                <AlertIcon />
                Dados de login invalidos
              </Alert>
            )}
            <Text>RA</Text>
            <Input
              variant="outline"
              type="ra"
              value={ra}
              onChange={(e) => setRa(e.target.value)}
            />

            <Text>Email</Text>
            <Input
              variant="outline"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Text>Senha</Text>
            <Input
              variant="outline"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button colorScheme="blue" onClick={handleLogin}>
              Login
            </Button>
          </Stack>
        </VStack>
      </Box>
      <Box
        flex={3}
        style={{
          backgroundImage: 'url("/PREDIO-ETEC-PEDRO-GODOY-PMI-1024x682.jpg")',
          backgroundSize: "cover", // Cobrir toda a área do contêiner
          backgroundPosition: "right",
          height: "100vh", // Definir a altura igual à altura da janela de exibição
        }}
      ></Box>
    </Box>
  );
}
