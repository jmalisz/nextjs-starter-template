// https://randomuser.me/

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { QueryKey, useRestFetcher } from "../useRestFetcher";

const requestShape = z.object({
  searchParams: z
    .object({
      results: z.number().min(1).max(5000).optional(),
      gender: z.enum(["male", "female"]).optional(),
    })
    .optional(),
});
type RequestShape = z.infer<typeof requestShape>;

const responseShape = z.object({
  results: z.array(z.any()),
  info: z.record(z.any()),
});
type ResponseShape = z.infer<typeof responseShape>;

interface UseGetRandomUserProps<TResponseShape> {
  searchParams?: RequestShape["searchParams"];
  queryOptions?: UseQueryOptions<ResponseShape, Error, TResponseShape, QueryKey>;
}

export const useGetRandomUser = <TResponseShape = ResponseShape>({
  searchParams,
  queryOptions,
}: UseGetRandomUserProps<TResponseShape> = {}) => {
  const fetch = useRestFetcher({
    options: {
      method: "GET",
    },
    requestShape,
    responseShape,
  });

  return useQuery(
    useGetRandomUser.getKey(searchParams),
    ({ queryKey, signal }) => fetch({ ...queryKey[0], signal }),
    queryOptions
  );
};

useGetRandomUser.getKey = (searchParams?: RequestShape["searchParams"]) => [
  {
    url: "api",
    searchParams,
  },
];
