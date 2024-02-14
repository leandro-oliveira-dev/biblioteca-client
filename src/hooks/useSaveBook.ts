import { DEFAULT_MESSAGES } from "@/errors/DEFAULT_MESSAGES";
import { useState } from "react";
import { useBooks } from "./useBooks";
import { DEFAULT_STATUS } from "@/components/pages/books/status";
import { useToast } from "@chakra-ui/react";
import { IBooks } from "@/interfaces/IBooks";
import { useModal } from "@/context/ModalContext";

export function useSaveBook() {
  const [isEditing, setIsEditing] = useState(false);
  const { onOpen, onClose } = useModal();

  const toast = useToast();

  const {
    name,
    code,
    author,
    qtd,
    position,
    status,
    id,
    books,
    filteredBooks,
    setFilteredBooks,
    setBooks,
    setAuthor,
    setName,
    setCode,
    setQtd,
    setPosition,
    setStatus,
    setId,
    selectedFilter,
  } = useBooks();

  function createBookState(book: IBooks) {
    setId(book.id);

    setAuthor(book.author);
    setName(book.name);
    setCode(book.code);
    setQtd(book.qtd);
    setPosition(book.position);
    setStatus(DEFAULT_STATUS);
  }

  function startEditing(book: IBooks) {
    setIsEditing(true);

    createBookState(book);

    onOpen();
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

    const url = isEditing
      ? `http://localhost:8000/books/update/${id}`
      : "http://localhost:8000/books/create";

    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        onClose();
        setIsEditing(false);
        clearInputs();
        if (isEditing) {
          // Atualizar a lista de livros com o livro editado
          const updatedBooks = books.map((book) =>
            book.id === id ? data.book : book
          );

          setBooks(updatedBooks);

          const updatedFilteredBooks = filteredBooks
            ?.map((book) => (book.id === id ? data.book : book))
            ?.filter((book) => book.status === selectedFilter);

          setFilteredBooks(updatedFilteredBooks);
        } else {
          // Adicionar novo livro à lista
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

  return {
    handleSaveBook,
    isEditing,
    setIsEditing,
    startEditing,
    clearInputs,
  };
}
