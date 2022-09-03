import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { useRouter } from "next/router";

import { apiRoutes } from "@/config/apiRoutes";
import { LocalRoutes } from "@/config/localRoutes";
import { Action } from "@/constants";
import { UserCategory } from "@/constants/userCategory";
import { useGlobalDispatch } from "@/context/global.context";

import { Button } from "../button";

type TButtonTheme = {
  [key: string]: string;
};
const Category = () => {
  const address = useAddress();
  const router = useRouter();
  const dispatch = useGlobalDispatch();

  const ButtonTheme: TButtonTheme = {
    // Match the keys from UserCategory objects
    NFTArtist: "#20AAFE",
    Web3Influencers: "#C640F2",
    DAOorCommunities: "#20FE79",
    Contributors: "#405CF2",
  };

  async function updateUserCategory(
    _: React.MouseEvent<HTMLDivElement>,
    category: string
  ) {
    await axios
      .post(apiRoutes.userType, {
        wallet_id: address,
        user_type: category,
      })
      .then(() => {
        dispatch({ type: Action.SetUser, payload: { category } });
        return router.push(LocalRoutes.authSetUserName);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="grid grid-rows-4 gap-6 text-sm leading-5">
      {Object.entries(UserCategory).map(([key, value], _) => (
        <div
          key={key}
          className="h-12"
          onClick={(event) => updateUserCategory(event, value)}
        >
          <Button outerBoxShadowColor={ButtonTheme[key]}>{value}</Button>
        </div>
      ))}
    </div>
  );
};

export { Category };
