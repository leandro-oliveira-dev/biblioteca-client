import { Box } from "@chakra-ui/react";
import { Menu } from "@/components/Menu";
import { ReactElement } from "react";

export function Content({ children }: { children: ReactElement }) {
  return (
    <>
      <Menu />
      <Box ml={200}>{children}</Box>
    </>
  );
}
