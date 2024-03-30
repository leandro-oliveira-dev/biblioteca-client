import { Header } from "@/components/Header";
import {
  Text,
  Heading,
  Input,
  Stack,
  VStack,
  Button,
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Header title="Biblioteca"></Header>

      <Box
        flex={3}
        style={{
          backgroundImage: 'url("/livrinho.png")',
          backgroundSize: "cover", // Cobrir toda a área do contêiner
          backgroundPosition: "right",
          height: "90vh", // Definir a altura igual à altura da janela de exibição
        }}
      ></Box>
    </main>
  );
}
