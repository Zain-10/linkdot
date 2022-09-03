import type { NextPage } from "next";
import { useEffect, useState } from "react";

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
    // setBadges([...badges], response.data?.data.badges_issued);
    if (response && activeTab === BadgeType.ISSUED) {
      // @ts-ignore
      setBadges([...response.badges_issued]);
      console.log("badges:", badges);
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
          <div className="h-full pt-7">
            {activeTab === BadgeType.ISSUED ? (
              <BadgeList badgeList={badges} />
            ) : (
              <BadgeList badgeList={badges} />
            )}
          </div>
        </Tab>
      ) : (
        <NoBadge />
      )}
    </Main>
  );
};

export default Dashboard;
