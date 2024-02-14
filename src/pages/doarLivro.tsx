import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import { Header } from "@/components/Header";
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";

export default function Doar() {
  const [date, setDate] = useState(new Date());

  const handleChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <Box as={"main"}>
      <Header title="Doação de livros"></Header>
      <div>Escolha a data e horário para a doação:</div>
      <DateTimePicker onChange={handleChange} value={date} />
    </Box>
  );
}
