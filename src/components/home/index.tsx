import Image from "next/image";

import linkDotText from "@/public/assets/svg/linkdot.svg";

const HomePage = () => {
  return (
    <div className="flex h-screen w-full bg-white">
      <div className="home-page-left-section flex flex-col items-end justify-end p-32">
        <Image src={linkDotText} alt="link dot name" />
        <div className="mt-7">
          <p className="text-right text-base font-normal text-white">
            Unified reputation profile for <br />
            web3 netizens
          </p>
        </div>
      </div>
      <div className="flex w-[32.188rem] shrink-0 grow-0 items-center justify-center p-16">
        <div className="border-gray-1700 border border-solid p-6 text-center">
          <h2 className="text-gray-1700 mb-5 text-xl font-bold">
            Claim your reputation Profile
          </h2>
          <p className="text-gray-1700 mb-6 whitespace-nowrap text-xs font-normal">
            Get started by signing in using the URP NFT holding account
          </p>
          <button className="border-yellow-100 text-yellow-200 shadow-3xl mb-8 min-w-[15.625rem] border border-solid p-4 text-sm font-normal hover:bg-yellow-100 hover:text-black hover:shadow-black">
            Connect Metamask
          </button>
          <p className="text-gray-1700 text-xs font-normal">
            By connecting your wallet, you agree to our Terms of Service and
            Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export { HomePage };
