import Image from "next/image";

import logo from "@/public/assets/svg/logoBlack.svg";

const constants = [
  {
    id: 1,
    name: "Profile",
    iconName: "usericon",
  },
  {
    id: 2,
    name: "Explore",
    iconName: "hashicon",
  },
  {
    id: 3,
    name: "Need Badge",
    iconName: "badgeicon",
    comingSoon: true,
  },
  {
    id: 4,
    name: "Notification",
    iconName: "bellicon",
    comingSoon: true,
  },
  {
    id: 5,
    name: "Message",
    iconName: "messageicon",
    comingSoon: true,
  },
];

const SideBarBeta = () => {
  return (
    <div className="sticky top-0 flex h-screen w-[16.875rem] flex-col items-center justify-between bg-gray-1100 p-8">
      <div className="pt-11">
        {constants.map((item) => (
          // eslint-disable-next-line react/jsx-key
          <button
            className={`mb-6 flex items-center text-black opacity-50 hover:opacity-100 ${
              item.comingSoon ? "pointer-events-none opacity-20" : ""
            }`}
            key={item.id}
          >
            {/* <SVGIcon name={item.iconName}></SVGIcon> */}
            <p className="pl-6  text-lg font-bold leading-5">{item.name}</p>
          </button>
        ))}
      </div>
      <div>
        <Image src={logo} alt="logo" />
      </div>
    </div>
  );
};

export { SideBarBeta };
