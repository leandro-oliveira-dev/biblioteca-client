import { Box, HStack } from "@chakra-ui/react";
import { Menu } from "@/components/Menu";
import { ReactElement } from "react";
import { useRouter } from "next/router";

export function Content({ children }: { children: ReactElement }) {
  const { pathname } = useRouter();

  const isLoginPage = Boolean(pathname === "/login");

  return (
    <HStack>
      {!isLoginPage && <Menu />}

      <Box ml={isLoginPage ? 0 : 200}>{children}</Box>
    </HStack>
  );
}
