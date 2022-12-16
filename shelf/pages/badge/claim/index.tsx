import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { Contract, providers } from "ethers";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { abi } from "@/../artifacts/contracts/LinkDotContract.sol/LinkDotContract.json";
import { apiRoutes } from "@/config/apiRoutes";
import { Action } from "@/constants";
import { useGlobalDispatch } from "@/context/global.context";
import { axiosClient } from "@/helpers/axios-client";
import { userService } from "@/helpers/service/users";
import { getIPFSGatewayURL } from "@/helpers/utils/ipfs";
import { Token, setToken } from "@/helpers/utils/setTokens";
import BagdeImage from "@/public/assets/images/badge.png";
import { Badge } from "shelf/components/badge/NTTBadge";
import { ClaimComponent } from "shelf/components/badge/claim";
import { Connect } from "shelf/components/connect";
import { Base } from "shelf/components/layouts/Base";

type PageProps = {
  email_data: string;
  badge_data: string;
};

const Claim: NextPage<PageProps> = ({ email_data, badge_data }) => {
  const [badge, setBadge] = useState<NTTBadge>();
  const [user, setUser] = useState<User>();

  const address = useAddress();
  const router = useRouter();
  const dispatch = useGlobalDispatch();

  const claimBadge = async () => {
    const wallet = global.window.ethereum;

    const payload = {
      email_data: email_data.split(" ").join("+"),
      badge_data: badge_data.split(" ").join("+"),
    };

    // @ts-ignore
    const provider = new providers.Web3Provider(wallet);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const contractDataFromDb = await axiosClient.post(
      apiRoutes.claimBadgeContractData,
      payload
    );
    const contractAddress = contractDataFromDb.data.data.contract;
    const badgeContract = new Contract(contractAddress, abi, signer);
    const transactionStateShange = await badgeContract.claim();
    const tx = await transactionStateShange.wait();

    console.log("tx: ", tx);

    if (tx) {
      const response = await axiosClient.post(apiRoutes.claimBadge, payload);
      if (response.status === 200) {
        toast.success("Badge Issued Successfully");
        console.log("Badge claimed successfully");
        router.push("/badge/claim/success");
      }
    }
  };

  const fetchBadgeDetails = async () => {
    const payload = { badge: badge_data.split(" ").join("+") };
    const url = `${apiRoutes.badgeDetailByEncryptedId}`;
    const response = await axiosClient.post(url, payload);
    // @ts-ignore
    setBadge(response?.data?.data);
  };

  const fetchUserByEmail = async (address: string) => {
    const email = email_data.split(" ").join("+");
    const response = await axios.post(`${apiRoutes.register}`, { email });
    const { access_token, refresh_token, user } = response.data.data;
    if (access_token && refresh_token) {
      setToken(Token.ACCESS_TOKEN, access_token);
      setToken(Token.REFRESH_TOKEN, refresh_token);
    }

    if (user) {
      if (user.wallet_id === undefined) {
        console.log("user.wallet_id: ", user.wallet_id);

        // Update user with connected wallet_id
        await userService.updateUser({
          wallet_id: address,
        });
      }
      dispatch({ type: Action.SetUser, payload: user });
    } else {
      toast.error("could not fetch badge related to this email");
    }
  };

  const fetchUser = async (address: string) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const user = await userService.getUserData();
      if (user) {
        dispatch({ type: Action.SetUser, payload: user });
        // @ts-ignore
        setUser(user);
      }
    } else if (email_data) {
      fetchUserByEmail(address);
    }
  };

  useEffect(() => {
    if (address) {
      setToken(Token.WALLET_ID, address);
      fetchUser(address);
    }
  }, [address]);

  useEffect(() => {
    if (user && address) {
      fetchBadgeDetails();
    }
  }, [user]);

  return (
    <>
      <Base>
        <Toaster />
        <div className="flex h-full w-full flex-1 content-center justify-center border-gray-400">
          <div className="m-auto">
            <div
              className="flex border border-gray-400 p-8"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.06)" }}
            >
              <div className="w-1/3">
                {badge ? (
                  <Badge
                    name={badge.name}
                    type={badge.badge_type}
                    description={badge.description}
                    image={getIPFSGatewayURL(badge?.ipfs_data.ipfs_nft)}
                    createdDate={badge.created_at}
                  />
                ) : (
                  <Image className="blur-sm" src={BagdeImage} />
                )}
              </div>
              <div className="flex w-2/3 flex-col justify-between py-10 pl-10 text-center">
                {address ? (
                  <ClaimComponent address={address} claimBadge={claimBadge} />
                ) : (
                  <Connect />
                )}
              </div>
            </div>
          </div>
        </div>
      </Base>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { badge_data, email_data },
  } = context;

  return {
    props: { email_data, badge_data },
  };
  // ...
};

export default Claim;
