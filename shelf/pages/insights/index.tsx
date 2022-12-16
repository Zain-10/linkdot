import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { BadgeType } from "@/constants/badge";
import { badgeService } from "@/helpers/service/badge";
import { Main } from "shelf/components/layouts/Main/Main";
import { Tab } from "shelf/components/tab";
import { ClaimTable } from "shelf/components/table/ClaimTable";
import { IssuedTable } from "shelf/components/table/IssueTable";

const NoDataAVailable = () => <div>No Data Available</div>;

const Insights: NextPage = () => {
  const [issuedBadges, setIssuedBadges] = useState<NTTBadge[]>();
  const [claimedBadges, setIssuedClaimedBadges] = useState<NTTBadge[]>();
  const TabList: BadgeType[] = Object.values(BadgeType);
  const [activeTab, setActiveTab] = useState<BadgeType>(BadgeType.ISSUED);

  const onChange = (tabItem: BadgeType) => {
    setActiveTab(tabItem);
  };
  const fetchBadgesByType = async (badgeType: BadgeType) => {
    const response = await badgeService.getBadges(badgeType);
    if (response) {
      if (badgeType === BadgeType.ISSUED) {
        // @ts-ignore
        setIssuedBadges(response.badges_issued);
      } else {
        // @ts-ignore
        setIssuedClaimedBadges(response.badges_earned);
      }
    }
  };

  useEffect(() => {
    fetchBadgesByType(activeTab);
  }, [activeTab]);

  return (
    <Main>
      <Tab tabList={TabList} onChangeCallBack={onChange} activeTab={activeTab}>
        {/* ************************************** */}
        <>
          {activeTab === BadgeType.ISSUED && (
            <>
              {issuedBadges ? (
                <IssuedTable badges={issuedBadges} />
              ) : (
                <NoDataAVailable />
              )}
            </>
          )}
          {/* *************************************** */}
          {activeTab === BadgeType.CLAIMED && (
            <>
              {claimedBadges ? (
                <ClaimTable badges={claimedBadges} />
              ) : (
                <NoDataAVailable />
              )}
            </>
          )}
          {/* *************************************** */}
        </>
      </Tab>
    </Main>
  );
};
export default Insights;
