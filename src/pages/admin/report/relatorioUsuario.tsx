import { Header } from "@/components/Header";
import { useState, useEffect } from "react";
import { differenceInDays } from "date-fns";
import CsvDownloadButton from "react-json-to-csv"; // Importando o componente para download CSV

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
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthProvider";

interface IUser {
  id: string;
  name: string;
  isAdmin: boolean;
  created_at: Date;
  enabled: boolean;
  auth: { ra: string };
}

export default function RelatorioEmprestar() {
  const { api } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const [users, setUsers] = useState<IUser[]>([]);

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
        setUsers(value.users);
        setTotalItens(value.totalUsers);
        setTotalPages(value.totalPages);
        setHasPreviousPage(value.hasPreviousPage);
        setHasNextPage(value.hasNextPage);
      })
      .catch((error) => console.log(error));
  }, [api, currentPage, pageSize, router]);

  function enableUser(userId: string) {
    api
      .put(`/users/enable/${userId}`)
      .then(() => {
        toast({
          title: "Usuário desbloqueado com sucesso!!!",
          description: "",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao desbloquear!!!",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <Box as={"main"}>
      <Header title="Detalhes do Usuário"></Header>

      <VStack>
        <VStack>
          <TableContainer>
            <Table borderRadius={4} variant="simple">
              <Thead>
                <Tr>
                  <Th>RA</Th>
                  <Th>Nome</Th>
                  <Th>Data de criação</Th>
                  <Th>Dias do aluno no sistema</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {users?.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user?.auth?.ra}</Td>
                    <Td>{user.name}</Td>
                    <Td>
                      {new Date(user.created_at).toLocaleDateString("pt-BR")}
                    </Td>
                    <Td>
                      {differenceInDays(new Date(), user.created_at)} dias
                    </Td>
                    <Td>
                      {user.enabled ? (
                        <Badge colorScheme={"green"}>Ativo</Badge>
                      ) : (
                        <Badge colorScheme={"red"}>Bloqueado</Badge>
                      )}
                    </Td>
                    <Td>
                      {!user.enabled ? (
                        <Button
                          colorScheme="green"
                          onClick={() => enableUser(user.id)}
                        >
                          Desbloquear aluno
                        </Button>
                      ) : null}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          {/* Adicionando o botão de download CSV */}
          <CsvDownloadButton // Componente para download CSV
            data={users.map((user) => ({
              ra: user?.auth?.ra || "",
              name: user.name,
              admin: user.isAdmin,
              enabled: user.enabled,
              created_at: user.created_at,
            }))} // Dados a serem convertidos em CSV
            filename="usuarios" // Nome do arquivo CSV
            headers={["ra", "name", "admin", "enabled", "created_at"]} // Headers do CSV correspondentes aos campos do objeto IUser
          />

          {/* Paginação */}
          <Box width={"100%"}>
            <HStack justifyContent={"space-between"}>
              <span>
                {currentPage} de {totalPages}
              </span>
              <span> {totalItens} Total de usuarios</span>
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
