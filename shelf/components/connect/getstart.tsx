import Link from "next/link";

const GetStartComponent = () => (
  <div className="flex w-full flex-col text-center md:text-xl lg:text-xl ">
    <h1 className="mb-6 font-medium md:text-left">
      Get Start to Join our <br /> Community
    </h1>
    <p className="font-roboto mb-5 text-sm font-normal md:text-left">
      Quickly get started by signing in
      <br /> using your existing accounts.
    </p>
    <p className="text-xs text-gray-400 md:mt-6 md:text-left">
      By connecting your wallet, you agree to our <br />
      <Link href="/">
        <a className="bg-gradient-to-r from-gradient-blue to-gradient-purple bg-clip-text text-transparent hover:underline">
          Terms of Service
        </a>
      </Link>
      <span> and </span>
      <Link href="/">
        <a className="bg-gradient-to-r from-gradient-blue to-gradient-purple bg-clip-text text-transparent hover:underline">
          Privacy Policy
        </a>
      </Link>
    </p>
  </div>
);

export default GetStartComponent;
