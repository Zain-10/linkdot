import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { ConnectComponent } from "@/components/connect";
import { ApiRoutes } from "@/config/betaApis";
import { LocalRoutes } from "@/config/localRoutes";
import { Action, LOCAL_STORAGE, StatusCodes } from "@/constants";
import { useGlobalDispatch, useUserState } from "@/context/global.context";
import { setToLocal } from "@/helpers/utils/setTokens";

const Connect: NextPage = () => {
  const address = useAddress();
  const user: User = useUserState();
  const router = useRouter();
  const dispatch = useGlobalDispatch();

  const createNewUser = async (address: string) => {
    console.log("Creating user");

    const response = await axios.post(ApiRoutes.CREATE_USER, {
      walletId: address,
      walletName: "Metamask",
    });

    if (response.status === StatusCodes.CREATED) {
      const user = response.data;
      // Set user in global context
      dispatch({
        type: Action.SetUser,
        payload: { ...user, loggedIn: true },
      });
      console.log("User created succesfully");
    }
  };

  const fetchUser = async (address: string) => {
    console.log("Fetching user");
    const url = `${ApiRoutes.GET_USER_BY_WALLET_ADDRESS}`.replace(
      ":address",
      address
    );
    await axios
      .get(url)
      .then((response) => {
        if (response.status === StatusCodes.OK && response.data) {
          const user = response.data;
          console.log("Fetched user succesfully");
          // Set user in global context
          dispatch({
            type: Action.SetUser,
            payload: { ...user, loggedIn: true },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        // User not found
        if (err.response.status === StatusCodes.NOT_FOUND) {
          console.log("User not found");
          createNewUser(address);
        }
      });
  };

  if (address && !user) {
    fetchUser(address);
    setToLocal(LOCAL_STORAGE.WALLET_ID, address);
  }

  if (address && user) {
    router.push(LocalRoutes.dashboard);
  }

  return <ConnectComponent />;
};

export default Connect;
