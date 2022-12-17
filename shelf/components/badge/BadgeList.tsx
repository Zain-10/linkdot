import { getIPFSGatewayURL } from "@/helpers/utils/ipfs";

import { Button } from "../../../src/components/button";
import { IssueToUserLink } from "../button/IssurToUser";
import { BadgeInsightLink } from "../button/BadgeInsight";
import { BadgeCard } from "./Card";
import { Badge } from "./NTTBadge";

interface BadgeListProps {
  badgeList: NTTBadge[];
}

const BadgeList = ({ badgeList }: BadgeListProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-2  md:gap-x-24 lg:grid-cols-3 lg:gap-6">
      {badgeList.map(
        ({
          _id,
          name,
          badge_type,
          description,
          created_at,
          ipfs_data,
        }: NTTBadge) => (
          <BadgeCard key={`${Math.random()}-${_id}`}>
            <div className="flex flex-col p-6 ">
              <div className="mb-4">
                <Badge
                  _id={_id}
                  name={name}
                  type={badge_type}
                  description={description}
                  image={getIPFSGatewayURL(ipfs_data.ipfs_nft)}
                  createdDate={created_at}
                />
              </div>
              <div className="grid h-full w-full grid-cols-2 gap-4">
                <BadgeInsightLink _id={_id} />
                <IssueToUserLink _id={_id}>
                  <div className="min-h-8">
                    <Button
                      boxShadowVariant={2}
                      outerBoxShadowColor="#FFFFFF"
                      borderWidth="2px"
                      textColor="black"
                      backgroundColor="#FFFFFF"
                    >
                      <span className="min-h-8 w-full p-2 text-center md:text-xs">
                        Issue To User
                      </span>
                    </Button>
                  </div>
                </IssueToUserLink>
              </div>
            </div>
          </BadgeCard>
        )
      )}
    </div>
  );
};

export { BadgeList };
