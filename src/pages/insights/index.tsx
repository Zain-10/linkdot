import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { Tab } from "@/components/tab";
import { ClaimTable } from "@/components/table/ClaimTable";
import { IssuedTable } from "@/components/table/IssueTable";
import { BadgeType } from "@/constants/badge";
import { badgeService } from "@/helpers/service/badge";
import { Main } from "@/layouts/Main/Main";

const Insights: NextPage = () => {
  const [badges, setBadges] = useState<NTTBadge[]>();
  const TabList: BadgeType[] = Object.values(BadgeType);
  const [activeTab, setActiveTab] = useState<BadgeType>(BadgeType.ISSUED);

  const onChange = (tabItem: BadgeType) => {
    setActiveTab(tabItem);
  };
  const fetchBadgesByType = async (badgeType: BadgeType) => {
    const response = await badgeService.getBadges(badgeType);
    if (response) {
      const newBadges =
        activeTab === BadgeType.ISSUED
          ? // @ts-ignore
            [...response.badges_issued]
          : // @ts-ignore
            [...response.badges_earned.map((e) => e.badge_id)];
      setBadges(newBadges);
      console.log(badges);
    }
  };

  useEffect(() => {
    fetchBadgesByType(activeTab);
  }, [activeTab]);

  return (
    <Main>
      <Tab tabList={TabList} onChangeCallBack={onChange} activeTab={activeTab}>
        {activeTab === BadgeType.ISSUED ? <IssuedTable /> : <ClaimTable />}
      </Tab>
    </Main>
  );
};
export default Insights;
