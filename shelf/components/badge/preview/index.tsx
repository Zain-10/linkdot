import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/button";
import { IssueToUserLink } from "@/components/button/IssurToUser";
import { LocalRoutes } from "@/config/localRoutes";
import { badgeService } from "@/helpers/service/badge";
import { getIPFSGatewayURL } from "@/helpers/utils/ipfs";

import { BadgeCard } from "../Card";
import { Badge } from "../NTTBadge";

const PreviewBadge = ({ _id }: Pick<NTTBadge, "_id">) => {
  const [badge, setBadge] = useState<NTTBadge>();

  const getBadge = async (_id: string) => {
    const badge = await badgeService.getBadgeDetail(_id);
    // @ts-ignore
    setBadge(badge?.data);
  };

  useEffect(() => {
    getBadge(_id);
  }, []);
  return (
    <>
      {badge ? (
        <>
          <BadgeCard>
            <div className="p-6">
              <Badge
                type={badge.badge_type}
                name={badge.name}
                createdDate={badge.created_at}
                description={badge.description}
                image={getIPFSGatewayURL(badge.ipfs_data.ipfs_nft)}
              />
            </div>
          </BadgeCard>
          {/* Badge Actions */}
          <div className="mt-4 grid w-full grid-cols-2 gap-4">
            <Link href={LocalRoutes.dashboard}>
              <div className="h-14">
                <Button
                  boxShadowVariant={1}
                  outerBoxShadowColor="#FFFFFF"
                  innerBoxShadowColor="#FFFFFF"
                  textColor="white"
                >
                  <span className="w-full px-3 py-2">Issue Later</span>
                </Button>
              </div>
            </Link>
            <IssueToUserLink _id={_id}>
              <div className="h-14">
                <Button
                  boxShadowVariant={1}
                  outerBoxShadowColor="#FFFFFF"
                  innerBoxShadowColor="#FFFFFF"
                  textColor="#FFFFFF"
                  backgroundColor="#4E5EDE"
                >
                  <span className="w-full px-3 py-2">Issue To User</span>
                </Button>
              </div>
            </IssueToUserLink>
          </div>
          {/* Badge Actions */}
        </>
      ) : (
        <div>Badge Information Not Available</div>
      )}
    </>
  );
};

export { PreviewBadge };
