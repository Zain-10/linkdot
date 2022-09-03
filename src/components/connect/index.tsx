import { useMetamask, useWalletConnect } from "@thirdweb-dev/react";

import { Button } from "../button";
import { Metamask, Walletconnect } from "../icons";
import HelpWallet from "./wallet-help";

const Connect = () => {
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div onClick={connectWithMetamask} className="h-16">
        <Button boxShadowVariant={1} outerBoxShadowColor="#ffcd29">
          <div className="flex w-full justify-between px-4">
            <span className="h-8 w-8">
              <Metamask />
            </span>
            <span className="flex-1">Metamask</span>
          </div>
        </Button>
      </div>

      <p className="my-5 text-center">or</p>
      <div onClick={connectWithWalletConnect} className="h-16">
        <Button boxShadowVariant={1} outerBoxShadowColor="#FF6767">
          <div className="flex w-full justify-between px-4">
            <span className="h-8 w-8">
              <Walletconnect />
            </span>
            <span className="flex-1">Walletconnect</span>
          </div>
        </Button>
      </div>
      <HelpWallet />
    </div>
  );
};

export { Connect };
