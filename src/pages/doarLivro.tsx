import { Header } from "@/components/Header";
import { Box, FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";

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

  function TabelaDoacoes() {
    const [doacoes, setDoacoes] = useState([]);

    // Função para enviar os dados para o backend
    const enviarDados = async () => {
      try {
        const resposta = await axios.post("http://localhost:8000/doarLivro", {
          usuario: "Nome do Usuário",
          dataEntrega: "2024-02-17", // Data selecionada pelo usuário
        });
        setDoacoes(resposta.data);
      } catch (error) {
        console.error("Erro ao enviar os dados:", error);
      }
    };

    return (
      <Box as={"main"}>
        <Header title="Doação de livros"></Header>
        <div>Escolha a data e horário para a doação:</div>
        <DateTimePicker onChange={handleChange} value={date} />
        <div>
          <button onClick={enviarDados}>Enviar Dados</button>
          <table>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Data de Entrega</th>
              </tr>
            </thead>
            <tbody>
              {doacoes.map((doacao, index) => (
                <tr key={index}>
                  <td>{doacao.usuario}</td>
                  <td>{doacao.dataEntrega}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    );
  }
}
