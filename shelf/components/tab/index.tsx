import React from "react";

import type { BadgeType } from "@/constants/badge";

import { TabHeaderItem } from "./TabHeadItem";

interface TabProps extends React.PropsWithChildren {
  tabList: BadgeType[];
  onChangeCallBack: (tabKey: BadgeType) => void;
  activeTab: BadgeType;
}

export const Tab = ({
  children,
  tabList,
  onChangeCallBack,
  activeTab,
}: TabProps) => {
  return (
    <div className="flex-1 border-gray-200 text-center text-sm  font-medium dark:border-gray-700 dark:text-gray-400">
      <ul className="-mb-px flex flex-wrap">
        {tabList.map((e) => (
          <TabHeaderItem
            key={e}
            name={e}
            active={e === activeTab}
            callback={onChangeCallBack}
          />
        ))}
      </ul>
      {children}
    </div>
  );
};
