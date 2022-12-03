import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Flex,
  Grid,
  GridItem,
  GridProps,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ResponseShape } from "api/REST/GET/useGetRandomUser";
import { useState } from "react";

import { GenericSuccessStateProps } from "./GenericDataCell";

const moreInfoGrid: GridProps = {
  gridTemplateRows: "1fr 152px",
  rowGap: 4,
};

// Props typing could be tighter, but let's ignore that since it's just a template for experimentation
export function PersonCard<TData extends ResponseShape>({ data }: GenericSuccessStateProps<TData>) {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const background = useColorModeValue("gray.200", "gray.700");

  const person = data.results[0];

  const picture = person.picture.large;
  const fullName = `${person.name.first} ${person.name.last}`;
  const nationality = person.location.country;
  const address = `${person.location.state}, ${person.location.city}, ${person.location.street.name} ${person.location.street.number}`;
  const {
    cell,
    email,
    gender,
    dob: { date: dateOfBirth, age },
  } = person;

  return (
    <Grid
      background={background}
      border="1px solid"
      borderColor="blue.500"
      borderRadius={4}
      boxShadow="base"
      columnGap={4}
      minWidth={400}
      padding={4}
      rowGap={0}
      templateColumns="1fr auto"
      templateRows="1fr 0px"
      width="fit-content"
      sx={{
        transition: "1s ease-in-out",
      }}
      templateAreas={`
        "avatar title"
        "description description"
      `}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(showMoreInfo ? moreInfoGrid : {})}
    >
      <Avatar gridArea="avatar" name={fullName} size="2xl" src={picture} />
      <GridItem area="title" display="flex" flexDir="column" gap={2}>
        <Heading as="h2">{fullName}</Heading>
        <Flex align="center" gap="2">
          <EmailIcon />
          <Text>{email}</Text>
        </Flex>
        <Flex align="center" gap="2">
          <PhoneIcon />
          <Text>{cell}</Text>
        </Flex>
        <Button variant="ghost" zIndex="dropdown" onClick={() => setShowMoreInfo((prev) => !prev)}>
          {showMoreInfo ? "Less info" : "More info"}
        </Button>
      </GridItem>
      <GridItem
        area="description"
        display="flex"
        flexDir="column"
        gap={2}
        sx={{
          position: "relative",
          transform: showMoreInfo ? "" : "translate(0px, -152px)",
          opacity: showMoreInfo ? "1" : "0",
          visibility: showMoreInfo ? "visible" : "hidden",
          transition: "1s ease-in-out",
        }}
      >
        <Text>Gender: {gender}</Text>
        <Text>Date of birth: {dateOfBirth}</Text>
        <Text>Age: {age}</Text>
        <Text>Nationality: {nationality}</Text>
        <Text>Address: {address}</Text>
      </GridItem>
    </Grid>
  );
}
