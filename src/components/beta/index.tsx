import { Explore } from "./explore";
import { Header } from "./header";
import { RightSideBar } from "./rightSideBar";
import { SideBarBeta } from "./sideBar";

const HomeBeta = () => {
  return (
    <div className="flex bg-white">
      <SideBarBeta />
      <div className="w-full ">
        <Header />
        <div className="custom-scrollbar flex pl-4 pr-8">
          {/* <Profile /> */}
          <Explore />
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export { HomeBeta };
