import { useMetamask } from "@thirdweb-dev/react";

const ConnectComponent = () => {
  const connectWithMetamask = useMetamask();
  // TODO: Add network check and switch functionality
  // const isOnWrongNetwork = useNetworkMismatch();

  // const [, switchNetwork] = useNetwork();

  // if (isOnWrongNetwork) {
  //   switchNetwork?.(ChainId.Polygon);
  // }

  return (
    <div className=" max-w-sm rounded-md border border-gray bg-[#9494940d] p-6 text-center">
      <h2 className="mb-5 text-xl font-bold text-gray">
        Create your linkDOT Portfolio
      </h2>
      <p className="mb-6 text-xs font-normal text-gray">
        Get exclusive access to top talents and apply for best web3
        opportunities based on your Proof of work and verified credentials.
      </p>
      <button
        onClick={() => connectWithMetamask()}
        className="primaryHover mb-8 min-w-[15.625rem] rounded-md border border-yellow p-4 text-sm font-bold text-yellow shadow-btn"
      >
        Connect Metamask
      </button>

      <p className="text-xs font-normal text-gray">
        By connecting your wallet, you agree to our{" "}
        <span className="text-link">Terms of Service and Privacy Policy</span>
      </p>
    </div>
  );
};

export { ConnectComponent };
