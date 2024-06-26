import { SetStateAction, useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";

import { Box } from "@chakra-ui/react";
import { Button as AppButton } from "@/components/ui/Button";

import {
  Button,
  FormControl,
  FormLabel,
  Thead,
  Tr,
  Td,
  Th,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
  VStack,
  TableContainer,
  Table,
  Tbody,
  HStack,
  Flex,
  Badge,
} from "@chakra-ui/react";

import { DEFAULT_MESSAGES } from "@/errors/DEFAULT_MESSAGES";
import { useAuth } from "@/context/AuthProvider";
import { SearchIcon } from "@chakra-ui/icons";
import router from "next/router";

interface IAuth {
  email: string;
  ra: string;
}

interface IUsers {
  id: string;
  name: string;
  password: string;
  auth: IAuth;
  email: string;
  ra: string;
  isAdmin: boolean;
  enabled: boolean;
}

export default function CadastrarUsuario() {
  const { api } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ra, setRa] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [users, setUsers] = useState<IUsers[]>([]);

  const toast = useToast();
  const initialRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItens, setTotalItens] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchUserString, setSearchUserString] = useState("");

  useEffect(() => {
    const { name } = router.query;

    if (name) {
      setSearchUserString(String(name));
    }

    const nameQuery = name ? `&name=${name}` : "";

    const url = `/users/list?page=${currentPage}&pageSize=${pageSize}${nameQuery}`;

    api
      .get(url)
      .then((response) => response.data)
      .then((value) => {
        setUsers(value.users);
        setTotalItens(value.totalUsers);
        setTotalPages(value.totalPages);
        setHasPreviousPage(value.hasPreviousPage);
        setHasNextPage(value.hasNextPage);
      })
      .catch((error) => console.log(error));
  }, [api, currentPage, pageSize]);

  function handleSaveUsers() {
    const data = {
      id,
      name,
      email,
      password,
      ra,
    };

    const url = isEditing ? `/users/update/${id}` : "/users/create";

    const apiRequest = isEditing ? api.put : api.post;

    apiRequest(url, data)
      .then((response) => response.data)
      .then((data) => {
        if (isEditing) {
          // Atualizar a lista de usuario com o usuario editado
          setUsers((currentUsers) => {
            const editedUsers = currentUsers.map((user) => {
              if (user.id !== data.user.id) return user;

              return data.user;
            });

            setIsEditing(false);

            return [...editedUsers];
          });
        } else {
          // Adicionar novo usuário à lista
          setUsers([data.user, ...users]);
        }

        toast({
          title: isEditing
            ? DEFAULT_MESSAGES.usuario.edit.SUCCESS
            : DEFAULT_MESSAGES.usuario.create.SUCCESS,
          description: data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => {
        onClose();
        clearInputs();
      })
      .catch((error) => {
        console.log({ error });

        toast({
          title: isEditing
            ? DEFAULT_MESSAGES.usuario.edit.ERROR
            : DEFAULT_MESSAGES.usuario.create.ERROR,
          description: JSON.stringify(error),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  function createUsersState(users: IUsers) {
    setId(users.id);

    setName(users.name);
    setEmail(users.auth.email);
    setPassword(users.password);
    setRa(users.auth.ra);
  }

  function startEditing(users: IUsers) {
    setIsEditing(true);

    createUsersState(users);

    onOpen();
  }

  function clearInputs() {
    setName("");
    setRa("");
    setPassword("");
    setEmail("");

    setIsEditing(false);
  }

  function blockUser(userId: string) {
    api
      .delete(`/users/delete/${userId}`)
      .then(() => {
        toast({
          title: "Usuário bloqueado com sucesso!!!",
          description: "",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao bloquear!!!",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  const handleSearch = () => {
    router.push({
      pathname: router.pathname,
      query: { name: searchUserString },
    });
  };

  return (
    <Box as={"main"}>
      <VStack>
        <Header title="Cadastro de Usuário"></Header>

        <VStack>
          <HStack
            justifyContent={"flex-end"}
            alignSelf={"flex-start"}
            mt={8}
            width={"100%"}
          >
            {" "}
            <Flex maxW={"300px"} gap={2} as={FormControl}>
              <Input
                placeholder="Buscar..."
                defaultValue={searchUserString}
                onChange={(e) =>
                  router.push({
                    pathname: router.pathname,
                    query: { name: e.target.value },
                  })
                }
              />
              <Button onClick={handleSearch} colorScheme="blue">
                <SearchIcon />
              </Button>
            </Flex>
          </HStack>

          <TableContainer>
            <Table borderRadius={4} variant="simple">
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Email</Th>

                  <Th>RA</Th>
                  <Th>Admin</Th>

                  <Th>
                    {" "}
                    <Flex justifyContent="flex-end" width="100%">
                      <Button size={"sm"} onClick={onOpen} colorScheme="blue">
                        Cadastrar
                      </Button>
                    </Flex>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {users?.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.name}</Td>
                    <Td>{user.auth?.email}</Td>
                    <Td>{user.auth?.ra}</Td>
                    <Td>
                      {(user.isAdmin && (
                        <Badge colorScheme={"green"}>Administrador</Badge>
                      )) || <Badge colorScheme={"purple"}>Aluno</Badge>}
                    </Td>

                    <Td>
                      <HStack>
                        <Button
                          onClick={() => startEditing(user)}
                          colorScheme="green"
                        >
                          Editar
                        </Button>
                        {user.enabled ? (
                          <AppButton
                            colorScheme={"red"}
                            onClick={() => blockUser(user.id)}
                          >
                            Bloquear
                          </AppButton>
                        ) : null}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Box width={"100%"}>
            <HStack justifyContent={"space-between"}>
              <span>
                {currentPage} de {totalPages}
              </span>
              <span> {totalItens} Total de Usuários</span>
            </HStack>
            <HStack>
              {hasPreviousPage && (
                <Button
                  colorScheme="blue"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  anterior
                </Button>
              )}
              {hasNextPage && (
                <Button
                  colorScheme="blue"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  próximo
                </Button>
              )}
            </HStack>
          </Box>
        </VStack>
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setIsEditing(false);
          clearInputs();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditing ? "Editar Usuário" : "Cadastrar um Usuário"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>RA do Aluno</FormLabel>
              <Input
                type="text"
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setRa(event.target.value)}
                defaultValue={ra}
                ref={initialRef}
                placeholder="RA"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Nome</FormLabel>
              <Input
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setName(event.target.value)}
                defaultValue={name}
                placeholder="Nome"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setEmail(event.target.value)}
                defaultValue={email}
                placeholder="Email"
              />
            </FormControl>{" "}
            {isEditing ? (
              ""
            ) : (
              <FormControl mt={4}>
                <FormLabel>Senha</FormLabel>
                <Input
                  onChange={(event: {
                    target: { value: SetStateAction<string> };
                  }) => setPassword(event.target.value)}
                  defaultValue={password}
                  placeholder="Senha"
                />
              </FormControl>
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSaveUsers} colorScheme="blue" mr={3}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
