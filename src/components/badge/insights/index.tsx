import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/button";
import { IssueToUserLink } from "@/components/button/IssurToUser";
import { LocalRoutes } from "@/config/localRoutes";
import { badgeService } from "@/helpers/service/badge";
import { getIPFSGatewayURL } from "@/helpers/utils/ipfs";

import styles from "../badge.module.css";
import { BadgeCard } from "../Card";
import { Badge } from "../NTTBadge";
import { BadgeDetails } from "./BadgeDetail";

const BadgeInsight = ({ _id }: Pick<NTTBadge, "_id">) => {
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
      <Link href={LocalRoutes.dashboard}>
        <span className="cursor-pointer text-sm text-gray-600">
          Back To Dashboard
        </span>
      </Link>
      <div className="mt-9 h-full">
        <div className="flex">
          {badge ? (
            <>
              <div className="flex w-full flex-col justify-between md:w-1/2">
                <div>
                  <p
                    className={`${styles.gradient_text} mb-4 text-base font-semibold`}
                  >
                    {`${badge?.badge_type}#${moment(badge?.created_at).format(
                      "MMMYYYY"
                    )}`}
                  </p>
                  <p className="mb-6 text-3xl font-bold">{badge?.name}</p>
                  <p className="text-xl font-normal">{badge?.description} </p>
                </div>
                <BadgeDetails />
              </div>
              <div className="w-full md:w-1/2 md:pl-44">
                <BadgeCard>
                  <div className="py-6 px-16">
                    <Badge
                      _id={badge._id}
                      type={badge.badge_type}
                      name={badge.name}
                      createdDate={badge.created_at}
                      description={badge.description}
                      image={getIPFSGatewayURL(badge.ipfs_data.ipfs_nft)}
                    />
                    <div className="mt-4">
                      <IssueToUserLink _id={badge._id}>
                        <Button
                          boxShadowVariant={2}
                          outerBoxShadowColor="#FFFFFF"
                          borderWidth="2px"
                          textColor="black"
                          backgroundColor="#FFFFFF"
                        >
                          <span className="w-full px-3 py-2">
                            Issue To User
                          </span>
                        </Button>
                      </IssueToUserLink>
                    </div>
                  </div>
                </BadgeCard>
              </div>
            </>
          ) : (
            <div>Badge Information Is Not Available.</div>
          )}
        </div>
      </div>
    </>
  );
};

export { BadgeInsight };
