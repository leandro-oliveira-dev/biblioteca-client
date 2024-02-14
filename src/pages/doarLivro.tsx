import { Header } from "@/components/Header";
import { Box, FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";

export default function Doar() {
  const [date, setDate] = useState(new Date());

  const handleChange = (newDate: Date | Date[]) => {
    // Verifica se newDate é um array de Date
    if (Array.isArray(newDate)) {
      // Aqui você pode lidar com a seleção de intervalo de datas, se necessário
      console.log("Intervalo de datas selecionado:", newDate);
    } else {
      setDate(newDate);
    }
  };

  return (
    <Box as={"main"}>
      <Header title="Doação de livros"></Header>
      <div>Escolha a data e horário para a doação:</div>
      <DateTimePicker onChange={handleChange} value={date} />
    </Box>
  );
}
