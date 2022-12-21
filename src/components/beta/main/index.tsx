import axios from "axios";
import { useEffect, useState } from "react";

import { Email } from "@/components/forms/email";
import { Modal } from "@/components/Modal";
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
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    if (address !== user.walletId) {
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
    }
  }, [address]);

  useEffect(() => {
    // show email modal logic handled here otherwise it will flicker on every render
    const emailSkipValidity = localStorage.getItem("emailSkipValidity");
    const emailNotComplete = !user.email || !user.emailVerified;
    const showModal = new Date(Number(emailSkipValidity)) < new Date();
    setShowEmailModal(showModal && emailNotComplete);
  }, [user]);

  return (
    <div className="flex bg-white">
      {/* Show email registration modal if not email verified */}
      <Modal show={showEmailModal} showClose={true}>
        <Email userId={user.id} />
      </Modal>

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
