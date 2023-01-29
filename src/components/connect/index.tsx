import { useMetamask } from "@thirdweb-dev/react";
import Image from "next/image";

import LinkDotSVG from "@/public/assets/svg/linkdot.svg";

const ConnectComponent = () => {
  const connectWithMetamask = useMetamask();
  // TODO: Add network check and switch functionality
  // const isOnWrongNetwork = useNetworkMismatch();

  // const [, switchNetwork] = useNetwork();

  // if (isOnWrongNetwork) {
  //   switchNetwork?.(ChainId.Polygon);
  // }

  return (
    <div className="flex h-screen w-full bg-white">
      <div className={"flex flex-col items-end justify-end p-32"}>
        <Image src={LinkDotSVG} alt="link dot name" />
        <div className="mt-7">
          <p className="text-right text-base font-normal leading-6 text-white">
            Unified reputation profile for <br />
            web3 netizens
          </p>
        </div>
      </div>
      <div className="flex w-[32.188rem] shrink-0 grow-0 items-center justify-center p-16">
        <div className="border border-solid border-gray-1700 p-6 text-center">
          <h2 className="mb-5 text-xl font-bold text-gray-1700">
            Claim your reputation Profile
          </h2>
          <p className="mb-6 whitespace-nowrap text-xs font-normal text-gray-1700">
            Get started by signing in using the URP NFT holding account
          </p>
          <div onClick={connectWithMetamask}>
            <button className="mb-8 min-w-[15.625rem] border border-solid border-yellow-100 p-4 text-sm font-normal text-yellow-200 shadow-3xl">
              Connect Metamask
            </button>
          </div>

          <p className="text-xs font-normal text-gray-1700">
            By connecting your wallet, you agree to our <br /> Terms of Service
            and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export { ConnectComponent };
