import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { apiRoutes } from "@/config/apiRoutes";
import { LocalRoutes } from "@/config/localRoutes";
import { Action } from "@/constants";
import { useGlobalDispatch, useUserState } from "@/context/global.context";
import { userService } from "@/helpers/service/users";
import { fallbackToAuthPath } from "@/helpers/utils/getAuthRedirectPage";
import { Token, setToken } from "@/helpers/utils/setTokens";
import type { Address } from "@/types";
import { ConnectWallet } from "shelf/components/connect/connectWallet";
import { Base } from "shelf/components/layouts/Base";
import { Footer } from "shelf/components/layouts/Footer";

const AuthConnect: NextPage = () => {
  const address: Address | undefined = useAddress();
  const user: User = useUserState();
  const dispatch = useGlobalDispatch();
  const router = useRouter();

  const redirect = (user: User) => {
    const redirectPath = fallbackToAuthPath(user, LocalRoutes.dashboard);

    if (redirectPath) {
      console.log("Redirecting to:", redirectPath);
      router.push(redirectPath);
    }
  };

  const fetchTokens = async (address: Address) => {
    await axios
      .get(`${apiRoutes.getToken}?wallet_id=${address}`)
      .then((response) => {
        const { access_token, refresh_token } = response.data.data;
        if (access_token && refresh_token) {
          setToken(Token.ACCESS_TOKEN, access_token);
          setToken(Token.REFRESH_TOKEN, refresh_token);
          router.push(LocalRoutes.auth.selectCategory);
        }
      });
  };
  const createNewUser = async (wallet_id: string) => {
    console.log("Creating user");
    await axios
      .post(apiRoutes.connectWallet, {
        wallet_id,
        wallet_name: "Metamask",
      })
      .then((response) => {
        if (response.status) {
          const { wallet_id, message } = response.data.data;
          if (wallet_id && message === "user registered with wallet") {
            console.log(
              `User created succesfully with wallet_id: ${wallet_id}`
            );
            fetchTokens(wallet_id);
          } else {
            console.log(`User already exists with wallet_id: ${wallet_id}`);
            const { access_token, refresh_token } = response.data.data; // 🥲
            if (access_token && refresh_token) {
              console.log("Setting tokens");
              setToken(Token.ACCESS_TOKEN, access_token);
              setToken(Token.REFRESH_TOKEN, refresh_token);
            }
            router.push(LocalRoutes.auth.selectCategory);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUser = async () => {
    console.log("Fetching user");

    const user = await userService.getUserData();
    if (user) {
      dispatch({ type: Action.SetUser, payload: user });
      // @ts-ignore
      redirect(user);
    } else {
      console.log("user not found");
      if (address) createNewUser(address);
    }
  };
  useEffect(() => {
    if (address && user) {
      const redirectPath = fallbackToAuthPath(user, LocalRoutes.dashboard);

      if (redirectPath) {
        router.push(redirectPath);
      }
    }
    /**
     * Fecth user data from the backend.
     */
    if (address && !user) {
      setToken(Token.WALLET_ID, address);
      fetchUser();
    }
  }, [address]);

  return (
    <Base>
      <div className="flex h-full flex-1 items-center justify-center">
        <ConnectWallet />
      </div>
      <div className="text-center">
        <Footer textAlign="center" />
      </div>
    </Base>
  );

  /**
   * Possible Cases:
   * 1. Wallet is not connected and address is not available.
   * 2. Wallet is connected and address is available, but user is not available.
   * 3. Wallet is connected and address is available, and user is available.
   *
   * CASE 1:
   * - Connect wallet button is visible.
   * - On click of connect wallet button, address is available.
   * - On address available, checks if user is available.
   * - If user is not available, get user from the backend.
   * - If user is available, redirect to the dashboard.
   *
   * CASE 2:
   * - Connect wallet button is not visible.
   * - On address available, checks if user is available.
   * - If user is not available, get user from the backend.
   * - If user is available, redirect to the dashboard.
   *
   * CASE 3:
   * - Connect wallet button is not visible.
   * - On address available, checks if user is available.
   * - If user is available, redirect to the dashboard.
   */
};

export default AuthConnect;
