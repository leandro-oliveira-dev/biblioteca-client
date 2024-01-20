import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
    
    >
  <Header title="Biblioteca"></Header>
   <Menu></Menu>

     
    </main>
  );
}
