import { useEffect, useState } from "react";

type Status = "avariado" | "disponivel" | "indisponivel" | "emprestado" | "all";
import { Button as AppButton } from "@/components/ui/Button";
import {
  Button,
  Text,
  Thead,
  Tr,
  Td,
  Th,
  useToast,
  VStack,
  TableContainer,
  Table,
  Tbody,
  Box,
  HStack,
  Badge,
  Link,
} from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { CheckIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { useAuth } from "@/context/AuthProvider";

interface IBooks {
  id: string;
  name: string;
  author: string;
  qtd: number;
  position: string;
  status: Status;
  code: number;
  alreadyBorrowed: boolean;
  BorrowedBook: [
    {
      id: string;
      userId: string;
    }
  ];
}

const BADGE_STATUS = {
  avariado: "orange",
  disponivel: "green",
  indisponivel: "red",
  emprestado: "yellow",
  all: "blue",
};

export default function Books() {
  const [selectedFilter, setSelectedFilter] = useState<Status>("all");

  const [books, setBooks] = useState<IBooks[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<IBooks[]>([]);

  const toast = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItens, setTotalItens] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { user, api } = useAuth();

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
      })
      .catch((error) => console.log(error));
  }, [currentPage, pageSize, api]);

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

  const handleBorrowBook = (bookId: string, userId: string) => {
    api
      .put(`/books/borrow/${bookId}`, { userId: userId, duration: 7 })
      .then((response) => {
        const currrentBookIndex = books.findIndex((book) => book.id === bookId);

        setBooks((prevBooks) => {
          const updatedBooks = [...prevBooks];
          updatedBooks[currrentBookIndex] = response.data.book;
          return updatedBooks;
        });

        const currrentFilteredBookIndex = filteredBooks.findIndex(
          (book) => book.id === bookId
        );

        setFilteredBooks((prevFilteredBooks) => {
          const updatedFilteredBooks = [...prevFilteredBooks];
          updatedFilteredBooks[currrentFilteredBookIndex] = response.data.book;
          return updatedFilteredBooks;
        });

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
          description:
            error.response.data.message ||
            "Ocorreu um erro ao emprestar o livro.",
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
            <Table borderRadius={4} variant="simple">
              <Thead>
                <Tr>
                  <Th>Codigo</Th>
                  <Th>Titulo</Th>
                  <Th>Autor</Th>
                  <Th>Quantidade</Th>
                  <Th>Emprestados</Th>
                  <Th>Posição</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredBooks?.map((book) => (
                  <Tr key={book.id}>
                    <Td>{book.code}</Td>
                    <Td>
                      <Link
                        style={{
                          textDecoration: "underline",
                        }}
                        href={`/report/relatorioEmprestimo?book=${book.id}`}
                      >
                        {book.name}
                      </Link>
                      <ArrowRightIcon ml={"1rem"} />
                    </Td>
                    <Td>{book.author}</Td>
                    <Td>{book.qtd}</Td>
                    <Td>{book?.BorrowedBook?.length || 0}</Td>
                    <Td>{book.position}</Td>
                    <Td>
                      <Badge colorScheme={BADGE_STATUS[book.status]}>
                        {book.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack>
                        {book.alreadyBorrowed ? (
                          <Text>Livro emprestado</Text>
                        ) : (
                          <AppButton
                            onClick={() =>
                              handleBorrowBook(book.id, String(user?.id))
                            }
                            colorScheme="red"
                            disabled={book.status !== "disponivel"}
                          >
                            Emprestar
                          </AppButton>
                        )}
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
    </Box>
  );
}
