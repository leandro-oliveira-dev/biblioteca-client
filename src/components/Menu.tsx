import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";

import {
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  Button,
  VStack,
  MenuItem,
} from "@chakra-ui/react";
import { Profile } from "./Profile";
import { useAuth } from "@/context/AuthProvider";

interface IMenu {
  url: string;
  title: string;
  subMenu?: IMenu[];
}

const MENUS: IMenu[] = [
  { url: "/", title: "Inicio" },
  {
    url: "",
    title: "Usuários",
    subMenu: [
      {
        url: "/cadastroDeUsuario",
        title: "Cadastro de Usuários",
      },
    ],
  },

  {
    url: "",
    title: "Livros",
    subMenu: [
      {
        url: "/books",
        title: "Lista de livros",
      },
      {
        url: "/emprestimo",
        title: "Emprestimo de Livros",
      },

      {
        url: "/doarLivro",
        title: "Doação de livros para biblioteca",
      },
    ],
  },
  {
    url: "",
    title: "Relatórios",
    subMenu: [
      {
        url: "/report/relatorioEmprestimo",
        title: "Relatório de Emprestimo",
      },
      {
        url: "/report/relatorioUsuario",
        title: "Relatório usuário",
      },

      {
        url: "/report/relatorioLivro",
        title: "Relatório de livros",
      },
    ],
  },

  {
    url: "/online",
    title: "Online",
  },

  {
    url: "/manual",
    title: "Manual",
  },
];

export function Menu() {
  const { logout } = useAuth();

  return (
    <VStack
      position="fixed"
      left={0}
      p={5}
      w="200px"
      zIndex={999999}
      top={0}
      h="100%"
      bg="#1c1c1c"
      className="text-lg"
      pt={24}
    >
      <Profile />
      {MENUS.map((menu) => (
        <ChakraMenu key={menu.url}>
          <Link minW={"100%"} href={menu.url}>
            <MenuButton
              minW={"100%"}
              as={Button}
              rightIcon={menu.subMenu && <ChevronDownIcon />}
            >
              {menu.title}
            </MenuButton>
          </Link>
          {menu?.subMenu && (
            <MenuList>
              {menu.subMenu?.map((submenu) => (
                <Link href={submenu.url} key={submenu.url}>
                  <MenuItem>{submenu.title}</MenuItem>
                </Link>
              ))}
            </MenuList>
          )}
        </ChakraMenu>
      ))}

      <ChakraMenu>
        <MenuButton onClick={logout} minW={"100%"} as={Button}>
          Sair
        </MenuButton>
      </ChakraMenu>
    </VStack>
  );
}
