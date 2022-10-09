import { z } from "zod";

export interface RequestShape<Params = unknown, SearchParams = unknown, Payload = unknown> {
  params?: Params[];
  searchParams?: Record<string, SearchParams>;
  payload?: Payload;
}

export type QueryKey = {
  url: string;
  params?: RequestShape["params"];
  searchParams?: RequestShape["searchParams"];
}[];

interface UseGraphQlFetcherProps<TRequestShape extends RequestShape, ResponseShape> {
  options?: RequestInit;
  requestShape?: z.ZodType<TRequestShape>;
  responseShape: z.ZodType<ResponseShape>;
}

interface UseGraphQlFetcherReturnProps<TRequestShape extends RequestShape> {
  url: string;
  params?: TRequestShape["params"];
  searchParams?: TRequestShape["searchParams"];
  payload?: TRequestShape["payload"];
  signal?: AbortSignal;
}

// TODO: Add GraphQL support
export const useGraphQlFetcher = <TRequestShape extends RequestShape, ResponseShape>({
  options,
  requestShape,
  responseShape,
}: UseGraphQlFetcherProps<TRequestShape, ResponseShape>) => {
  if (!process.env.NEXT_PUBLIC_REST_API_URL) {
    throw new Error("process.env.NEXT_PUBLIC_REST_API_URL is undefined");
  }

  return async ({
    url,
    params,
    searchParams,
    payload,
    signal,
  }: UseGraphQlFetcherReturnProps<TRequestShape>) => {
    if (requestShape) {
      requestShape.parse({
        params,
        searchParams,
        payload,
      });
    }

    const preparedUrl = new URL(
      `${params ? params.join("/") : ""}`,
      `${process.env.NEXT_PUBLIC_REST_API_URL as string}${url}`
    );

    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) =>
        preparedUrl.searchParams.append(key, String(value))
      );
    }

    const response = await fetch(preparedUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      signal,
      body: JSON.stringify(payload),
      ...options,
    });

    if (!response.ok) {
      throw new Error("Rest fetcher response not ok");
    }

    const json = (await response.json()) as ResponseShape;

    return responseShape.parse(json);
  };
};
