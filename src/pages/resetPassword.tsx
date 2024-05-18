import { useState } from "react";
import {
  Text,
  Heading,
  Input,
  VStack,
  Button,
  Box,
  Alert,
  AlertIcon,
  useToast,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "@/context/AuthProvider";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [error, setError] = useState();
  const router = useRouter();
  const toast = useToast();
  const { api } = useAuth();

  const { token } = router.query;

  function handleResetPassword() {
    setIsLoading(true);

    api
      .put("/password/reset", {
        token,
        newPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          setPasswordSuccess(true);

          toast({
            title: "Senha alterada com sucesso",
            description: "Realize o login na pagina de login",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
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
        <title>Redefinir Senha</title>
      </Head>
      <VStack maxW={800} spacing={4} align="stretch">
        {!passwordSuccess && (
          <>
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
            <Button
              loadingText="Carregando..."
              isLoading={isLoading}
              colorScheme="blue"
              onClick={handleResetPassword}
            >
              Atualizar senha
            </Button>
          </>
        )}

        {passwordSuccess && (
          <Box>
            <Text>Senha alterada, acesse sua conta na tela de login</Text>
            <Button colorScheme="blue" as={Link} href="/login">
              Login
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
