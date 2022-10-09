// TODO: Add full typing to useGetRandomUser
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Hero } from "components/Hero";
import { useGetRandomUser } from "api/REST/GET/useGetRandomUser";
import { Container } from "@chakra-ui/react";

export default function Index() {
  const { data } = useGetRandomUser();

  if (!data) return;

  return (
    <Container height="100vh">
      <Hero title={data.results[0].name.first} />
    </Container>
  );
}
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
