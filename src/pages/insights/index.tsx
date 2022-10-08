import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { Tab } from "@/components/tab";
import { ClaimTable } from "@/components/table/ClaimTable";
import { IssuedTable } from "@/components/table/IssueTable";
import { BadgeType } from "@/constants/badge";
import { badgeService } from "@/helpers/service/badge";
import { Main } from "@/layouts/Main/Main";

const Insights: NextPage = () => {
  const [issuedBadges, setIssuedBadges] = useState<NTTBadge[]>();
  const [claimedBadges, setIssuedClaimedBadges] = useState<NTTBadge[]>();
  const TabList: BadgeType[] = Object.values(BadgeType);
  const [activeTab, setActiveTab] = useState<BadgeType>(BadgeType.ISSUED);
  console.log(claimedBadges);
  const onChange = (tabItem: BadgeType) => {
    setActiveTab(tabItem);
  };
  const fetchBadgesByType = async (badgeType: BadgeType) => {
    const response = await badgeService.getBadges(badgeType);
    if (response) {
      const badges =
        activeTab === BadgeType.ISSUED
          ? // @ts-ignore
            [...response.badges_issued]
          : // @ts-ignore
            [...response.badges_earned.map((e) => e.badge_id)];
      return badges;
    }
    return [];
  };
  const fetchIssuedBadges = async () => {
    const badges = await fetchBadgesByType(BadgeType.ISSUED);
    setIssuedBadges(badges);
  };
  const fetchClaimedBadges = async () => {
    const badges = await fetchBadgesByType(BadgeType.CLAIMED);
    setIssuedClaimedBadges(badges);
  };
  useEffect(() => {
    fetchBadgesByType(activeTab);
  }, [activeTab]);

  useEffect(() => {
    fetchIssuedBadges();
    fetchClaimedBadges();
  }, []);
  return (
    <Main>
      <Tab tabList={TabList} onChangeCallBack={onChange} activeTab={activeTab}>
        {activeTab === BadgeType.ISSUED ? (
          <>
            {issuedBadges ? (
              <IssuedTable badges={issuedBadges} />
            ) : (
              <div>No Data Available</div>
            )}
          </>
        ) : (
          <ClaimTable />
        )}
      </Tab>
    </Main>
  );
};
export default Insights;
