import {
  Button,
  Thead,
  Tr,
  Td,
  Th,
  TableContainer,
  Table,
  Tbody,
  HStack,
  Badge,
  Box,
} from "@chakra-ui/react";
import { BADGE_STATUS } from "./status";
import { useSaveBook } from "@/hooks/useSaveBook";
import { useBooks } from "@/hooks/useBooks";
import { PaginationBooks } from "./PaginationBooks";

export function BooksTable() {
  const { startEditing } = useSaveBook();
  const { filteredBooks, selectedFilter } = useBooks();

  return (
    <>
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

      <PaginationBooks />
    </>
  );
}
