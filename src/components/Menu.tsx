import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";

import {
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  Button,
  VStack,
  MenuItem,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import { Profile } from "./Profile";
import { useAuth } from "@/context/AuthProvider";

interface IMenu {
  url?: string;
  title: string;
  subMenu?: IMenu[];
}

const MENUS: IMenu[] = [
  { url: "/inicio", title: "Inicio" },
  {
    title: "Usuários",
    subMenu: [
      {
        url: "/cadastroDeUsuario",
        title: "Cadastro de Usuários",
      },
    ],
  },

  {
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
  const { colorMode, toggleColorMode } = useColorMode();

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
        <ChakraMenu key={menu.title}>
          {(menu.url && (
            <Link minW={"100%"} href={menu.url}>
              <MenuButton
                minW={"100%"}
                as={Button}
                rightIcon={menu.subMenu && <ChevronDownIcon />}
              >
                {menu.title}
              </MenuButton>
            </Link>
          )) || (
            <MenuButton
              minW={"100%"}
              as={Button}
              rightIcon={menu.subMenu && <ChevronDownIcon />}
            >
              {menu.title}
            </MenuButton>
          )}
          {menu?.subMenu && (
            <MenuList>
              {menu.subMenu?.map((submenu) => (
                <>
                  {(submenu.url && (
                    <Link href={submenu.url} key={submenu.title}>
                      <MenuItem>{submenu.title}</MenuItem>
                    </Link>
                  )) || (
                    <MenuItem key={submenu.title}>{submenu.title}</MenuItem>
                  )}
                </>
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
      <ChakraMenu>
        {colorMode === "light" ? (
          <Box
            py={1}
            px={2}
            rounded={8}
            bg={"grey"}
            cursor={"pointer"}
            onClick={toggleColorMode}
          >
            <MoonIcon />
          </Box>
        ) : (
          <Box
            py={1}
            px={2}
            rounded={8}
            bg={"grey"}
            cursor={"pointer"}
            onClick={toggleColorMode}
          >
            <SunIcon />
          </Box>
        )}
      </ChakraMenu>
    </VStack>
  );
}
