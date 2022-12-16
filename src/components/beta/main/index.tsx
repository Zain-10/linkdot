import axios from "axios";
import { useEffect } from "react";

import { ApiRoutes } from "@/config/betaApis";
import { Action, StatusCodes } from "@/constants";
import { useGlobalDispatch } from "@/context/global.context";

import { Header } from "../header";
import { RightSideBar } from "../rightSideBar";
import { SideBar } from "../sideBar";

interface MainProps extends React.PropsWithChildren<{}> {
  address: string;
  user: User;
}

const Main = ({ children, user, address }: MainProps) => {
  const dispatch = useGlobalDispatch();

  useEffect(() => {
    axios
      .get(ApiRoutes.GET_USER_BY_WALLET_ADDRESS.replace(":address", address))
      .then((res) => {
        if (res.status === StatusCodes.OK) {
          console.log(res.data);
          dispatch({
            type: Action.SetUser,
            payload: res.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [address]);

  return (
    <div className="flex bg-white">
      <SideBar />
      <div className="w-full ">
        <Header />
        <div className="custom-scrollbar flex pl-4 pr-8">
          {children}
          <RightSideBar currentUser={user} />
        </div>
      </div>
    </div>
  );
};

export { Main };
