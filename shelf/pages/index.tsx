import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

import { Button } from "@/components/button";
import { LocalRoutes } from "@/config/localRoutes";
import { BadgeType } from "@/constants/badge";
import { badgeService } from "@/helpers/service/badge";
import { BadgeList } from "shelf/components/badge/BadgeList";
import { NoBadge } from "shelf/components/badge/NoBadge";
import { Main } from "shelf/components/layouts/Main/Main";
import { Tab } from "shelf/components/tab";

const Dashboard: NextPage = () => {
  const [badges, setBadges] = useState<NTTBadge[]>([]);
  const TabList: BadgeType[] = Object.values(BadgeType);
  const [activeTab, setActiveTab] = useState<BadgeType>(BadgeType.ISSUED);

  const onChange = (tabItem: BadgeType) => {
    setActiveTab(tabItem);
  };

  const getBadgesByType = async (badgeType: BadgeType) => {
    const response = await badgeService.getBadges(badgeType);
    if (response) {
      const newBadges =
        activeTab === BadgeType.ISSUED
          ? // @ts-ignore
            [...response.badges_issued]
          : // @ts-ignore
            [...response.badges_earned.map((e) => e.badge_id)];
      setBadges(newBadges);
    }
  };

  useEffect(() => {
    console.log("acive tabe changed");

    getBadgesByType(activeTab);
  }, [activeTab]);

  return (
    <Main>
      <Tab tabList={TabList} onChangeCallBack={onChange} activeTab={activeTab}>
        <div className="h-[calc(100vh-150px)] overflow-auto pt-7">
          <Scrollbars>
            {badges?.length !== 0 && <BadgeList badgeList={badges} />}
            {badges?.length === 0 && activeTab === BadgeType.ISSUED && (
              <NoBadge>
                <div>
                  <p>
                    You are almost there! <br />
                    Start issuing your first PoAC badges for your community.
                  </p>

                  <Link href={LocalRoutes.badge.create}>
                    <div className="mx-auto mt-6 w-1/2">
                      <Button
                        boxShadowVariant={2}
                        borderWidth={"2px"}
                        outerBoxShadowColor="#A58E09"
                      >
                        <span className="p-2 font-semibold">Create Badge</span>
                      </Button>
                    </div>
                  </Link>
                </div>
              </NoBadge>
            )}
            {badges?.length === 0 && activeTab === BadgeType.CLAIMED && (
              <NoBadge>
                <div>
                  <p>You don&apos;t have any claimed badges yet!</p>
                </div>
              </NoBadge>
            )}
          </Scrollbars>
        </div>
      </Tab>
    </Main>
  );
};

export default Dashboard;
