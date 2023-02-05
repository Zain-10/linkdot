import OutlineButton from "../button/OutlineButton";
import { ConnectComponent } from "../connect";

const LandingSection = () => {
  return (
    <div className="flexCenter flex-1 flex-col gap-10 px-24">
      <h1 className="text-5xl font-bold">Discover top web3 experts here</h1>
      <div>Search bar</div>
      <p className="text-xl font-bold">Join the biggest community of web 3</p>
      <div className=" flex  w-full flex-wrap justify-between gap-8">
        <div>
          <p className="mb-6 text-xl font-bold">Recommended profiles</p>
          <div className="flex flex-col gap-8">
            {[1, 2, 3].map((number) => (
              <div key={number} className="flexCenter gap-6">
                <div className="h-10 w-10 rounded-full bg-black" />
                <div>
                  <h6 className="text-base font-bold">Sreejin</h6>
                  <p className="text-sm font-normal text-[#000000b3]">
                    Co-Founder of linkDOT
                  </p>
                </div>
                <OutlineButton>Follow</OutlineButton>
              </div>
            ))}
          </div>
        </div>
        <ConnectComponent />
      </div>
    </div>
  );
};

export default LandingSection;
