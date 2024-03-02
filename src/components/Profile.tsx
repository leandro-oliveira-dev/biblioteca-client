import { useAuth } from "@/context/AuthProvider";
import { VStack, Text, Badge } from "@chakra-ui/react";

export function Profile() {
  const { user } = useAuth();

  return (
    <VStack>
      <Text color={"white"}>{user?.name}</Text>
      <Text color={"white"}>{user?.email}</Text>
      {(user?.isAdmin && (
        <Badge colorScheme={"green"}>Administrador</Badge>
      )) || <Badge colorScheme={"purple"}>Aluno</Badge>}
    </VStack>
  );
}
