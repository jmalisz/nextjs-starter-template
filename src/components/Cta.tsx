import { Link as ChakraLink, Button } from "@chakra-ui/react";

import { Container } from "./Container";

export const Cta = () => (
  <Container
    bottom={0}
    flexDirection="row"
    maxWidth="3xl"
    position="fixed"
    py={3}
    width="full"
  >
    <Button
      as={ChakraLink}
      colorScheme="green"
      flexGrow={1}
      href="https://chakra-ui.com"
      mx={2}
      rounded="button"
      variant="outline"
      width="full"
      isExternal
    >
      chakra-ui
    </Button>
    <Button
      as={ChakraLink}
      colorScheme="green"
      flexGrow={3}
      href="https://github.com/vercel/next.js/blob/canary/examples/with-chakra-ui-typescript"
      mx={2}
      rounded="button"
      variant="solid"
      width="full"
      isExternal
    >
      View Repo
    </Button>
  </Container>
);
