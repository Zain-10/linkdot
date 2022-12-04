import Image from "next/image";

import profileFrame from "../../../../public/assets/svg/profilepic.svg";

const constants = [
  {
    id: 1,
    name: "0x3d3135",
    role: "Co-Founder of linkDOT",
    follwing: false,
  },
  {
    id: 2,
    name: "0xccd372",
    // eslint-disable-next-line prettier/prettier
    role: "Co-Founder of linkDOT",
    follwing: false,
  },
  {
    id: 3,
    name: "0x6B1BD5",
    role: "Co-Founder of linkDOT",
    follwing: false,
  },
  {
    id: 4,
    name: "0x8438F3",
    role: "Co-Founder of linkDOT",
    follwing: false,
  },
];

const CoreTeam = () => {
  return (
    <div className=" mb-6 rounded bg-gray-1300 p-4 pb-8">
      <h2 className="pb-2 text-sm font-bold text-black">
        &apos;Hey! So happy you&apos;ve joined our team!
      </h2>
      <p className="pb-4 text-[.625rem] font-normal text-black">
        A warm welcome from the devs behind the project
      </p>
      {constants.map((item) => (
        <div className="mb-4 flex items-center justify-between" key={item.id}>
          <div className="flex items-center">
            <Image
              src={profileFrame}
              alt="profile logo"
              className="!h-10 !w-10 min-w-0"
            />
            <div className="pl-4 ">
              <p className="text-sm font-bold text-black">{item.name}</p>
              <p className="font-noraml text-xs text-gray-1200">{item.role}</p>
            </div>
          </div>
          <button
            className={`'ml-4 flex h-8 min-w-[5.5rem] items-center justify-center rounded-sm border border-solid border-black py-2 text-xs font-bold ${
              item.follwing ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            {item.follwing ? "Following" : "Follow"}
          </button>
        </div>
      ))}
    </div>
  );
};

export { CoreTeam };
