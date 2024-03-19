import { useRouter } from "next/router";
import { useState } from "react";

import {
  Text,
  Heading,
  Input,
  Stack,
  VStack,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";
import { useAuth } from "@/context/AuthProvider";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@email.com");
  const [ra, setRa] = useState("1111");
  const [password, setPassword] = useState("1234");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const token = await login({
        email,
        ra,
        password,
      });

      if (token) {
        router.push("/books");
      }
    } catch (error) {
      router.push("/login");

      console.error("Error during login:", error);
    }
  };

  return (
    <Box display="flex" flexDirection="row">
      <Box p={4} flex={1}>
        <VStack>
          <Heading color={"white"}>Bibli-Etec</Heading>
          <Stack color="white" spacing={3}>
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
