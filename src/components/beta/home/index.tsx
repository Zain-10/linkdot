import Image from "next/image";

import linkDotText from "../../../../public/assets/images/linkdottext.svg";

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
        <div className="border border-solid border-gray-1700 p-6 text-center">
          <h2 className="mb-5 text-xl font-bold text-gray-1700">
            Claim your reputation Profile
          </h2>
          <p className="mb-6 whitespace-nowrap text-xs font-normal text-gray-1700">
            Get started by signing in using the URP NFT holding account
          </p>
          <button className="mb-8 min-w-[15.625rem] border border-solid border-yellow-100 p-4 text-sm font-normal text-yellow-200 shadow-3xl hover:bg-yellow-100 hover:text-black hover:shadow-black">
            Connect Metamask
          </button>
          <p className="text-xs font-normal text-gray-1700">
            By connecting your wallet, you agree to our Terms of Service and
            Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export { HomePage };
