import { DEFAULT_STATUS } from "@/components/pages/books/status";
import { IBooks } from "@/interfaces/IBooks";
import { useCallback, useEffect, useState } from "react";
import { usePagination } from "./usePagination";
import { Status } from "@/interfaces/IStatus";

export function useBooks() {
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState<number | undefined>(undefined);
  const [qtd, setQtd] = useState<number | undefined>(undefined);
  const [position, setPosition] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState(DEFAULT_STATUS);

  const [books, setBooks] = useState<IBooks[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<IBooks[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<Status>("all");

  const {
    currentPage,
    pageSize,
    totalItems,
    setTotalItems,
    setTotalPages,
    setHasPreviousPage,
    setHasNextPage,
  } = usePagination();

  useEffect(() => {
    fetch(
      `http://localhost:8000/books/list?page=${currentPage}&pageSize=${pageSize}`
    )
      .then((response) => response.json())
      .then((value) => {
        setBooks(value.books);
        setFilteredBooks(value.books);
        setTotalItems(value.totalBooks);
        setTotalPages(value.totalPages);
        setHasPreviousPage(value.hasPreviousPage);
        setHasNextPage(value.hasNextPage);
      });
  }, [
    currentPage,
    pageSize,
    totalItems,
    setTotalItems,
    setTotalPages,
    setHasPreviousPage,
    setHasNextPage,
  ]);

  const filterBooks = useCallback(
    (status: Status) => {
      if (status === "all") {
        setFilteredBooks(books);

        return;
      }

      setFilteredBooks(books);

      setFilteredBooks((prevBooks) =>
        prevBooks?.filter((book) => book.status === status)
      );
    },
    [books]
  );

  return {
    filterBooks,
    books,
    setBooks,
    filteredBooks,
    setFilteredBooks,
    id,
    setId,
    name,
    setName,
    code,
    setCode,
    qtd,
    setQtd,
    position,
    setPosition,
    author,
    setAuthor,
    status,
    setStatus,
    selectedFilter,
    setSelectedFilter,
  };
}
