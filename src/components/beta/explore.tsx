import Image from "next/image";

import profileFrame from "../../../public/assets/svg/profilepic.svg";

const constants = [
  {
    id: 1,
    name: "0x6b1bd5",
    role: "Co-Founder of linkDOT",
  },
  {
    id: 2,
    name: "0x6b1bd5",
    role: "Co-Founder of linkDOT",
  },
];

const Explore = () => {
  return (
    <div className=" mr-4 h-full w-full">
      <div className="mb-6">
        {constants.map((item) => (
          <div className="mb-4 flex items-center justify-between" key={item.id}>
            <div className="flex items-center">
              <Image
                src={profileFrame}
                alt="profile logo"
                className="!h-10 !w-10 min-w-0"
              />
              <div className="pl-4">
                <p className="text-sm font-bold text-black">{item.name}</p>
                <p className="font-noraml text-xs text-gray-1200">
                  {item.role}
                </p>
              </div>
            </div>
            <button className="ml-4 flex h-8 min-w-[5.5rem] items-center justify-center rounded-sm border border-solid border-black bg-black py-2 text-xs  font-bold text-white">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Explore };
