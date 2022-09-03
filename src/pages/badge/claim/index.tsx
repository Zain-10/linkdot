import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { Connect } from "@/components/connect";
import { Badges } from "@/fixtures/badges";
import { getIPFSGatewayURL } from "@/helpers/utils/ipfs";
import { Base } from "@/layouts/Base";

import { BadgeCard } from "../../../components/badge/Card";
import { Badge } from "../../../components/badge/NTTBadge";

const Claim: NextPage = () => {
  const [badge, setBadge] = useState<NTTBadge>();

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
        <div className="flex w-full flex-col justify-between md:w-2/6">
          <p className="mb-10 text-center text-sm">
            This Badge is issued to sample@email.com. Please connect the wallet
            to claim.
          </p>
          <Connect />
        </div>
        <div className="md:w-1/6"></div>
      </div>
    </Base>
  );
};

export default Claim;
