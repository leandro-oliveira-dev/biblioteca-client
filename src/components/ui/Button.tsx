import {
  Button as ChakraButton,
  useColorMode,
  useColorModeValue,
  ComponentDefaultProps,
} from "@chakra-ui/react";

export function Button({
  children,
  ...props
}: {
  children: React.ReactNode;
} & ComponentDefaultProps) {
  const { colorMode } = useColorMode();

  const bg = useColorModeValue("red.500", "red.500");
  const color = useColorModeValue("white", "white");

  if (colorMode === "light") {
    return <ChakraButton {...props}>{children}</ChakraButton>;
  }

  return (
    <ChakraButton bg={bg} color={color}>
      {children}
    </ChakraButton>
  );
}
