import { SetStateAction, useRef, useState } from "react";
import {Menu} from "@/components/Menu";

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
} from "@chakra-ui/react";
import { Header } from "@/components/Header";

export default function Books() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [qtd, setQtd] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");

  const initialRef = useRef(null);

  function handleSaveBook() {
    console.log({ name });

    const data = {
      name,
      code,
      qtd,
      position,
    };

    fetch("http://localhost:8000/books/create", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => console.log({ response }))
      .catch((error) => alert("falhou"));

    console.log("salvar book");
  }

  return (
    <>
    <Header title="Livros"></Header>
     <Menu/>
      <section className="flex items-center justify-center flex-col">
        <div className="flex flex-row justify-between m-6 gap-6">
          <Heading size={"lg"}>Cadastro de livros</Heading>

          <Button onClick={onOpen} colorScheme="green">
            Cadastrar
          </Button>
        </div>

        <div className="max-w-screen-md mx-auto">
          <table className="min-w-full bg-zinc-600 border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">1</td>
                <td className="py-2 px-4 border-b">John Doe</td>
                <td className="py-2 px-4 border-b">john@example.com</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">2</td>
                <td className="py-2 px-4 border-b">Jane Smith</td>
                <td className="py-2 px-4 border-b">jane@example.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastre um livro</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Codigo</FormLabel>
              <Input
                onChange={(event: { target: { value: SetStateAction<string>; }; }) => setCode(event.target.value)}
                value={code}
                ref={initialRef}
                placeholder="Codigo"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Titulo</FormLabel>
              <Input
                onChange={(event: { target: { value: SetStateAction<string>; }; }) => setName(event.target.value)}
                value={name}
                placeholder="Titulo"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Quantidade</FormLabel>
              <Input
                onChange={(event: { target: { value: SetStateAction<string>; }; }) => setQtd(event.target.value)}
                value={qtd}
                type="number"
                placeholder="Quantidade"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Posicão</FormLabel>
              <Input
                onChange={(event: { target: { value: SetStateAction<string>; }; }) => setPosition(event.target.value)}
                value={position}
                type="text"
                placeholder="Posicao"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select placeholder="Escolher">
                <option value="avariado">AVARIADO</option>
                <option value="disponivel">DISPONIVEL</option>
                <option value="indisponivel">INDISPONIVEL</option>
                <option value="emprestado">EMPRESTADO</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSaveBook} colorScheme="blue" mr={3}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
