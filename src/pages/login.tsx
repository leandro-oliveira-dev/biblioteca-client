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
  useColorMode,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "@/context/AuthProvider";
import Head from "next/head";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Login() {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [ra, setRa] = useState("");
  const [password, setPassword] = useState("");
  const [actionResetPassword, setActionResetPassword] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setEmail("admin@email.com");
      setRa("1111");
      setPassword("1234");
    }
  }, []);

  const { login, api } = useAuth();

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

  function handleSendResetPassword() {
    setActionResetPassword(true);

    if (email.length > 0) {
      api
        .post("/password/reset/send/email", {
          email,
        })
        .then((response) => {
          if (response.status === 200) {
            toast({
              title: "Email de recuperacao de senha enviado",
              description: "Acesse seu email para recuperar a senha",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <Box display="flex" flexDirection="row">
      <Head>
        <title>Login Biblioteca</title>
      </Head>
      <Box p={4} flex={1}>
        <VStack>
          <Box display={"flex"}>
            {colorMode === "light" ? (
              <Box
                py={1}
                px={2}
                rounded={8}
                bg={"grey"}
                cursor={"pointer"}
                onClick={toggleColorMode}
              >
                <MoonIcon />
              </Box>
            ) : (
              <Box
                py={1}
                px={2}
                rounded={8}
                bg={"grey"}
                cursor={"pointer"}
                onClick={toggleColorMode}
              >
                <SunIcon />
              </Box>
            )}
          </Box>
          <Heading>Bibli-Etec</Heading>
          <Stack spacing={3}>
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
              onFocus={() => setActionResetPassword(false)}
              variant="outline"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {!email && actionResetPassword && (
              <Alert status="error">
                Preencha o email para resetar a senha
              </Alert>
            )}

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

            <Link onClick={handleSendResetPassword} textAlign={"center"}>
              Esqueci minha senha
            </Link>
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
