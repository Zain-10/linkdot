import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { ConnectWallet } from "@/components/connect/connectWallet";
import { apiRoutes } from "@/config/apiRoutes";
import { LocalRoutes } from "@/config/localRoutes";
import { Action } from "@/constants";
import { useGlobalDispatch, useUserState } from "@/context/global.context";
import { authRedirectPage } from "@/helpers/utils/getAuthRedirectPage";
import { Base } from "@/layouts/Base";
import type { Address } from "@/types";

const AuthConnect: NextPage = () => {
  const address: Address | undefined = useAddress();
  const user: User = useUserState();
  const dispatch = useGlobalDispatch();
  const router = useRouter();

  async function getOrCreateUser(wallet_id: string) {
    const response = await axios.post(apiRoutes.connectWallet, {
      wallet_id,
      wallet_name: "Metamask",
      // TODO: Make the wallet_name provider value generic.
      // Thirdweb saves the wallet provider in the local storage in key `tw:provider:connectors`
    });

    /**
     * Check if user exists.
     * FIXME: Fix the backend API to send user data and JWt tokens on user creation.
     * Backend API sends wrong response format.
     * On the First attempt, if the user get created in the database,
     * Server don't returns user data.
     *
     * On the second attempt(If the user exists) server returns user data `if_user`,
     * and JWT tokens `access_token` and `refresh_token`.
     */
    const response_user: User = response.data.data.if_user; // FIXME: Extra nested data object
    if (response_user) dispatch({ type: Action.SetUser, payload: user });

    // if the user doesn't exist in the database, probably there is no tokens available in the localStorage.
    if (!response_user) {
      // FIXME: get tokens should be post request.
      await axios
        .get(`${apiRoutes.getToken}?wallet_id=${address}`)
        .then(async (res) => {
          // FIXME: ⛏️ response.data have a extra nested data object
          const { access_token, refresh_token, if_user } = res.data.data; // 🥲

          await localStorage.setItem("refresh_token", refresh_token);
          await localStorage.setItem("access_token", access_token);
          // Updating Global context with user obect.
          dispatch({ type: Action.SetUser, payload: if_user });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    console.log("Hook No:2");
    // TODO: Need refactoring
    if (address) {
      const redirectPath = authRedirectPage(user);
      if (redirectPath) {
        router.push(redirectPath);
      } else {
        router.push(LocalRoutes.dashboard);
      }
    }
  }, [user]);

  useEffect(() => {
    console.log("Hook No:1");
    // TODO: Need refactoring

    if (address && user === null) getOrCreateUser(address);
    else if (address && user) {
      const redirectPath = authRedirectPage(user);
      if (redirectPath) router.push(redirectPath);
    }
  }, [address]);

  return (
    <Base>
      <div className="flex h-full flex-1 items-center justify-center">
        <ConnectWallet />
      </div>
    </Base>
  );
};

export default AuthConnect;
