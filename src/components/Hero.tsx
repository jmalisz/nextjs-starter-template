import { Flex, Heading } from "@chakra-ui/react";

export function Hero({ title }: { title: string }) {
  return (
    <Flex
      alignItems="center"
      bgClip="text"
      bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
      height="100vh"
      justifyContent="center"
    >
      <Heading fontSize="6vw">{title}</Heading>
    </Flex>
  );
}
