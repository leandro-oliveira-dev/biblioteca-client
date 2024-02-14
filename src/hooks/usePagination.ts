import { useState } from "react";

export function usePagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalItems / pageSize)
  );

  const [hasPreviousPage, setHasPreviousPage] = useState(currentPage > 1);
  const [hasNextPage, setHasNextPage] = useState(currentPage < totalPages);

  return {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalItems,
    setTotalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    setHasPreviousPage,
    setHasNextPage,
    setTotalPages,
  };
}
