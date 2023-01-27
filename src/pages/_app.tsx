import "../styles/global.css";

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";

import GlobalProvider from "@/context/providers/global.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Configure Persistent Page Layouts
 * https://nextjs.org/docs/basic-features/layouts#per-page-layouts
 */

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <Component {...pageProps} />
        </GlobalProvider>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
};

export default MyApp;
