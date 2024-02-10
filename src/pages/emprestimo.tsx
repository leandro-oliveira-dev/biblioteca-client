
import { Header } from "@/components/Header";
import { Box } from "@chakra-ui/react";

export default function emprestar() {
  return (
    <Box as={"main"}>
      <Header title="Emprestimo de Livros"></Header>
      <div>Verifique livros disponiveis para emprestimo</div>
    </Box>
  );
}
