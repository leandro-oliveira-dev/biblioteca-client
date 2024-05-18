import { Box, HStack } from "@chakra-ui/react";
import { Menu } from "@/components/Menu";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { publicPages } from "@/config/publicPages";

export function Content({ children }: { children: ReactElement }) {
  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);

  return (
    <HStack>
      {!isPublicPage && <Menu />}

      <Box width={"100%"} ml={isPublicPage ? 0 : 200}>
        {children}
      </Box>
    </HStack>
  );
}
