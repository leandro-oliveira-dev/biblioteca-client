import { Header } from "@/components/Header";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Manual() {
  return (
    <main>
      <Header title="Manual"></Header>

      <h1>Aqui você aprenderá como ultilizar o sistema</h1>
    </main>
  );
}
