import { useAddress } from "@thirdweb-dev/react";
import { Contract, providers } from "ethers";
import { abi as linkDotABI } from "linkdot_smartcontract/artifacts/contracts/LinkDotContract.sol/LinkDotContract.json";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Connect } from "@/components/connect";
import { apiRoutes } from "@/config/apiRoutes";
import { LocalRoutes } from "@/config/localRoutes";
import { axiosClient } from "@/helpers/axios-client";
import { Base } from "@/layouts/Base";
import BagdeImage from "@/public/assets/images/badge.png";

import { BadgeCard } from "../../../components/badge/Card";
import ModalClaim from "./ModalClaim";

type PageProps = {
  email_data: string;
  badge_data: string;
};

const Claim: NextPage<PageProps> = ({ email_data, badge_data }) => {
  // const Claim: NextPage = () => {
  const address = useAddress();
  const router = useRouter();

  const claimBadge = async () => {
    const wallet = global.window.ethereum;

    const payload = {
      email_data: email_data.split(" ").join("+"),
      badge_data: badge_data.split(" ").join("+"),
      // contract: "",
    };

    // @ts-ignore
    const provider = new providers.Web3Provider(wallet);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const contract_data_from_db = await axiosClient.post(
      apiRoutes.claimBadgeContractData,
      payload
    );
    const contractAddress = contract_data_from_db.data.data.contract;
    const badgeContract = new Contract(contractAddress, linkDotABI, signer);
    // @ts-ignore
    // const dataFromChain = await badgeContract.callStatic.claim("1");
    // console.log("dataFromChain: ", dataFromChain);
    // console.log("------------");
    const transaction_state_change = await badgeContract.claim("1");
    // console.log("transaction_state_change: ", transaction_state_change);
    // console.log("------------");
    const tx = await transaction_state_change.wait();

    console.log("tx: ", tx);

    // payload.contract = contractAddress;
    const response = await axiosClient.post(apiRoutes.claimBadge, payload);
    if (response.status === 200) {
      alert("Badge claimed successfully");
      console.log(`alert("Badge claimed successfully")`);

      router.push(LocalRoutes.dashboard);
    }
  };

  useEffect(() => {
    if (address) {
      // claimBadge();
    }
    console.log("address: ", address);
  }, [address]);

  return (
    <>
      <Base>
        {address && <ModalClaim claimBadge={claimBadge} />}
        <div className="m-auto flex h-full w-full">
          <div className="md:w-1/6"></div>
          <div className="w-full md:w-2/6">
            <p className="mb-3 w-full text-center text-xl font-bold text-green-500">
              Congratulations!
            </p>
            <BadgeCard>
              <div className="p-8">
                <Image className="blur-sm" src={BagdeImage} />
              </div>
            </BadgeCard>
          </div>
          <div className="w-full md:w-2/6"></div>
          {!address && (
            <div className="flex w-full flex-col justify-between md:w-2/6">
              <p className="mb-10 text-center text-sm">
                This Badge is issued to sample@email.com. Please connect the
                wallet to claim.
              </p>
              <Connect />
            </div>
          )}

          <div className="md:w-1/6"></div>
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
