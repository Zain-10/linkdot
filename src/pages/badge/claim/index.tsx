import { useAddress } from "@thirdweb-dev/react";
import { Contract, providers } from "ethers";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

import { abi } from "@/../artifacts/contracts/LinkDotContract.sol/LinkDotContract.json";
import { BadgeCard } from "@/components/badge/Card";
import ClaimModal from "@/components/badge/claim/ModalClaim";
import { Button } from "@/components/button";
import { Connect } from "@/components/connect";
import { apiRoutes } from "@/config/apiRoutes";
import { LocalRoutes } from "@/config/localRoutes";
import { axiosClient } from "@/helpers/axios-client";
import { Base } from "@/layouts/Base";
import BagdeImage from "@/public/assets/images/badge.png";

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
      toast("Badge claimed successfully");
      console.log(`alert("Badge claimed successfully")`);

      router.push(LocalRoutes.dashboard);
    }
  };

  return (
    <>
      <Base>
        <div className="flex h-full w-full flex-1 content-center justify-center border-gray-400">
          <div className="m-auto">
            <div
              className="flex border border-gray-400 p-8"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.06);" }}
            >
              <div className="w-1/3">
                <Image className="blur-sm" src={BagdeImage} />
              </div>
              <div className="flex w-2/3 flex-col justify-between py-10 pl-10 text-center">
                <h1 className="text-3xl font-bold">Claim your Badge</h1>
                <p className="text-base font-light">
                  Do you want to claim this badge?
                </p>
                {address && (
                  <>
                    <p className="text-xs font-light">
                      This badge will be sent to wallet id
                    </p>
                    <p className="text-xs font-light text-[#4EABEA]">
                      {address}
                    </p>
                  </>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    boxShadowVariant={2}
                    outerBoxShadowColor={"#FFFFFF"}
                    borderWidth={"2px"}
                  >
                    <span className="p-2">
                      <Link href={LocalRoutes.dashboard}>Go To Dashboard</Link>
                    </span>
                  </Button>
                  <Button
                    boxShadowVariant={2}
                    outerBoxShadowColor={"#FFFFFF"}
                    borderWidth={"2px"}
                    backgroundColor={"#FFFFFF"}
                    textColor={"#000000"}
                  >
                    <span className="p-2 text-base font-medium">Claim</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {address && <ClaimModal claimBadge={claimBadge} />}
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
              <Toaster />
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
