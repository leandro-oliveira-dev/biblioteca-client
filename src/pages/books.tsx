import { SetStateAction, useEffect, useRef, useState } from "react";
import { Menu } from "@/components/Menu";

type Status = "avariado" | "disponivel" | "indisponivel" | "emprestado";

interface IBooks {
  id: string;
  name: string;
  author: string;
  qtd: number;
  position: string;
  status: Status;
  code: number;
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
  Box,
  HStack,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { Header } from "@/components/Header";

const DEFAULT_STATUS = "disponivel";

const BADGE_STATUS = {
  avariado: "orange",
  disponivel: "green",
  indisponivel: "red",
  emprestado: "yellow",
};

export default function Books() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [qtd, setQtd] = useState("");
  const [position, setPosition] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState(DEFAULT_STATUS);

  const [isEditing, setIsEditing] = useState(false);
  const [editingBook, setEditingBook] = useState<IBooks | null>(null);

  const [books, setBooks] = useState<IBooks[]>([]);

  const toast = useToast();

  const initialRef = useRef(null);

  function handleSaveBook() {
    const data = {
      name,
      code,
      author,
      qtd,
      position,
      status,
    };

    fetch("http://localhost:8000/books/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        onClose();

        clearInputs();

        const newBooks = [...books, data.book];

        setBooks(newBooks);

        toast({
          title: "Cadastro concluido",
          description: data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log({ error });

        toast({
          title: "Falha no cadastro",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });

    const url = isEditing
      ? `http://localhost:8000/books/update/${editingBook?.id}`
      : "http://localhost:8000/books/create";

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
      .then((responsedata) => {
        onClose();
        setIsEditing(false);
        setEditingBook(null);
        clearInputs();
        if (isEditing) {
          // Atualizar a lista de livros com o livro editado
          const updatedBooks = books.map((b) =>
            b.id === editingBook?.id ? responsedata.book : b
          );
          setBooks(updatedBooks);
        } else {
          // Adicionar novo livro à lista
          setBooks([...books, responsedata.book]);
        }

        toast({
          title: "Cadastro concluído",
          description: responsedata.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log({ error });

        toast({
          title: "Falha no cadastro",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }
  useEffect(() => {
    fetch("http://localhost:8000/books/list")
      .then((response) => response.json())
      .then((value) => setBooks(value));
  }, []);

  function startEditing(book: IBooks) {
    setIsEditing(true);
    setEditingBook(book);
    onOpen();
  }

  function clearInputs() {
    setAuthor("");
    setName("");
    setCode("");
    setQtd("");
    setPosition("");
    setStatus(DEFAULT_STATUS);
  }

  return (
    <Box as={"main"}>
      <Menu />
      <VStack color={"#fff"}>
        <Header title="Cadastro de livros"></Header>

        <VStack>
          <HStack
            justifyContent={"space-between"}
            alignSelf={"flex-start"}
            mt={8}
            width={"100%"}
          >
            <HStack>
              <Button size={"xs"} colorScheme={BADGE_STATUS["disponivel"]}>
                Disponivel
              </Button>
              <Button size={"xs"} colorScheme={BADGE_STATUS["avariado"]}>
                Avariado
              </Button>
              <Button size={"xs"} colorScheme={BADGE_STATUS["indisponivel"]}>
                Indisponivel
              </Button>
            </HStack>
            <Flex>
              <Button onClick={onOpen} colorScheme="gray">
                Cadastrar
              </Button>
            </Flex>
          </HStack>

          <TableContainer>
            <Table backgroundColor={"#222"} borderRadius={4} variant="simple">
              <Thead>
                <Tr>
                  <Th color={"#fff"}>Codigo</Th>
                  <Th color={"#fff"}>Titulo</Th>
                  <Th color={"#fff"}>Autor</Th>
                  <Th color={"#fff"}>Quantidade</Th>
                  <Th color={"#fff"}>Posição</Th>
                  <Th color={"#fff"}>Status</Th>
                  <Th color={"#fff"}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {books?.map((book) => (
                  <Tr key={book.id}>
                    <Td>{book.name}</Td>
                    <Td>{book.author}</Td>
                    <Td>{book.code}</Td>
                    <Td>{book.qtd}</Td>
                    <Td>{book.position}</Td>
                    <Td>
                      <Badge colorScheme={BADGE_STATUS[book.status]}>
                        {book.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack>
                        <Button
                          onClick={() => startEditing(book)}
                          colorScheme="green"
                        >
                          Editar
                        </Button>
                        <Button colorScheme="red">Indisponivel</Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose;
          setIsEditing(false);
          setEditingBook(null);
          clearInputs();
        }}
      >
        <ModalOverlay />
        <ModalContent color="white" bg="#333">
          <ModalHeader>
            {isEditing ? "Editar Livro" : "Cadastrar um livro"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Codigo</FormLabel>
              <Input
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setCode(event.target.value)}
                value={isEditing ? editingBook?.code || "" : ""}
                ref={initialRef}
                placeholder="Codigo"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Titulo</FormLabel>
              <Input
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setName(event.target.value)}
                value={isEditing ? editingBook?.name || "" : ""}
                placeholder="Titulo"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Autor</FormLabel>
              <Input
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setAuthor(event.target.value)}
                value={isEditing ? editingBook?.author || "" : ""}
                placeholder="Autor"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Quantidade</FormLabel>
              <Input
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setQtd(event.target.value)}
                value={isEditing ? editingBook?.qtd || "" : ""}
                type="number"
                placeholder="Quantidade"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Posicão</FormLabel>
              <Input
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setPosition(event.target.value)}
                value={isEditing ? editingBook?.position || "" : ""}
                type="text"
                placeholder="Posicao"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select
                color={"grey"}
                placeholder="Escolher"
                value={isEditing ? editingBook?.status || "" : ""}
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setStatus(event.target.value)}
              >
                <option className="text-black" value="avariado">
                  AVARIADO
                </option>
                <option className="text-black" value="disponivel">
                  DISPONIVEL
                </option>
                <option className="text-black" value="indisponivel">
                  INDISPONIVEL
                </option>
                <option className="text-black" value="emprestado">
                  EMPRESTADO
                </option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSaveBook} colorScheme="black" mr={3}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
