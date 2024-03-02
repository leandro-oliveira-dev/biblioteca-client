import { Header } from "@/components/Header";
import { Box, Button, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Doar() {
  const [date, setDate] = useState<Value>(new Date());
  const [donationList, setDonationList] = useState<Value[]>([]);

  const handleConfirmDonation = () => {
    // Adiciona a nova doação à lista de doações
    setDonationList([...donationList, date]);

    // Limpa a data selecionada
    setDate(new Date());

    // Envia os dados para o servidor
    axios
      .post("URL_DO_SEU_BACKEND", {
        date,
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
      <DateTimePicker onChange={setDate} value={date} />
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
                <Td>{donation?.toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </Box>
  );
}
