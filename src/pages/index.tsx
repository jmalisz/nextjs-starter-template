import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  GridProps,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ResponseShape, useGetRandomUser } from "api/REST/GET/useGetRandomUser";
import { GenericDataCell, GenericSuccessStateProps } from "components/GenericDataCell";
import { useState } from "react";

const moreInfoGrid: GridProps = {
  gridTemplateRows: "1fr 152px",
  rowGap: 4,
};

function PersonCard<TData extends ResponseShape>({ data }: GenericSuccessStateProps<TData>) {
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

const DEFAULT_REFETCH_INTERVAL = 0;

const TWO_MINUTES_IN_MS = 2 * 60 * 1000;
const MINUTE_IN_MS = 60 * 1000;
const SECOND_IN_MS = 1000;

const displaySliderMark = (milliseconds: number) => {
  if (milliseconds < MINUTE_IN_MS) return `${milliseconds / SECOND_IN_MS}s`;

  const minutes = Math.floor(milliseconds / MINUTE_IN_MS);
  const remainderSeconds = milliseconds / SECOND_IN_MS - minutes * 60;

  return remainderSeconds !== 0 ? `${minutes}min ${remainderSeconds}s` : `${minutes}min`;
};

export default function Index() {
  const [refetchInterval, setRefetchInterval] = useState(DEFAULT_REFETCH_INTERVAL);
  const [sliderMark, setSliderMark] = useState(DEFAULT_REFETCH_INTERVAL);
  const [useRefetchInterval, setUseRefetchInterval] = useState(false);
  const [useHardLoadingState, setUseHardLoadingState] = useState(false);

  const background = useColorModeValue("gray.200", "gray.700");

  const queryResult = useGetRandomUser({
    queryOptions: {
      refetchInterval: useRefetchInterval ? refetchInterval : 0,
    },
  });

  return (
    <Flex align="center" direction="column" gap={4} height="100%" justify="center">
      {/* Prevent jumping */}
      <Box height={362}>
        <GenericDataCell
          queryResult={queryResult}
          SuccessState={PersonCard}
          useIsFetching={useHardLoadingState}
        />
      </Box>
      <Flex gap={4} width="60%">
        <Button onClick={() => queryResult.refetch()}>Refresh</Button>
        <Button onClick={() => setUseRefetchInterval((prev) => !prev)}>
          {useRefetchInterval ? "Stop interval" : "Start interval"}
        </Button>
      </Flex>
      <FormControl width="60%">
        <FormLabel>Refetch interval</FormLabel>
        <Slider
          defaultValue={DEFAULT_REFETCH_INTERVAL}
          max={TWO_MINUTES_IN_MS}
          // Taking into account SliderMark
          mb="7"
          min={0}
          step={SECOND_IN_MS}
          onChange={setSliderMark}
          onChangeEnd={setRefetchInterval}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
          <SliderMark bg={background} ml="-10" mt="4" textAlign="center" value={sliderMark} w="20">
            {displaySliderMark(sliderMark)}
          </SliderMark>
        </Slider>
      </FormControl>
      <Checkbox
        isChecked={useHardLoadingState}
        width="60%"
        onChange={(event) => setUseHardLoadingState(event.target.checked)}
      >
        Use hard loading state
      </Checkbox>
    </Flex>
  );
}
