import { Box, Flex } from "@chakra-ui/react";
import { useGetRandomUser } from "api/REST/GET/useGetRandomUser";
import { ApiInteractionInterface } from "components/ApiInteractionInterface";
import { GenericDataCell } from "components/GenericDataCell";
import { PersonCard } from "components/PersonCard";
import { useState } from "react";

export default function Index() {
  const [refetchInterval, setRefetchInterval] = useState(0);
  const [useRefetchInterval, setUseRefetchInterval] = useState(false);
  const [useHardLoadingState, setUseHardLoadingState] = useState(false);

  const queryResult = useGetRandomUser({
    queryOptions: {
      refetchInterval: useRefetchInterval ? refetchInterval : 0,
    },
  });

  return (
    <Flex align="center" direction="column" gap={4} height="100%" justify="center">
      {/* Prevent jumping with height */}
      <Box height={362}>
        <GenericDataCell
          queryResult={queryResult}
          SuccessState={PersonCard}
          useIsFetching={useHardLoadingState}
        />
      </Box>
      <ApiInteractionInterface
        refetch={queryResult.refetch}
        refetchInterval={refetchInterval}
        setRefetchInterval={setRefetchInterval}
        setUseHardLoadingState={setUseHardLoadingState}
        setUseRefetchInterval={setUseRefetchInterval}
        useHardLoadingState={useHardLoadingState}
        useRefetchInterval={useRefetchInterval}
      />
    </Flex>
  );
}
