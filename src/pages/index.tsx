import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

import { BadgeList } from "@/components/badge/BadgeList";
import { NoBadge } from "@/components/badge/NoBadge";
import { Tab } from "@/components/tab";
import { BadgeType } from "@/constants/badge";
import { badgeService } from "@/helpers/service/badge";
import { Main } from "@/layouts/Main/Main";

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
      {badges?.length ? (
        <Tab
          tabList={TabList}
          onChangeCallBack={onChange}
          activeTab={activeTab}
        >
          <div className="h-[calc(100vh-150px)] overflow-auto  pt-7">
            <Scrollbars>
              <BadgeList badgeList={badges} />
            </Scrollbars>
          </div>
        </Tab>
      ) : (
        <NoBadge />
      )}
    </Main>
  );
};

export default Dashboard;
