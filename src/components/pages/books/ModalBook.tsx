import { useModal } from "@/context/ModalContext";
import { useBooks } from "@/hooks/useBooks";
import { useSaveBook } from "@/hooks/useSaveBook";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { SetStateAction, useEffect, useRef } from "react";

export function ModalBook() {
  const {
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
  } = useBooks();

  const {
    handleSaveBook,

    setIsEditing,
    clearInputs,
    isEditing,
  } = useSaveBook();

  const { isOpen, onClose } = useModal();

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  const initialRef = useRef(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setIsEditing(false);
        clearInputs();
      }}
    >
      <ModalOverlay />
      <ModalContent color="white" bg="#333">
        <ModalHeader>
          {isEditing ? "Editar Livro" : "Cadastrar um livro"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Codigo</FormLabel>
            <Input
              type="number"
              onChange={(event: {
                target: { value: SetStateAction<string> };
              }) => setCode(Number(event.target.value))}
              defaultValue={Number(code)}
              ref={initialRef}
              placeholder="Codigo"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Titulo</FormLabel>
            <Input
              onChange={(event: {
                target: { value: SetStateAction<string> };
              }) => setName(event.target.value)}
              defaultValue={name}
              placeholder="Titulo"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Autor</FormLabel>
            <Input
              onChange={(event: {
                target: { value: SetStateAction<string> };
              }) => setAuthor(event.target.value)}
              defaultValue={author}
              placeholder="Autor"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Quantidade</FormLabel>
            <Input
              onChange={(event: {
                target: { value: SetStateAction<string> };
              }) => setQtd(Number(event.target.value))}
              defaultValue={Number(qtd)}
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
              defaultValue={position}
              type="text"
              placeholder="Posicao"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Status</FormLabel>
            <Select
              color={"grey"}
              placeholder="Escolher"
              defaultValue={status}
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
  );
}
