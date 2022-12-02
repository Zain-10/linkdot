import { Header } from "../header";
import { RightSideBar } from "../rightSideBar";
import { SideBar } from "../sideBar";

const Main = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="flex bg-white">
      <SideBar />
      <div className="w-full ">
        <Header />
        <div className="custom-scrollbar flex pl-4 pr-8">
          {children}
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export { Main };
