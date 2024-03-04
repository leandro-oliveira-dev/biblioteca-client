import { Heading } from "@chakra-ui/react";

interface IHeaderParams {
  title: string;
}

export function Header({ title }: IHeaderParams) {
  return <Heading textAlign={"center"}>{title}</Heading>;
}
