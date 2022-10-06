import { Link as ChakraLink, Text, Code, List, ListIcon, ListItem } from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

import { Container } from "components/Container";
import { Main } from "components/Main";
import { DarkModeSwitch } from "components/DarkModeSwitch";
import { Cta } from "components/Cta";
import { Footer } from "components/Footer";
import { Hero } from "components/Hero";
import { useGetRandomUser } from "api/REST/GET/useGetRandomUser";

export default function Index() {
  const { data } = useGetRandomUser();

  console.log(data);

  if (!data) return null;

  return (
    <Container height="100vh">
      <Hero title={data.results[0].name.first} />
      <Main>
        <Text color="text">
          Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{" "}
          <Code>TypeScript</Code>.
        </Text>
        <List color="text" my={0} spacing={3}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink flexGrow={1} href="https://chakra-ui.com" mr={2} isExternal>
              Chakra UI <LinkIcon />
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink flexGrow={1} href="https://nextjs.org" mr={2} isExternal>
              Next.js <LinkIcon />
            </ChakraLink>
          </ListItem>
        </List>
      </Main>
      <DarkModeSwitch />
      <Footer>
        <Text>Next ❤️ Chakra</Text>
      </Footer>
      <Cta />
    </Container>
  );
}
