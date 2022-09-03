import type { NextPage } from "next";
import { useState } from "react";

import { Tab } from "@/components/tab";
import { ClaimTable } from "@/components/table/ClaimTable";
import { IssuedTable } from "@/components/table/IssueTable";
import { BadgeType } from "@/constants/badge";
import { Main } from "@/layouts/Main/Main";

const Insights: NextPage = () => {
  const TabList: BadgeType[] = Object.values(BadgeType);
  const [activeTab, setActiveTab] = useState<BadgeType>(BadgeType.ISSUED);

  const onChange = (tabItem: BadgeType) => {
    setActiveTab(tabItem);
  };

  return (
    <Main>
      <Tab tabList={TabList} onChangeCallBack={onChange} activeTab={activeTab}>
        {activeTab === BadgeType.ISSUED ? <IssuedTable /> : <ClaimTable />}
      </Tab>
    </Main>
  );
};
export default Insights;
