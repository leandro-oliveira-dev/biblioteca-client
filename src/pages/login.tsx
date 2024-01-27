import { useRouter } from "next/router";
import { useState } from "react";

import { api } from "@/lib/api";
import { Text, Heading, Input, Stack, VStack, Button } from "@chakra-ui/react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [ra, setRa] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth", {
        email,
        ra,
        password,
      });

      const { token } = response.data;

      localStorage.setItem("token", token);

      return token;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const handleLogin = async () => {
    try {
      const token = await loginUser(email, password);

      router.push("/books");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <VStack p={4}>
      <Heading color={"white"}>Login</Heading>

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
  );
}
