import { useColorMode, IconButton, Container, Box, Heading } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { PropsWithChildren } from "react";

function ColorModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <IconButton
      aria-label="Toggle Theme"
      colorScheme="green"
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      position="fixed"
      right={4}
      top={4}
      onClick={toggleColorMode}
    />
  );
}

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Box
        as="header"
        background="white"
        borderBottom="1px"
        borderBottomColor="gray.200"
        height="80px"
        position="sticky"
        top="0"
      >
        <Container display="flex" justifyContent="space-between" maxW="container.xl" padding={4}>
          <Heading as="h1" color="teal.700">
            Redwood Blog
          </Heading>
          <ColorModeSwitch />
        </Container>
      </Box>
      <Container>{children}</Container>
    </>
  );
}
