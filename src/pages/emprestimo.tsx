import { SetStateAction, useEffect, useRef, useState } from "react";

type Status = "avariado" | "disponivel" | "indisponivel" | "emprestado" | "all";

import {
  Button,
  Thead,
  Tr,
  Td,
  Th,
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
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthProvider";

interface IBooks {
  id: string;
  name: string;
  author: string;
  qtd: number;
  position: string;
  status: Status;
  code: number;
  BorrowedBook: [
    {
      id: string;
    }
  ];
}

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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItens, setTotalItens] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    api
      .get(`/books/list?page=${currentPage}&pageSize=${pageSize}`)
      .then((response) => response.data)
      .then((value) => {
        setBooks(value.books);
        setFilteredBooks(value.books);
        setTotalItens(value.totalBooks);
        setTotalPages(value.totalPages);
        setHasPreviousPage(value.hasPreviousPage);
        setHasNextPage(value.hasNextPage);
      });
  }, [currentPage, pageSize]);

  function filterBooks(status: Status) {
    if (status === "all") {
      setFilteredBooks(books);
      return;
    }
    setFilteredBooks(books);
    setFilteredBooks((prevBooks) =>
      prevBooks?.filter((book) => book.status === status)
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
    const url = isEditing ? `/books/update/${id}` : "/books/create";
    const apiRequest = isEditing ? api.put : api.post;
    apiRequest(url, data)
      .then((response) => response.data)
      .then((data) => {
        onClose();
        setIsEditing(false);
        clearInputs();
        if (isEditing) {
          const updatedBooks = books.map((book) =>
            book.id === id ? data.book : book
          );
          setBooks(updatedBooks);
          const updatedFilteredBooks = filteredBooks
            ?.map((book) => (book.id === id ? data.book : book))
            ?.filter((book) => book.status === selectedFilter);
          setFilteredBooks(updatedFilteredBooks);
        } else {
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

  function clearInputs() {
    setAuthor("");
    setName("");
    setCode(undefined);
    setQtd(undefined);
    setPosition("");
    setStatus(DEFAULT_STATUS);
    setIsEditing(false);
  }

  const handleBorrowBook = (id: string, userId: string) => {
    api
      .put(`/books/borrow/${id}`, { userId: userId, duration: 7 })
      .then((response) => {
        const updatedBooks = books.map((book) =>
          book.id === id ? { ...book, status: "emprestado" } : book
        ) as IBooks[]; // Adicionando o tipo aqui
        setBooks(updatedBooks);

        const updatedFilteredBooks = filteredBooks.map((book) =>
          book.id === id ? { ...book, status: "emprestado" } : book
        ) as IBooks[]; // Adicionando o tipo aqui
        setFilteredBooks(updatedFilteredBooks);

        toast({
          title: "Livro emprestado com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao emprestar livro",
          description: error.message || "Ocorreu um erro ao emprestar o livro.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box as={"main"}>
      <VStack>
        <Header title="Reservar livros"></Header>

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
          </HStack>

          <TableContainer>
            <Table backgroundColor={"#222"} borderRadius={4} variant="simple">
              <Thead>
                <Tr>
                  <Th color={"#fff"}>Codigo</Th>
                  <Th color={"#fff"}>Titulo</Th>
                  <Th color={"#fff"}>Autor</Th>
                  <Th color={"#fff"}>Quantidade</Th>
                  <Th color={"#fff"}>Emprestados</Th>
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
                    <Td>{book.BorrowedBook.length}</Td>
                    <Td>{book.position}</Td>
                    <Td>
                      <Badge colorScheme={BADGE_STATUS[book.status]}>
                        {book.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack>
                        <Button
                          onClick={() =>
                            handleBorrowBook(book.id, String(user?.id))
                          }
                          colorScheme="red"
                          disabled={book.status !== "disponivel"}
                        >
                          Emprestar
                        </Button>
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
    </Box>
  );
}
