import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

function ColorModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <IconButton
      aria-label="Toggle Theme"
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
    />
  );
}

export function MainLayout({ children }: PropsWithChildren) {
  const footerColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Flex direction="column" height="100vh">
      <Box
        as="header"
        borderBottom="1px"
        borderBottomColor="gray.200"
        height="80px"
        position="sticky"
        top="0"
      >
        <Container
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          maxW="container.xl"
          padding={4}
        >
          <Heading as="h1" color="blue.500">
            NextJS starter template
          </Heading>
          <ColorModeSwitch />
        </Container>
      </Box>
      <Container flexGrow={1} maxW="container.lg" padding={4}>
        {children}
      </Container>
      <Container
        as="footer"
        color={footerColor}
        display="flex"
        justifyContent="center"
        maxW="container.xl"
        padding={4}
      >
        Made by Jakub Maliszewski
      </Container>
    </Flex>
  );
}
