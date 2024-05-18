import { useState } from "react";
import {
  Text,
  Heading,
  Input,
  VStack,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "@/context/AuthProvider";

export default function FirstAccess() {
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const toast = useToast();
  const { api } = useAuth();

  function handleResetPassword() {
    setIsLoading(true);

    api
      .put("/users/first/access", {
        newPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: "Senha alterada com sucesso",
            description: "",
            status: "success",
            duration: 9000,
            isClosable: true,
          });

          router.push("/");
        }
      })
      .finally(() => setIsLoading(false))
      .catch((error) => {
        console.log(error);

        toast({
          title: "Erro ao trocar senha",
          description: "Erro ao trocar senha, tente novamente",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <Box p={4} display={"flex"} justifyContent={"center"}>
      <Head>
        <title>Primeiro acesso</title>
      </Head>
      <VStack maxW={800} spacing={4} align="stretch">
        <Heading size="lg">Criar Senha</Heading>

        <Text>Por favor, insira uma senha:</Text>

        <Input
          variant="outline"
          type="password"
          placeholder="Senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          loadingText="Carregando..."
          isLoading={isLoading}
          colorScheme="blue"
          onClick={handleResetPassword}
        >
          Criar senha
        </Button>
      </VStack>
    </Box>
  );
}
