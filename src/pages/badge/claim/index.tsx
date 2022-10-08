import { useAddress } from "@thirdweb-dev/react";
import { Contract, providers } from "ethers";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { abi } from "@/../artifacts/contracts/LinkDotContract.sol/LinkDotContract.json";
import ModalClaim from "@/components/badge/claim/ModalClaim";
import { Connect } from "@/components/connect";
import { apiRoutes } from "@/config/apiRoutes";
import { LocalRoutes } from "@/config/localRoutes";
import { axiosClient } from "@/helpers/axios-client";
import { Base } from "@/layouts/Base";
import BagdeImage from "@/public/assets/images/badge.png";

import { BadgeCard } from "../../../components/badge/Card";

type PageProps = {
  email_data: string;
  badge_data: string;
};

const Claim: NextPage<PageProps> = ({ email_data, badge_data }) => {
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

    const contractDataFromDb = await axiosClient.post(
      apiRoutes.claimBadgeContractData,
      payload
    );
    const contractAddress = contractDataFromDb.data.data.contract;
    const badgeContract = new Contract(contractAddress, abi, signer);
    const transactionStateShange = await badgeContract.claim();
    const tx = await transactionStateShange.wait();

    console.log("tx: ", tx);

    const response = await axiosClient.post(apiRoutes.claimBadge, payload);
    if (response.status === 200) {
      alert("Badge claimed successfully");
      console.log(`alert("Badge claimed successfully")`);

      router.push(LocalRoutes.dashboard);
    }
  };

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
