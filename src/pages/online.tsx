import { SetStateAction, useEffect, useRef, useState } from "react";
import { Menu } from "@/components/Menu";

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

export default function Online() {
  return (
    <main>
      <Menu></Menu>
      <Header title="Livros Online"></Header>
      <div>Verifique livros online disponiveis</div>
    </main>
  );
}
