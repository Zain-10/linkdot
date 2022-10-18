import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { Contract, providers } from "ethers";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { abi } from "@/../artifacts/contracts/LinkDotContract.sol/LinkDotContract.json";
import { ClaimComponent } from "@/components/badge/claim";
import { Badge } from "@/components/badge/NTTBadge";
import { Connect } from "@/components/connect";
import { apiRoutes } from "@/config/apiRoutes";
import { Action } from "@/constants";
import { useGlobalDispatch } from "@/context/global.context";
import { axiosClient } from "@/helpers/axios-client";
import { getIPFSGatewayURL } from "@/helpers/utils/ipfs";
import { setToken, Token } from "@/helpers/utils/setTokens";
import { Base } from "@/layouts/Base";
import BagdeImage from "@/public/assets/images/badge.png";

type PageProps = {
  email_data: string;
  badge_data: string;
};

const Claim: NextPage<PageProps> = ({ email_data, badge_data }) => {
  const [badge, setBadge] = useState<NTTBadge>();
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
        console.log(`alert("Badge claimed successfully")`);
        router.push("/badge/claim/success");
      }
    }
  };
  const fetchTokens = async (address: string) => {
    await axios
      .get(`${apiRoutes.getToken}?wallet_id=${address}`)
      .then((response) => {
        const { access_token, refresh_token } = response.data.data;
        if (access_token && refresh_token) {
          setToken(Token.ACCESS_TOKEN, access_token);
          setToken(Token.REFRESH_TOKEN, refresh_token);
        }
      });
  };

  const fetchUser = async (address: string) => {
    const email = email_data.split(" ").join("+");
    const response = await axiosClient.get(
      `${apiRoutes.getUser}?email=${email}`
    );
    const user = response.data.data;
    if (user) {
      dispatch({ type: Action.SetUser, payload: user });
      fetchTokens(address);
    } else {
      toast.error("the email is not valid!");
    }
  };

  const fetchBadgeDetails = async () => {
    const payload = { badge: badge_data.split(" ").join("+") };
    const url = `${apiRoutes.badgeDetailByEncryptedId}`;
    const response = await axiosClient.post(url, payload);
    // @ts-ignore
    setBadge(response?.data?.data);
  };

  useEffect(() => {
    if (address) {
      setToken(Token.WALLET_ID, address);
      fetchUser(address);
      fetchBadgeDetails();
    }
  }, [address]);

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
  console.log({ badge_data, email_data });

  return {
    props: { email_data, badge_data },
  };
  // ...
};

export default Claim;
