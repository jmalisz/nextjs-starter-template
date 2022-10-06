import { z } from "zod";

interface RequestShape<Params = any, SearchParams = never, Payload = never> {
  params?: Params[];
  searchParams?: Record<string, SearchParams>;
  payload?: Payload;
}

interface UseRestFetcherProps<TRequestShape extends RequestShape, ResponseShape> {
  options?: RequestInit;
  requestShape?: z.ZodType<TRequestShape>;
  responseShape: z.ZodType<ResponseShape>;
}

interface UseRestFetcherReturnProps<TRequestShape extends RequestShape> {
  url: string;
  params?: TRequestShape["params"];
  searchParams?: TRequestShape["searchParams"];
  payload?: TRequestShape["payload"];
  signal?: AbortSignal;
}

// TODO: Modify to use GraphQL
export const useRestFetcher = <TRequestShape extends RequestShape, ResponseShape>({
  options,
  requestShape,
  responseShape,
}: UseRestFetcherProps<TRequestShape, ResponseShape>) => {
  if (!process.env.NEXT_PUBLIC_REST_API_URL) {
    throw new Error("process.env.NEXT_PUBLIC_REST_API_URL is undefined");
  }

  return async ({
    url,
    params,
    searchParams,
    payload,
    signal,
  }: UseRestFetcherReturnProps<TRequestShape>) => {
    try {
      requestShape.parse({
        params,
        searchParams,
        payload,
      });
    } catch (err) {
      throw new Error("Wrong requestShape, ZodError:\n" + err);
    }

    const preparedParams = params ? params.join["/"] : "";
    const preparedSearchParams = searchParams ? `?${new URLSearchParams(searchParams)}` : "";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REST_API_URL}${url}${preparedParams}${preparedSearchParams}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        signal,
        body: payload || null,
        ...options,
      }
    );

    if (!response.ok) {
      throw new Error("Rest fetcher response not ok");
    }

    const json = await response.json();

    try {
      responseShape.parse(json);
    } catch (err) {
      throw new Error("Wrong responseShape, ZodError:\n" + err);
    }

    return json;
  };
};
