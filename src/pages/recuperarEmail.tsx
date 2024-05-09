import { useState } from "react";
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
import { useRouter } from "next/router";
import Head from "next/head";

export default function ResetPassword() {
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  const handleResetPassword = async () => {
    try {
      // Envia a solicitação para atualizar a senha
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
        }),
      });

      if (response.ok) {
        console.log("Senha atualizada com sucesso");
        router.push("/login");
      } else {
        throw new Error("Erro ao atualizar a senha");
      }
    } catch (error) {
      setError("Erro ao atualizar a senha.");
      console.error("Erro ao atualizar a senha:", error);
    }
  };

  return (
    <Box p={4}>
      <Head>
        <title>Redefinir Senha</title>
      </Head>
      <VStack spacing={4} align="stretch">
        <Heading size="lg">Redefinir Senha</Heading>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Text>Por favor, insira sua nova senha:</Text>
        <Input
          variant="outline"
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleResetPassword}>
          Atualizar Senha
        </Button>
      </VStack>
    </Box>
  );
}
