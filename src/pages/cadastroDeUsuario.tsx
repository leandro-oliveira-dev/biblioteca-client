import { SetStateAction, useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";

import { Box } from "@chakra-ui/react";

interface IUsers {
  id: string;
  name: string;
  email: string;
  password: string;
  ra: string;
}

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
import { CheckIcon } from "@chakra-ui/icons";

export default function CadastrarUsuario() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
  const [filteredUsers, setFilteredUsers] = useState<IUsers[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, settotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:8000/users/list?page=${currentPage}&pageSize=${pageSize}`
    )
      .then((response) => response.json())
      .then((value) => {
        setUsers(value.users);
        setFilteredUsers(value.users);
        settotalItems(value.totalUsers);
        setTotalPages(value.totalPages);
        setHasPreviousPage(value.hasPreviousPage);
        setHasNextPage(value.hasNextPage);
      });
  }, [currentPage, pageSize]);

  function handleSaveUsers() {
    const data = {
      id,
      name,
      email,
      password,
      ra,
    };

    const url = isEditing
      ? `http://localhost:8000/users/update/${id}`
      : "http://localhost:8000/users/create";

    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        onClose();
        setIsEditing(false);
        clearInputs();
        if (isEditing) {
          // Atualizar a lista de usuario com o usuario editado
          const updatedUsers = users.map((users) =>
            users.id === id ? data.users : users
          );

          setUsers(updatedUsers);

          const updatedFilteredUsers = filteredUsers?.map((users) =>
            users.id === id ? data.users : users
          );

          setFilteredUsers(updatedFilteredUsers);
        } else {
          // Adicionar novo usuário à lista
          setUsers([data.users, ...users]);
          setFilteredUsers([data.users, ...filteredUsers]);
        }

        toast({
          title: isEditing
            ? DEFAULT_MESSAGES.user.edit.SUCCESS
            : DEFAULT_MESSAGES.user.create.SUCCESS,
          description: data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })

      .catch((error) => {
        console.log({ error });

        toast({
          title: isEditing
            ? DEFAULT_MESSAGES.user.edit.ERROR
            : DEFAULT_MESSAGES.user.create.ERROR,
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
    setEmail(users.email);
    setPassword(users.password);
    setRa(users.ra);
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

  return (
    <Box as={"main"}>
      <VStack>
        <Header title="Cadastro de Usuário"></Header>

        <VStack>
          <HStack
            justifyContent={"space-between"}
            alignSelf={"flex-start"}
            mt={8}
            width={"100%"}
          >
            {" "}
            <Flex justifyContent="flex-end">
              <Button onClick={onOpen} colorScheme="gray">
                Cadastrar
              </Button>
            </Flex>
          </HStack>

          <TableContainer>
            <Table backgroundColor={"#222"} borderRadius={4} variant="simple">
              <Thead>
                <Tr>
                  <Th color={"#fff"}>Nome</Th>
                  <Th color={"#fff"}>Email</Th>

                  <Th color={"#fff"}>RA</Th>

                  <Th color={"#fff"}></Th>
                  <Th color={"#fff"}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredUsers?.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.ra}</Td>
                    <Td>{user.name}</Td>

                    <Td>{user.email}</Td>
                    <Td>{user.password}</Td>

                    <Td>
                      <HStack>
                        <Button
                          onClick={() => startEditing(user)}
                          colorScheme="green"
                        >
                          Editar
                        </Button>
                        <Button colorScheme="red">Bloqueado</Button>
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
              <span> {totalItems} Total de Usuários</span>
            </HStack>
            <HStack>
              {hasPreviousPage && (
                <Button
                  colorScheme="gray"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  anterior
                </Button>
              )}
              {hasNextPage && (
                <Button
                  colorScheme="gray"
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
        <ModalContent color="white" bg="#333">
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
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Senha</FormLabel>
              <Input
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setPassword(event.target.value)}
                defaultValue={password}
                type="text"
                placeholder="Senha"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSaveUsers} colorScheme="black" mr={3}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
