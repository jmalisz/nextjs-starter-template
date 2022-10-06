import { ChakraProvider } from "@chakra-ui/react";

import { AppProps } from "next/app";
import { theme } from "config/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: process.env.NODE_ENV === "production",
      retry: process.env.NODE_ENV === "production" ? 3 : false,
      staleTime: 3 * 1000 * 60,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
