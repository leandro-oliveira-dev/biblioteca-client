import { Box } from "@chakra-ui/react";
import { Menu } from "@/components/Menu";
import { ReactElement } from "react";
import { useRouter } from "next/router";

export function Content({ children }: { children: ReactElement }) {
  const { pathname } = useRouter();

  return (
    <>
      {Boolean(pathname !== "/login") && <Menu />}

      <Box ml={200}>{children}</Box>
    </>
  );
}
