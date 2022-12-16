import { Connect } from ".";
import GetStartComponent from "./getstart";

const ConnectWallet = () => {
  return (
    <div className="flex w-full items-center justify-center p-3 md:w-3/4 lg:w-1/2">
      <div className="w-full md:flex lg:flex">
        <div className="mb-6 w-full md:w-1/2 lg:w-1/2">
          <GetStartComponent />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2">
          <Connect />
        </div>
      </div>
    </div>
  );
};

export { ConnectWallet };
