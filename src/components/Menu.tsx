import { Link } from "@chakra-ui/next-js";
import { HStack } from "@chakra-ui/react";

interface IMenu {
  url: string;
  title: string;
  subMenu?: IMenu[];
}

const MENUS: IMenu[] = [
  { url: "/", title: "Inicio" },
  {
    url: "/books",
    title: "Livros",
  },
  {
    url: "/online",
    title: "Online",
  },
  { url: "/login", title: "Sair" },
];

export function Menu() {
  return (
    <div className="mb-30 grid text-center lg:max-w-xl lg:w--60 lg:mb-30 lg:text-left">
      <HStack className="text-lg">
        {MENUS.map((menu) => (
          <Link
            bgColor={"#1e283b"}
            color={"#fff"}
            px={2}
            py={1}
            borderRadius={3}
            key={menu.title}
            href={menu.url}
            rel="noopener noreferrer"
          >
            <h2>{menu.title}</h2>
          </Link>
        ))}
      </HStack>
    </div>
  );
}
