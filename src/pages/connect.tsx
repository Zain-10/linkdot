import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { Address } from "next-seo/lib/types";
import { useEffect } from "react";

import { ConnectComponent } from "@/components/beta/connect";
import { apiRoutes } from "@/config/apiRoutes";
import { LocalRoutes } from "@/config/localRoutes";
import { Action } from "@/constants";
import { useGlobalDispatch, useUserState } from "@/context/global.context";
import { userService } from "@/helpers/service/users";
import { fallbackToAuthPath } from "@/helpers/utils/getAuthRedirectPage";
import { setToken, Token } from "@/helpers/utils/setTokens";

const Connect: NextPage = () => {
  const address = useAddress();
  const user: User = useUserState();
  const router = useRouter();
  const dispatch = useGlobalDispatch();

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
          router.push(LocalRoutes.dashboard);
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
            router.push(LocalRoutes.dashboard);
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
    // useAddress only works on the client side, so we need to check after the component has mounted
    if (address) {
      router.push(LocalRoutes.dashboard);
    }
  }, []);

  useEffect(() => {
    // When the address changes, we need to check if user is new or not
    if (address && user) {
      console.log("wallet has connected");

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

  return <ConnectComponent />;
};

export default Connect;
