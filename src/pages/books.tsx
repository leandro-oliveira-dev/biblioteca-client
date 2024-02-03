import { SetStateAction, useEffect, useRef, useState } from "react";
import { Menu } from "@/components/Menu";

type Status = "avariado" | "disponivel" | "indisponivel" | "emprestado" | "all";

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
import { DEFAULT_MESSAGES } from "@/errors/DEFAULT_MESSAGES";
import { CheckIcon } from "@chakra-ui/icons";

const DEFAULT_STATUS = "disponivel";

const BADGE_STATUS = {
  avariado: "orange",
  disponivel: "green",
  indisponivel: "red",
  emprestado: "yellow",
  all: "blue",
};

export default function Books() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState<number | undefined>(undefined);
  const [qtd, setQtd] = useState<number | undefined>(undefined);
  const [position, setPosition] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState(DEFAULT_STATUS);

  const [selectedFilter, setSelectedFilter] = useState<Status>("all");

  const [isEditing, setIsEditing] = useState(false);

  const [books, setBooks] = useState<IBooks[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<IBooks[]>([]);

  const toast = useToast();

  const initialRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8000/books/list")
      .then((response) => response.json())
      .then((value) => {
        setBooks(value);
        setFilteredBooks(value);
      });
  }, []);

  function filterBooks(status: Status) {
    if (status === "all") {
      setFilteredBooks(books);

      return;
    }

    setFilteredBooks(books);

    setFilteredBooks((prevBooks) =>
      prevBooks.filter((book) => book.status === status)
    );
  }

  function handleSaveBook() {
    const data = {
      id,
      name,
      code,
      author,
      qtd,
      position,
      status,
    };

    const url = isEditing
      ? `http://localhost:8000/books/update/${id}`
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
      .then((data) => {
        onClose();
        setIsEditing(false);
        clearInputs();
        if (isEditing) {
          // Atualizar a lista de livros com o livro editado
          const updatedBooks = books.map((book) =>
            book.id === id ? data.book : book
          );

          setBooks(updatedBooks);

          const updatedFilteredBooks = filteredBooks
            .map((book) => (book.id === id ? data.book : book))
            .filter((book) => book.status === selectedFilter);

          setFilteredBooks(updatedFilteredBooks);
        } else {
          // Adicionar novo livro à lista
          setBooks([data.book, ...books]);
          setFilteredBooks([data.book, ...filteredBooks]);
        }

        toast({
          title: isEditing
            ? DEFAULT_MESSAGES.books.edit.SUCCESS
            : DEFAULT_MESSAGES.books.create.SUCCESS,
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
            ? DEFAULT_MESSAGES.books.edit.ERROR
            : DEFAULT_MESSAGES.books.create.ERROR,
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  function createBookState(book: IBooks) {
    setId(book.id);

    setAuthor(book.author);
    setName(book.name);
    setCode(book.code);
    setQtd(book.qtd);
    setPosition(book.position);
    setStatus(DEFAULT_STATUS);
  }

  function startEditing(book: IBooks) {
    setIsEditing(true);

    createBookState(book);

    onOpen();
  }

  function clearInputs() {
    setAuthor("");
    setName("");
    setCode(undefined);
    setQtd(undefined);
    setPosition("");
    setStatus(DEFAULT_STATUS);
    setIsEditing(false);
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
              <Button
                onClick={() => {
                  filterBooks("disponivel");
                  setSelectedFilter("disponivel");
                }}
                size={"xs"}
                colorScheme={BADGE_STATUS["disponivel"]}
              >
                {selectedFilter === "disponivel" && <CheckIcon mr={2} />}
                Disponivel
              </Button>
              <Button
                onClick={() => {
                  filterBooks("emprestado");
                  setSelectedFilter("emprestado");
                }}
                size={"xs"}
                colorScheme={BADGE_STATUS["emprestado"]}
              >
                {selectedFilter === "emprestado" && <CheckIcon mr={2} />}
                Emprestado
              </Button>
              <Button
                onClick={() => {
                  filterBooks("avariado");
                  setSelectedFilter("avariado");
                }}
                size={"xs"}
                colorScheme={BADGE_STATUS["avariado"]}
              >
                {selectedFilter === "avariado" && <CheckIcon mr={2} />}
                Avariado
              </Button>
              <Button
                onClick={() => {
                  filterBooks("indisponivel");
                  setSelectedFilter("indisponivel");
                }}
                size={"xs"}
                colorScheme={BADGE_STATUS["indisponivel"]}
              >
                {selectedFilter === "indisponivel" && <CheckIcon mr={2} />}
                Indisponivel
              </Button>
              <Button
                onClick={() => {
                  filterBooks("all");
                  setSelectedFilter("all");
                }}
                size={"xs"}
                colorScheme={BADGE_STATUS["all"]}
              >
                {selectedFilter === "all" && <CheckIcon mr={2} />}
                Todos
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
                {filteredBooks?.map((book) => (
                  <Tr key={book.id}>
                    <Td>{book.code}</Td>
                    <Td>{book.name}</Td>
                    <Td>{book.author}</Td>
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
          onClose();
          setIsEditing(false);
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
                type="number"
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setCode(Number(event.target.value))}
                defaultValue={Number(code)}
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
                defaultValue={name}
                placeholder="Titulo"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Autor</FormLabel>
              <Input
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setAuthor(event.target.value)}
                defaultValue={author}
                placeholder="Autor"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Quantidade</FormLabel>
              <Input
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setQtd(Number(event.target.value))}
                defaultValue={Number(qtd)}
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
                defaultValue={position}
                type="text"
                placeholder="Posicao"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select
                color={"grey"}
                placeholder="Escolher"
                defaultValue={status}
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
