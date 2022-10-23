// https://randomuser.me/

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QueryKey, useRestFetcher } from "api/REST/useRestFetcher";
import { z } from "zod";

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
  results: z.array(
    z.object({
      gender: z.string(),
      name: z.object({
        title: z.string(),
        first: z.string(),
        last: z.string(),
      }),
      location: z.object({
        street: z.object({
          number: z.number(),
          name: z.string(),
        }),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        postcode: z.union([z.string(), z.number()]).nullable(),
        coordinates: z.object({
          latitude: z.string(),
          longitude: z.string(),
        }),
        timezone: z.object({
          offset: z.string(),
          description: z.string(),
        }),
      }),
      email: z.string(),
      login: z.object({
        uuid: z.string(),
        username: z.string(),
        password: z.string(),
        salt: z.string(),
        md5: z.string(),
        sha1: z.string(),
        sha256: z.string(),
      }),
      dob: z.object({
        date: z.string(),
        age: z.number(),
      }),
      registered: z.object({
        date: z.string(),
        age: z.number(),
      }),
      phone: z.string(),
      cell: z.string(),
      id: z.object({
        name: z.string(),
        value: z.union([z.string(), z.number()]).nullable(),
      }),
      picture: z.object({
        large: z.string(),
        medium: z.string(),
        thumbnail: z.string(),
      }),
      nat: z.string(),
    })
  ),
  info: z.object({
    seed: z.string(),
    results: z.number(),
    page: z.number(),
    version: z.string(),
  }),
});

export type ResponseShape = z.infer<typeof responseShape>;

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
