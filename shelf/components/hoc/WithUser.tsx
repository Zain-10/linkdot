import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { memo, useEffect } from "react";

import { LocalRoutes } from "@/config/localRoutes";
import { Action } from "@/constants";
import { useGlobalDispatch, useUserState } from "@/context/global.context";
import { userService } from "@/helpers/service/users";
import { fallbackToAuthPath } from "@/helpers/utils/getAuthRedirectPage";

import { ConnectWallet } from "../../../shelf/components/connect/connectWallet";

interface WithAddressProps {}
// Mark the function as a generic using T (or whatever variable you want)
export function withUser<T extends WithAddressProps>(
  // FIXME: This HOC is not very efficient causes multiple re-renders.
  Component: React.ComponentType<T>
) {
  // FIXME: this component get rendered muliple times
  const ComponentWithAddress = memo((props: T) => {
    // At this point, the props being passed in are the original props the component expects.
    const address = useAddress();
    const user: User = useUserState();
    const dispatch = useGlobalDispatch();
    const router = useRouter();

    // Retreive user data from backend.
    // If user does not exist, redirect to signup flow to create new account.

    async function fetchUserData() {
      console.log("fetching user data");
      try {
        // dispatch(Loading);
        // @ts-ignore
        const user: User = await userService.getUserData();

        if (user) {
          // @ts-ignore
          dispatch({ type: Action.SetUser, payload: user });
        }
      } catch (error) {
        // dispatch(NotLoading);
        console.log(error);
      } finally {
        // dispatch(NotLoading);
      }
    }

    useEffect(() => {
      if (address && user === null) fetchUserData();
    }, [address]);

    useEffect(() => {
      console.log("user changed", user);
      if (user) {
        const path = fallbackToAuthPath(user, router.pathname);
        if (path && path !== router.pathname) {
          console.log("Redirecting to:", path);
          router.push(path);
        }
      } else {
        router.push(LocalRoutes.auth.connect);
      }
    }, [user]);

    if (!address)
      return (
        <div className="flex flex-1 items-center justify-center">
          <ConnectWallet />
        </div>
      );

    return <Component {...(props as T)} />;
  });
  ComponentWithAddress.displayName = "ComponentWithAddress";
  return ComponentWithAddress;
}
