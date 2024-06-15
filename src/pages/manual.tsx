import { Header } from "@/components/Header";
import { Box } from "@chakra-ui/react";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Manual() {
  return (
    <main>
      <Header title="Manual"></Header>

      <br />

      <Box
        flex={3}
        style={{
          backgroundImage: 'url("/1.png")',
          backgroundSize: "cover", // Cobrir toda a área do contêiner
          backgroundPosition: "right",
          height: "90vh", // Definir a altura igual à altura da janela de exibição
        }}
      ></Box>
      <br />
      <Box
        flex={3}
        style={{
          backgroundImage: 'url("/2.png")',
          backgroundSize: "cover", // Cobrir toda a área do contêiner
          backgroundPosition: "right",
          height: "120vh", // Definir a altura igual à altura da janela de exibição
        }}
      ></Box>
      <br />
      <Box
        flex={3}
        style={{
          backgroundImage: 'url("/3.png")',
          backgroundSize: "cover", // Cobrir toda a área do contêiner
          backgroundPosition: "right",
          height: "100vh", // Definir a altura igual à altura da janela de exibição
        }}
      ></Box>
      <br />
      <Box
        flex={3}
        style={{
          backgroundImage: 'url("/4.png")',
          backgroundSize: "cover", // Cobrir toda a área do contêiner
          backgroundPosition: "right",
          height: "120vh", // Definir a altura igual à altura da janela de exibição
        }}
      ></Box>
      <br />
      <Box
        flex={3}
        style={{
          backgroundImage: 'url("/5.png")',
          backgroundSize: "cover", // Cobrir toda a área do contêiner
          backgroundPosition: "right",
          height: "100vh", // Definir a altura igual à altura da janela de exibição
        }}
      ></Box>
      <br />
      <Box
        flex={3}
        style={{
          backgroundImage: 'url("/6.png")',
          backgroundSize: "cover", // Cobrir toda a área do contêiner
          backgroundPosition: "right",
          height: "80vh", // Definir a altura igual à altura da janela de exibição
        }}
      ></Box>
      <br />
      <Box
        flex={3}
        style={{
          backgroundImage: 'url("/7.png")',
          backgroundSize: "cover", // Cobrir toda a área do contêiner
          backgroundPosition: "right",
          height: "100vh", // Definir a altura igual à altura da janela de exibição
        }}
      ></Box>
      <br />
      <Box
        flex={3}
        style={{
          backgroundImage: 'url("/8.png")',
          backgroundSize: "cover", // Cobrir toda a área do contêiner
          backgroundPosition: "right",
          height: "70vh", // Definir a altura igual à altura da janela de exibição
        }}
      ></Box>
      <br />
      <Box
        flex={3}
        style={{
          backgroundImage: 'url("/9.png")',
          backgroundSize: "cover", // Cobrir toda a área do contêiner
          backgroundPosition: "right",
          height: "100vh", // Definir a altura igual à altura da janela de exibição
        }}
      ></Box>
      <br />
      <Box
        flex={3}
        style={{
          backgroundImage: 'url("/10.png")',
          backgroundSize: "cover", // Cobrir toda a área do contêiner
          backgroundPosition: "right",
          height: "90vh", // Definir a altura igual à altura da janela de exibição
        }}
      ></Box>
      <br />
      <Box
        flex={3}
        style={{
          backgroundImage: 'url("/11.png")',
          backgroundSize: "cover", // Cobrir toda a área do contêiner
          backgroundPosition: "right",
          height: "50vh", // Definir a altura igual à altura da janela de exibição
        }}
      ></Box>
      <br />
      <Box
        flex={3}
        style={{
          backgroundImage: 'url("/12.png")',
          backgroundSize: "cover", // Cobrir toda a área do contêiner
          backgroundPosition: "right",
          height: "120vh", // Definir a altura igual à altura da janela de exibição
        }}
      ></Box>
    </main>
  );
}
