import { Avatar, Grid, Text, useColorModeValue } from "@chakra-ui/react";
import { ResponseShape, useGetRandomUser } from "api/REST/GET/useGetRandomUser";
import { GenericDataCell, GenericSuccessStateProps } from "components/GenericDataCell";

function PersonCard<TData extends ResponseShape>({ data }: GenericSuccessStateProps<TData>) {
  const person = data.results[0];

  const fullName = `${person.name.first} ${person.name.last}`;
  const picture = person.picture.large;

  const background = useColorModeValue("gray.200", "gray.700");

  return (
    <Grid
      background={background}
      border="1px solid"
      borderColor="blue.500"
      borderRadius={4}
      boxShadow="base"
      boxSize={400}
      gridTemplateColumns="1fr auto"
      gridTemplateRows="auto 1fr"
      margin="auto"
      padding={4}
      templateAreas={`
        "title avatar"
        "description description"
      `}
    >
      <Text gridArea="title">{fullName}</Text>
      <Avatar gridArea="avatar" name={fullName} size="2xl" src={picture} />
    </Grid>
  );
}

export default function Index() {
  const queryResult = useGetRandomUser();

  return <GenericDataCell queryResult={queryResult} SuccessState={PersonCard} />;
}
