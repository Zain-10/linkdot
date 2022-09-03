import "../styles/global.css";

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";

import GlobalProvider from "@/context/providers/global.provider";

/**
 * Configure Persistent Page Layouts
 * https://nextjs.org/docs/basic-features/layouts#per-page-layouts
 */

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  </ThirdwebProvider>
);

export default MyApp;
