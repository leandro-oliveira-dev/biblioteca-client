import { Header } from "@/components/Header";
import { useState, useEffect, useCallback } from "react";

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
}

interface IBook {
  id: string;
  name: string;
}

export default function RelatorioEmprestar() {
  const router = useRouter();
  const { api } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState<IBorrowedBook[]>([]);
  const [book, setBook] = useState<IBook>();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItens, setTotalItens] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    api
      .get(
        `/books/${router.query.book}/borrowed-report/?page=${currentPage}&pageSize=${pageSize}`
      )
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

  const returnDaysLeft = useCallback((borrowedDate: Date) => {
    return differenceInDays(addDays(new Date(), 7), new Date(borrowedDate));
  }, []);

  return (
    <Box as={"main"}>
      <Header title="Detalhes do Emprestimo"></Header>

      <VStack>
        <Header title={book?.name as string}></Header>

        <VStack>
          <TableContainer>
            <Table backgroundColor={"#222"} borderRadius={4} variant="simple">
              <Thead>
                <Tr>
                  <Th color={"#fff"}>RA</Th>
                  <Th color={"#fff"}>Nome</Th>
                  <Th color={"#fff"}>Data do emprestimo</Th>
                  <Th color={"#fff"}>Dias do aluno com o Livro</Th>
                  <Th color={"#fff"}>Status</Th>
                  <Th color={"#fff"}>Data da devolucao</Th>
                  <Th color={"#fff"}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {borrowedBooks?.map((borrowedBook) => (
                  <Tr key={borrowedBook.id}>
                    <Td>{borrowedBook.user.auth.ra}</Td>
                    <Td>{borrowedBook.user.name}</Td>
                    <Td>
                      {new Date(borrowedBook.createdAt).toLocaleDateString(
                        "pt-BR"
                      )}
                    </Td>
                    <Td>{returnDaysLeft(borrowedBook.createdAt)}</Td>
                    <Td>
                      {(returnDaysLeft(borrowedBook.createdAt) > 7 && (
                        <Badge colorScheme={"red"}> Atrasado</Badge>
                      )) || <Badge colorScheme={"green"}>No prazo</Badge>}
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
                        <Button colorScheme="green">
                          Marcar como devolvido
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
