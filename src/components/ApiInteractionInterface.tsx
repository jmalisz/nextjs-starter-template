import {
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
import { Dispatch, SetStateAction, useState } from "react";

const TWO_MINUTES_IN_MS = 2 * 60 * 1000;
const MINUTE_IN_MS = 60 * 1000;
const SECOND_IN_MS = 1000;

const displaySliderMark = (milliseconds: number) => {
  if (milliseconds < MINUTE_IN_MS) return `${milliseconds / SECOND_IN_MS}s`;

  const minutes = Math.floor(milliseconds / MINUTE_IN_MS);
  const remainderSeconds = milliseconds / SECOND_IN_MS - minutes * 60;

  return remainderSeconds !== 0 ? `${minutes}min ${remainderSeconds}s` : `${minutes}min`;
};

interface ApiInteractionInterfaceProps {
  refetch: () => void;
  refetchInterval: number;
  setRefetchInterval: Dispatch<SetStateAction<number>>;
  useRefetchInterval: boolean;
  setUseRefetchInterval: Dispatch<SetStateAction<boolean>>;
  useHardLoadingState: boolean;
  setUseHardLoadingState: Dispatch<SetStateAction<boolean>>;
}

export function ApiInteractionInterface({
  refetch,
  refetchInterval,
  setRefetchInterval,
  useRefetchInterval,
  setUseRefetchInterval,
  useHardLoadingState,
  setUseHardLoadingState,
}: ApiInteractionInterfaceProps) {
  const [sliderMark, setSliderMark] = useState(refetchInterval);

  const background = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      <Flex gap={4} width="60%">
        <Button onClick={refetch}>Refresh</Button>
        <Button onClick={() => setUseRefetchInterval((prev) => !prev)}>
          {useRefetchInterval ? "Stop interval" : "Start interval"}
        </Button>
      </Flex>
      <FormControl width="60%">
        <FormLabel>Refetch interval</FormLabel>
        <Slider
          defaultValue={refetchInterval}
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
    </>
  );
}
