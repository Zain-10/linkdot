import { useAddress } from "@thirdweb-dev/react";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Connect } from "@/components/connect";
import { apiRoutes } from "@/config/apiRoutes";
import { LocalRoutes } from "@/config/localRoutes";
import { Badges } from "@/fixtures/badges";
import { axiosClient } from "@/helpers/axios-client";
import { getIPFSGatewayURL } from "@/helpers/utils/ipfs";
import { Base } from "@/layouts/Base";

import { BadgeCard } from "../../../components/badge/Card";
import { Badge } from "../../../components/badge/NTTBadge";

type PageProps = {
  email_data: string;
  badge_data: string;
};

const Claim: NextPage<PageProps> = ({ email_data, badge_data }) => {
  const [badge, setBadge] = useState<NTTBadge>();
  const address = useAddress();
  const router = useRouter();

  const claimBadge = async () => {
    const payload = {
      email_data: email_data.split(" ").join("+"),
      badge_data: badge_data.split(" ").join("+"),
    };
    const response = await axiosClient.post(apiRoutes.claimBadge, payload);
    if (response.status === 200) {
      alert("Badge claimed successfully");
      router.push(LocalRoutes.dashboard);
    }
  };

  useEffect(() => {
    if (address) {
      claimBadge();
    }
  }, [address]);

  useEffect(() => {
    setBadge(Badges[0]);
  }, []);
  return (
    <Base>
      <div className="m-auto flex h-full w-full">
        <div className="md:w-1/6"></div>
        <div className="w-full md:w-2/6">
          <p className="mb-3 w-full text-center text-xl font-bold text-green-500">
            Congratulations!
          </p>
          <BadgeCard>
            <div className="p-6">
              {badge && (
                <Badge
                  type={badge.badge_type}
                  name={badge.name}
                  createdDate={badge.created_at}
                  description={badge.description}
                  image={getIPFSGatewayURL(badge.ipfs_data.ipfs_nft)}
                />
              )}
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
