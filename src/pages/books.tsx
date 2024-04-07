import { SetStateAction, useEffect, useRef, useState } from "react";

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
  Box,
  HStack,
  Flex,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { DEFAULT_MESSAGES } from "@/errors/DEFAULT_MESSAGES";
import { CheckIcon } from "@chakra-ui/icons";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/router";

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
  const { api } = useAuth();

  const router = useRouter();

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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItens, setTotalItens] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const { status } = router.query;

    const url = status
      ? `/books/list?status=${status}&page=${currentPage}&pageSize=${pageSize}`
      : `/books/list?&page=${currentPage}&pageSize=${pageSize}`;

    api
      .get(url)
      .then((response) => response.data)
      .then((value) => {
        setBooks(value.books);
        setFilteredBooks(value.books);
        setTotalItens(value.totalBooks);
        setTotalPages(value.totalPages);
        setHasPreviousPage(value.hasPreviousPage);
        setHasNextPage(value.hasNextPage);
      })
      .catch((error) => console.log(error));
  }, [currentPage, pageSize, api, router, selectedFilter]);

  function filterBooks(status: Status) {
    if (status === "all") {
      router.push({
        pathname: router.pathname,
      });

      return;
    }

    router.push({
      pathname: router.pathname,
      query: { status },
    });
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

    const url = isEditing ? `/books/update/${id}` : "/books/create";

    const apiRequest = isEditing ? api.put : api.post;

    apiRequest(url, data)
      .then((response) => response.data)
      .then((data) => {
        onClose();
        setIsEditing(false);
        clearInputs();
        if (isEditing) {
          // Atualizar a lista de livros com o livro editado

          setBooks((currentBooks) => {
            const editedBooks = currentBooks.map((book) => {
              if (book.id !== data.book.id) return book;

              return data.book;
            });

            return [...editedBooks];
          });

          setFilteredBooks((currentBooks) => {
            const editedBooks = currentBooks.map((book) => {
              if (book.id !== data.book.id) return book;

              return data.book;
            });

            return [...editedBooks];
          });
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
      <VStack>
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
                }}
                size={"xs"}
                colorScheme={BADGE_STATUS["all"]}
              >
                {selectedFilter === "all" && <CheckIcon mr={2} />}
                Todos
              </Button>
            </HStack>
            <Flex>
              <Button onClick={onOpen} colorScheme="blue">
                Cadastrar
              </Button>
            </Flex>
          </HStack>

          <TableContainer>
            <Table borderRadius={4} variant="simple">
              <Thead>
                <Tr>
                  <Th>Codigo</Th>
                  <Th>Titulo</Th>
                  <Th>Autor</Th>
                  <Th>Quantidade</Th>
                  <Th>Posição</Th>
                  <Th>Status</Th>
                  <Th></Th>
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
                        <AppButton colorScheme={"red"}>Indisponivel</AppButton>
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
              <span> {totalItens} Total de Livros</span>
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
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
