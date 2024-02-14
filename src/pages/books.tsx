import { Button, VStack, Box, HStack, Flex } from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { StatusBadges } from "@/components/pages/books/StatusBadges";
import { BooksTable } from "@/components/pages/books/BooksTable";
import { ModalContext, ModalProvider } from "@/context/ModalContext";

export default function Books() {
  return (
    <ModalProvider>
      <Box as={"main"}>
        <VStack>
          <Header title="Cadastro de livros"></Header>

          <VStack>
            <HStack
              justifyContent={"space-between"}
              alignSelf={"flex-start"}
              mt={8}
              width={"100%"}
            >
              <StatusBadges />

              <ModalContext.Consumer>
                {({ onOpen }) => (
                  <Flex>
                    <Button onClick={onOpen} colorScheme="gray">
                      Cadastrar
                    </Button>
                  </Flex>
                )}
              </ModalContext.Consumer>
            </HStack>

            <BooksTable />
          </VStack>
        </VStack>
      </Box>
    </ModalProvider>
  );
}
