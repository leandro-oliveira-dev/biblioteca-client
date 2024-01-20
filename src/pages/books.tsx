import { SetStateAction, useEffect, useRef, useState } from "react";
import { Menu } from "@/components/Menu";

interface IBooks {
  id: string;
  name: string;
  author: string;
}

import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Header } from "@/components/Header";

const DEFAULT_STATUS = "disponivel";

export default function Books() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [qtd, setQtd] = useState("");
  const [position, setPosition] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState(DEFAULT_STATUS);

  const [books, setBooks] = useState<IBooks[]>([]);

  const toast = useToast();

  const initialRef = useRef(null);

  function clearInputs() {
    setAuthor("");
    setName("");
    setCode("");
    setQtd("");
    setPosition("");
    setStatus(DEFAULT_STATUS);
  }

  function handleSaveBook() {
    const data = {
      name,
      code,
      author,
      qtd,
      position,
      status,
    };

    fetch("http://localhost:8000/books/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        onClose();

        clearInputs();

        const newBooks = [...books, data.book];

        setBooks(newBooks);

        toast({
          title: "Cadastro concluido",
          description: data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log({ error });

        toast({
          title: "Falha no cadastro",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  useEffect(() => {
    fetch("http://localhost:8000/books/list")
      .then((response) => response.json())
      .then((value) => setBooks(value));
  }, []);

  return (
    <main>
      <Header title="Cadastro de livros"></Header>
      <Menu />
      <section className="flex items-center justify-center flex-col">
        <div className="flex flex-row justify-between m-6 gap-6">
          <Button onClick={onOpen} colorScheme="green">
            Cadastrar
          </Button>
        </div>

        <div className="max-w-screen-md mx-auto">
          <table className="min-w-full  border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Titulo</th>
                <th className="py-2 px-4 border-b">Autor</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="py-2 px-4 border-b">{book.name}</td>
                  <td className="py-2 px-4 border-b">{book.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color="white" bg="gray.800">
          <ModalHeader>Cadastre um livro</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Codigo</FormLabel>
              <Input
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setCode(event.target.value)}
                value={code}
                ref={initialRef}
                placeholder="Codigo"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Titulo</FormLabel>
              <Input
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setName(event.target.value)}
                value={name}
                placeholder="Titulo"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Autor</FormLabel>
              <Input
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setAuthor(event.target.value)}
                value={author}
                placeholder="Autor"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Quantidade</FormLabel>
              <Input
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setQtd(event.target.value)}
                value={qtd}
                type="number"
                placeholder="Quantidade"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Posicão</FormLabel>
              <Input
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setPosition(event.target.value)}
                value={position}
                type="text"
                placeholder="Posicao"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select
                color={"grey"}
                placeholder="Escolher"
                value={status}
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => setStatus(event.target.value)}
              >
                <option className="text-black" value="avariado">
                  AVARIADO
                </option>
                <option className="text-black" value="disponivel">
                  DISPONIVEL
                </option>
                <option className="text-black" value="indisponivel">
                  INDISPONIVEL
                </option>
                <option className="text-black" value="emprestado">
                  EMPRESTADO
                </option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSaveBook} colorScheme="black" mr={3}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
}
