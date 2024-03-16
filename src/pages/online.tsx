import { Header } from "@/components/Header";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function Online() {
  // Dados dos sites de livros online
  const sitesDeLivros = [
    { nome: "Project Gutenberg", url: "https://www.gutenberg.org/" },
    {
      nome: "Project Dominio publico",
      url: "http://www.dominiopublico.gov.br/pesquisa/PesquisaObraForm.do",
    },
    { nome: "Google Livros", url: "https://books.google.com.br/" },
    { nome: "Google Livros", url: "https://books.google.com.br/" },
    { nome: "Google Livros", url: "https://books.google.com.br/" },
    { nome: "Amazon Kindle", url: "https://www.amazon.com.br/Kindle-Store/" },
    { nome: "Many", url: "https://manybooks.net/" },
    { nome: "Many", url: "https://manybooks.net/" },
    { nome: "Many", url: "https://manybooks.net/" },
    { nome: "Open Library", url: "https://openlibrary.org/" },
    // Adicione mais sites conforme necessário
  ];

  return (
    <Box as={"main"} color="white" p={4} borderRadius="md">
      <Header title="Livros Online"></Header>
      <br></br>
      <div>Verifique livros online disponíveis:</div>

      <Table colorScheme="teal" mt={4} bg="gray.700">
        <Thead>
          <Tr>
            <Th>Site</Th>
            <Th>Link</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sitesDeLivros.map((site, index) => (
            <Tr key={index}>
              <Td>{site.nome}</Td>
              <Td>
                <a href={site.url} target="_blank" rel="noopener noreferrer">
                  {site.url}
                </a>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
