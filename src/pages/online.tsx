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
    {
      nome: "Amazon Kindle",
      url: "https://www.amazon.com.br/s?k=livros+gratis&rh=n%3A5308307011%2Cp_36%3A5560478011&dc&ds=v1%3AJHunmiBD5P7AKJR7Kd%2FkEUwZEemrOO4nxP9leEY9%2B04&qid=1710199554&rnid=5560477011&ref=sr_nr_p_36_1",
    },
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
                <a
                  style={{ textDecoration: "underline", color: "#8a8aff" }}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Acessar
                </a>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
