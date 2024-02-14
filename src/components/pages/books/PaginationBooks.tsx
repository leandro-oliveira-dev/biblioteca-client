import { usePagination } from "@/hooks/usePagination";
import { Box, Button, HStack } from "@chakra-ui/react";

export function PaginationBooks() {
  const {
    currentPage,
    totalPages,
    totalItems,
    hasNextPage,
    hasPreviousPage,
    setCurrentPage,
  } = usePagination();

  return (
    <Box width={"100%"}>
      <HStack justifyContent={"space-between"}>
        <span>
          {currentPage} de {totalPages}
        </span>
        <span> {totalItems} Total de Livros</span>
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
  );
}
