import type { BadgeType } from "@/constants/badge";

interface TabListItemProps {
  active: boolean;
  callback: (key: BadgeType) => void;
  name: BadgeType;
}

const TabHeaderItem = ({ active, callback, name }: TabListItemProps) => (
  <li className="mr-2">
    <a
      className={`${
        active ? "border-white" : "border-transparent"
      } mr-10 inline-block cursor-pointer  rounded-t-lg border-b-4 px-4 py-2 pl-0 font-poppins-regular text-sm ease-in-out`}
      onClick={() => callback(name)}
    >
      {name}
    </a>
  </li>
);

export { TabHeaderItem };
