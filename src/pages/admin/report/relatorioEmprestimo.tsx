import { Header } from "@/components/Header";
import { useState, useEffect, useCallback } from "react";
import CsvDownloadButton from "react-json-to-csv";

import {
  Button,
  Thead,
  Tr,
  Td,
  Th,
  VStack,
  TableContainer,
  Table,
  Tbody,
  Box,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { differenceInDays } from "date-fns/differenceInDays";
import { addDays } from "date-fns/addDays";
import { useAuth } from "@/context/AuthProvider";

interface IBorrowedBook {
  id: string;
  createdAt: Date;
  returnAt?: Date;
  user: {
    auth: {
      ra: string;
    };
    name: string;
  };

  book: IBook;
}

interface IBook {
  id: string;
  code: string;
  name: string;
}

export default function RelatorioEmprestar() {
  const router = useRouter();
  const { api } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState<IBorrowedBook[]>([]);
  const [book, setBook] = useState<IBook>();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItens, setTotalItens] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const [hasNextPage, setHasNextPage] = useState(false);

  const [csvData, setCsvData] = useState<IBorrowedBook[]>();

  function prepareCsv() {
    api
      .get("/books/borrowed-report/csv-download")
      .then((response) => {
        setCsvData(response.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    const url = router.query.book
      ? `/books/${router.query.book}/borrowed-report/?page=${currentPage}&pageSize=${pageSize}`
      : `/books/borrowed-report/?page=${currentPage}&pageSize=${pageSize}`;

    api
      .get(url)
      .then((response) => response.data)
      .then((value) => {
        setBorrowedBooks(value.borrowedBooks);
        setBook(value.book);
        setTotalItens(value.totalBooks);
        setTotalPages(value.totalPages);
        setHasPreviousPage(value.hasPreviousPage);
        setHasNextPage(value.hasNextPage);
      })
      .catch((error) => console.log(error));
  }, [currentPage, pageSize, router, api]);

  const returnDaysLeft = useCallback((borrowedDate: Date, returnAt?: Date) => {
    if (returnAt) {
      return differenceInDays(new Date(returnAt), new Date(borrowedDate));
    }

    return differenceInDays(new Date(), new Date(borrowedDate));
  }, []);

  const delayed = useCallback((returnDaysLeft: number, returnedAt?: Date) => {
    return returnDaysLeft > 7;
  }, []);

  function returnBorrowedBook(borrowedBookId: string) {
    api
      .put(`/books/borrow/${borrowedBookId}/return`)
      .then(() => {
        alert("devolvido");
      })
      .catch((error) => console.log(error));
  }

  return (
    <Box as={"main"}>
      <Header title="Detalhes do Emprestimo"></Header>

      <VStack>
        <Header title={book?.name || ""}></Header>

        <VStack>
          <TableContainer>
            <Table size={"sm"} borderRadius={4} variant="simple">
              <Thead>
                <Tr>
                  <Th>RA</Th>
                  <Th>Aluno</Th>
                  {!router.query.book && (
                    <>
                      <Th>Code</Th>
                      <Th>Livro</Th>
                    </>
                  )}
                  <Th>Data do emprestimo</Th>
                  <Th>Dias emprestado</Th>
                  <Th>Status</Th>
                  <Th>Data da devolucao</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {borrowedBooks?.map((borrowedBook) => (
                  <Tr key={borrowedBook.id}>
                    <Td>{borrowedBook.user.auth.ra}</Td>
                    <Td>{borrowedBook.user.name}</Td>

                    {borrowedBook?.book?.name && (
                      <>
                        <Td>{borrowedBook.book.code}</Td>
                        <Td>{borrowedBook.book.name}</Td>
                      </>
                    )}

                    <Td>
                      {new Date(borrowedBook.createdAt).toLocaleDateString(
                        "pt-BR"
                      )}
                    </Td>
                    <Td>
                      {returnDaysLeft(
                        borrowedBook.createdAt,
                        borrowedBook.returnAt
                      )}
                    </Td>
                    <Td>
                      {borrowedBook.returnAt && (
                        <Badge mr={1} colorScheme={"green"}>
                          Devolvido
                        </Badge>
                      )}

                      {(delayed(
                        returnDaysLeft(
                          borrowedBook.createdAt,
                          borrowedBook.returnAt
                        ),
                        borrowedBook.returnAt
                      ) && <Badge colorScheme={"red"}> Atrasado</Badge>) || (
                        <Badge colorScheme={"blue"}>No prazo</Badge>
                      )}
                    </Td>
                    <Td>
                      {borrowedBook.returnAt
                        ? new Date(borrowedBook.returnAt).toLocaleDateString(
                            "pt-BR"
                          )
                        : ""}
                    </Td>
                    <Td>
                      <HStack>
                        {!Boolean(borrowedBook.returnAt) && (
                          <Button
                            onClick={() => returnBorrowedBook(borrowedBook.id)}
                            colorScheme="green"
                          >
                            Devolver
                          </Button>
                        )}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          {!csvData && (
            <Button colorScheme="blue" onClick={prepareCsv}>
              Preparar CSV
            </Button>
          )}

          {csvData && (
            <Button
              colorScheme="green"
              as={CsvDownloadButton}
              data={csvData.map((borrowedBook) => ({
                ra: borrowedBook.user?.auth?.ra || "",
                aluno: borrowedBook.user.name,
                code: borrowedBook.book.code,
                livro: borrowedBook.book.name,
                data_emprestimo: borrowedBook.createdAt,
                dias_emprestado: returnDaysLeft(borrowedBook.createdAt),
                status:
                  (delayed(
                    returnDaysLeft(borrowedBook.createdAt),
                    borrowedBook.returnAt
                  ) &&
                    "Atrasado") ||
                  "No Prazo",
                data_devolucao: borrowedBook.returnAt
                  ? new Date(borrowedBook.returnAt).toLocaleDateString("pt-BR")
                  : "",
              }))}
              filename="Emprestimos"
              headers={[
                "ra",
                "aluno",
                "code",
                "livro",
                "data_emprestimo",
                "dias_emprestado",
                "status",
                "data_devolucao",
              ]}
            >
              Baixar CSV
            </Button>
          )}

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
