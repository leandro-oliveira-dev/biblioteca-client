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
import { PROTECTED_MENUS } from "@/config/protectedPages";

export interface IMenu {
  url?: string;
  title: string;
  subMenu?: IMenu[];
}
export function Menu() {
  const { logout, user } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  const MENUS: IMenu[] = [
    { url: "/inicio", title: "Inicio" },
    ...((user?.isAdmin && PROTECTED_MENUS) || []),
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
      url: "/online",
      title: "Online",
    },

    {
      url: "/manual",
      title: "Manual",
    },
  ];

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
