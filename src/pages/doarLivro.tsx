import { Header } from "@/components/Header";
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";

export default function Doar() {
  const [date, setDate] = useState(new Date());
  const [donationList, setDonationList] = useState<string[]>([]);

  const handleChange = (newDate: Date) => {
    setDate(newDate);
  };

  const handleConfirmDonation = () => {
    const formattedDate = date.toLocaleString(); // Formata a data para uma string legível

    // Adiciona a nova doação à lista de doações
    setDonationList([...donationList, formattedDate]);

    // Limpa a data selecionada
    setDate(new Date());

    // Envia os dados para o servidor
    axios
      .post("URL_DO_SEU_BACKEND", {
        donationDate: formattedDate,
        // Outros dados que você deseja enviar para o servidor
      })
      .then((response) => {
        console.log("Dados enviados com sucesso:", response.data);
        // Você pode atualizar o estado ou fornecer feedback ao usuário aqui, se necessário
      })
      .catch((error) => {
        console.error("Erro ao enviar dados:", error);
        // Trate o erro adequadamente, como exibir uma mensagem de erro ao usuário
      });
  };

  return (
    <Box as={"main"}>
      <Header title="Doação de livros"></Header>
      <div>Escolha a data e horário para a doação:</div>
      <DateTimePicker onChange={handleChange} value={date} />
      <div style={{ marginTop: "20px" }}>
        {" "}
        {/* Ajuste de margem para afastar o botão */}
        <Button
          onClick={handleConfirmDonation}
          colorScheme="blue"
          style={{ marginTop: "200px" }}
        >
          Confirmar Doação
        </Button>
      </div>
      <div style={{ marginTop: "180px" }}>
        {" "}
        {/* Ajuste de margem para afastar a tabela */}
        <Table variant="striped" colorScheme="blue">
          <Tbody>
            {donationList.map((donation, index) => (
              <Tr key={index}>
                <Td>{donation}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </Box>
  );
}
