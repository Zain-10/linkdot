import linkDotText from "../../../../public/assets/images/linkdottext.svg";
import Image from "next/image";
const HomePage = () => {
  return (
    <div className="flex bg-white h-screen w-full">
      <div className="home-page-left-section flex flex-col items-end justify-end p-32">
        <Image src={linkDotText} alt="link dot name" />
        <div className="mt-7">
          <p className="font-normal text-white text-base text-right">Unified reputation profile for <br/>web3 netizens</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-16 w-[32.188rem] grow-0 shrink-0">
          <div className="border border-solid border-gray-1700 p-6 text-center">
            <h2 className="font-bold text-gray-1700 text-xl mb-5">Claim your reputation Profile</h2>
            <p className="font-normal text-gray-1700 text-xs whitespace-nowrap mb-6">Get started by signing in using the URP NFT holding account</p>
            <button className="p-4 min-w-[15.625rem] border border-solid border-yellow-100 font-normal text-sm text-yellow-200 shadow-3xl hover:bg-yellow-100 hover:text-black hover:shadow-black mb-8">Connect Metamask</button>
            <p className="font-normal text-gray-1700 text-xs">By connecting your wallet, you agree to our Terms of Service and Privacy Policy</p>
          </div>
      </div>
    </div>
  );
};

export { HomePage };
