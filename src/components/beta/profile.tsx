import Image from "next/image";

import badgeImage from "../../../public/assets/images/badgeImage.png";
import profileLogo from "../../../public/assets/svg/profileLogo.svg";

const constants = [
  {
    id: 1,
    image: badgeImage,
    name: "2022 Go Ethereum Contributor",
    ownerName: "Go-ethereum",
    date: "Oct 2022",
  },
  {
    id: 2,
    image: badgeImage,
    name: "2022 Go Ethereum Contributor",
    ownerName: "Go-ethereum",
    date: "Oct 2022",
  },
  {
    id: 3,
    image: badgeImage,
    name: "2022 Go Ethereum Contributor",
    ownerName: "Go-ethereum",
    date: "Oct 2022",
  },
];
const Profile = () => {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="profileWrapper mr-4 h-full w-full">
      <div className="profileCard relative !h-[8rem] w-full rounded">
        <div className="absolute bottom-[-2.406rem] left-3">
          <Image src={profileLogo} alt="profile logo" />
        </div>
      </div>
      <div className="px-3 pt-12 pb-6">
        <h2 className="max-w-[10.563rem] truncate text-lg font-normal leading-5 text-black">
          0x6b1bd5erfgt53ddddddddd
        </h2>
        <div className="pt-4">
          <div className="mb-4 flex items-center">
            <div className="mr-5 flex items-center">
              {/* <SVGIcon name="ethereumicon"></SVGIcon> */}
              <p className="p-2 text-xs font-normal leading-[0.875rem] text-gray-1200">
                Ethereum
              </p>
            </div>
            <div className="mr-5 flex items-center">
              {/* <SVGIcon name="calendaricon"></SVGIcon> */}
              <p className="p-2 text-xs font-normal leading-[0.875rem] text-gray-1200">
                November 2022
              </p>
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <div className="mr-5 flex items-center">
              <p className="text-xs font-normal leading-[0.875rem] text-gray-1200">
                0
              </p>
              <p className="p-2 text-xs font-normal leading-[0.875rem] text-gray-1200">
                Following
              </p>
            </div>
            <div className="mr-5 flex items-center">
              <p className="text-xs font-normal leading-[0.875rem] text-gray-1200">
                0
              </p>
              <p className="p-2 text-xs font-normal leading-[0.875rem] text-gray-1200">
                Followers
              </p>
            </div>
          </div>
          <button className="flex h-8 min-w-[12rem] items-center justify-center border-2 border-solid border-black py-2 text-xs font-bold leading-[0.875rem] text-black hover:bg-black hover:text-white">
            Share
          </button>
        </div>
      </div>
      <div className="pb-6">
        <div className="solid flex items-center overflow-hidden border-b border-b-gray-1400">
          <button className="solid mr-3 min-w-[3.75rem] border-b-2 border-b-gray-1400 p-1.5 text-base font-bold text-black">
            PoAPs
          </button>
          <button className="mr-3 min-w-[3.75rem] p-1.5 text-base font-bold text-black opacity-30">
            NFT
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 py-4 xl:grid-cols-2">
          {constants.map((item) => (
            <div
              className="rounded border border-solid border-black"
              key={item.id}
            >
              <div className="badge-card h-44  w-full overflow-hidden rounded-t object-contain">
                <Image
                  src={item.image}
                  alt="badge image"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="rounded-b border-t border-solid border-black px-4 pt-2.5 pb-4">
                <h2 className="mb-1.5 text-sm font-bold text-black">
                  {item.name}
                </h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* <SVGIcon name="badgeindicationicon"></SVGIcon> */}
                    <p className="ml-2 text-xs font-normal text-gray-1600">
                      {item.ownerName}
                    </p>
                  </div>
                  <p className=" text-xs font-normal text-gray-1600">
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Profile };
