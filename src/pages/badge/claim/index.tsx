import { useAddress } from "@thirdweb-dev/react";
import { Contract, providers } from "ethers";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { abi } from "@/../artifacts/contracts/LinkDotContract.sol/LinkDotContract.json";
import { ClaimComponent } from "@/components/badge/claim";
import { Badge } from "@/components/badge/NTTBadge";
import { Connect } from "@/components/connect";
import { apiRoutes } from "@/config/apiRoutes";
import { LocalRoutes } from "@/config/localRoutes";
import { axiosClient } from "@/helpers/axios-client";
import { getIPFSGatewayURL } from "@/helpers/utils/ipfs";
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

  useEffect(() => {
    // Fetch Badge data
    if (address) {
      (async () => {
        const payload = { badge: badge_data.split(" ").join("+") };
        const url = `${apiRoutes.badgeDetailByEncryptedId}`;
        const response = await axiosClient.post(url, payload);
        console.log("encrypt badge: ", badge);

        // @ts-ignore
        setBadge(response?.data?.data);
      })();
    }
  }, [address]);

  return (
    <>
      <Base>
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
