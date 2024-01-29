import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Menu></Menu>
      <Header title="Biblioteca"></Header>
    </main>
  );
}
