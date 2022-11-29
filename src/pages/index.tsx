import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useGetRandomUser } from "api/REST/GET/useGetRandomUser";
import { GenericDataCell } from "components/GenericDataCell";
import { PersonCard } from "components/PersonCard";
import { useState } from "react";

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
