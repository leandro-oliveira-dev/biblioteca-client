import { CheckIcon } from "@chakra-ui/icons";
import { Button, HStack } from "@chakra-ui/react";
import { BADGE_STATUS } from "./status";
import { useBooks } from "@/hooks/useBooks";

export function StatusBadges() {
  const { filterBooks, setSelectedFilter, selectedFilter } = useBooks();

  return (
    <HStack>
      <Button
        onClick={() => {
          filterBooks("disponivel");
          setSelectedFilter("disponivel");
        }}
        size={"xs"}
        colorScheme={BADGE_STATUS["disponivel"]}
      >
        {selectedFilter === "disponivel" && <CheckIcon mr={2} />}
        Disponivel
      </Button>
      <Button
        onClick={() => {
          filterBooks("emprestado");
          setSelectedFilter("emprestado");
        }}
        size={"xs"}
        colorScheme={BADGE_STATUS["emprestado"]}
      >
        {selectedFilter === "emprestado" && <CheckIcon mr={2} />}
        Emprestado
      </Button>
      <Button
        onClick={() => {
          filterBooks("avariado");
          setSelectedFilter("avariado");
        }}
        size={"xs"}
        colorScheme={BADGE_STATUS["avariado"]}
      >
        {selectedFilter === "avariado" && <CheckIcon mr={2} />}
        Avariado
      </Button>
      <Button
        onClick={() => {
          filterBooks("indisponivel");
          setSelectedFilter("indisponivel");
        }}
        size={"xs"}
        colorScheme={BADGE_STATUS["indisponivel"]}
      >
        {selectedFilter === "indisponivel" && <CheckIcon mr={2} />}
        Indisponivel
      </Button>
      <Button
        onClick={() => {
          filterBooks("all");
          setSelectedFilter("all");
        }}
        size={"xs"}
        colorScheme={BADGE_STATUS["all"]}
      >
        {selectedFilter === "all" && <CheckIcon mr={2} />}
        Todos
      </Button>
    </HStack>
  );
}
