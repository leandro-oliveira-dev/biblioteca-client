import { Header } from "@/components/Header";
import {
  Box,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  HStack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { IUser, useAuth } from "@/context/AuthProvider";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type IDonation = {
  date: Value;
  user: IUser | null;
};

export default function Doar() {
  const [date, setDate] = useState<Value>(new Date());
  const { user } = useAuth();
  const [donationList, setDonationList] = useState<IDonation[]>([]);

  const handleConfirmDonation = () => {
    // Adiciona a nova doação à lista de doações
    setDonationList([...donationList, { date, user }]);

    // Limpa a data selecionada

    // Envia os dados para o servidor
  };

  return (
    <Box as={"main"} margin={"0 1rem"}>
      <Header title="Doação de livros"></Header>
      <div>Escolha a data e horário para a doação:</div>
      <DateTimePicker
        format="dd/MMM/yyyy hh:mm"
        locale="pt-BR"
        disableClock
        onChange={(value) => setDate(value)}
        value={date}
      />
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
        <Table backgroundColor={"#222"} borderRadius={4} variant="simple">
          <Tbody>
            {donationList?.map((donation, index) => (
              <Tr key={index}>
                <Td>
                  <HStack justifyContent={"space-between"}>
                    <Text>{donation?.date?.toLocaleString()}</Text>
                    <Text>{donation?.user?.name}</Text>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </Box>
  );
}
