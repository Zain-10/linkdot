import React from "react";

import { Base } from "../Base";
import { Header } from "../header";
import { SideMenu } from "../SideMenu";
import { WithUserBase } from "../WithUserBase";

const Main = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Base>
      <WithUserBase>
        <Header />
        <div className="flex flex-1">
          <div className="flex h-[calc(100vh-110px)] flex-1 overflow-hidden">
            <div className=" md:w-1/6 lg:w-1/6 ">
              <SideMenu />
            </div>
            <div className="h-screen w-full flex-1 pl-8">{children}</div>
          </div>
        </div>
      </WithUserBase>
    </Base>
  );
};
export { Main };
