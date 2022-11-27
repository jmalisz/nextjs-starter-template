// Inspired by https://redwoodjs.com/docs/cells

import { Flex, Spinner, Text } from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { FunctionComponent } from "react";

export type GenericErrorStateProps = {
  error: Error;
};

function GenericErrorState({ error }: GenericErrorStateProps) {
  return <Text color="red.500">{JSON.stringify(error)}</Text>;
}

function GenericLoadingState() {
  return (
    <Flex align="center" height="full" justify="center" p={4}>
      <Spinner size="xl" />
    </Flex>
  );
}

function GenericMissingState() {
  return <Text>Query returned no data</Text>;
}

export type GenericSuccessStateProps<TData> = {
  data: TData;
};

function GenericSuccessState<TData>({ data }: GenericSuccessStateProps<TData>) {
  return <Text>{JSON.stringify(data)}</Text>;
}

type GenericDataCellProps<TData> = {
  ErrorState?: FunctionComponent<GenericErrorStateProps>;
  LoadingState?: FunctionComponent;
  MissingState?: FunctionComponent;
  SuccessState?: FunctionComponent<GenericSuccessStateProps<TData>>;
  queryResult: UseQueryResult<TData, Error>;
  useIsFetching?: boolean;
};

export function GenericDataCell<TData>({
  ErrorState = GenericErrorState,
  LoadingState = GenericLoadingState,
  MissingState = GenericMissingState,
  SuccessState = GenericSuccessState,
  queryResult,
  useIsFetching,
}: GenericDataCellProps<TData>) {
  const { error, data, isError, isFetching, isLoading, isSuccess } = queryResult;

  // Solution to isLoading being false when enabled === true for react-query
  const isInitialLoad = isLoading && isFetching;

  const isMissing = Boolean(data) && isEmpty(data);

  switch (true) {
    case isError: {
      return <ErrorState error={error as Error} />;
    }
    case useIsFetching ? isFetching : isInitialLoad: {
      return <LoadingState />;
    }
    case isMissing: {
      return <MissingState />;
    }
    case isSuccess: {
      return <SuccessState data={data as TData} />;
    }
    default: {
      throw new Error("Unexpected GenericDataCell state");
    }
  }
}
