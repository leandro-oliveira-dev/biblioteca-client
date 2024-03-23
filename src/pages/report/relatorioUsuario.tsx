/* eslint-disable react-hooks/rules-of-hooks */
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
import { api } from "@/lib/api";
import { useRouter } from "next/router";
import { differenceInDays } from "date-fns/differenceInDays";
import { addDays } from "date-fns/addDays";

interface IUser {
  id: string;
  name: string;
  createdAt: Date;
  enabled: boolean;
  auth: { ra: string };
}

export default function RelatorioEmprestar() {
  const router = useRouter();

  const [users, setUsers] = useState<IUser[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItens, setTotalItens] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    api
      .get(`/users/usuario-report/?page=${currentPage}&pageSize=${pageSize}`)
      .then((response) => response.data)
      .then((value) => {
        setUsers(value);
        setTotalItens(value.totalBooks);
        setTotalPages(value.totalPages);
        setHasPreviousPage(value.hasPreviousPage);
        setHasNextPage(value.hasNextPage);
      });
  }, [currentPage, pageSize, router]);

  const returnDaysLeft = useCallback((borrowedDate: Date) => {
    return differenceInDays(addDays(new Date(), 7), new Date(borrowedDate));
  }, []);

  return (
    <Box as={"main"}>
      <Header title="Detalhes do Usuário"></Header>

      <VStack>
        <VStack>
          <TableContainer>
            <Table backgroundColor={"#222"} borderRadius={4} variant="simple">
              <Thead>
                <Tr>
                  <Th color={"#fff"}>RA</Th>
                  <Th color={"#fff"}>Nome</Th>
                  <Th color={"#fff"}>Data de criação</Th>
                  <Th color={"#fff"}>Dias do aluno no sistema</Th>
                  <Th color={"#fff"}>Status</Th>

                  <Th color={"#fff"}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {users?.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.auth.ra}</Td>
                    <Td>{user.name}</Td>
                    <Td>
                      {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                    </Td>
                    <Td></Td>
                    <Td>{user.enabled ? "Ativo" : "Bloqueado"}</Td>

                    <Td>
                      <HStack>
                        <Button colorScheme="green">Desbloquear aluno</Button>
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
