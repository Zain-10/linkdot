import Image from "next/image";

import profileFrame from "../../../../public/assets/svg/profilepic.svg";
import { Follow } from "../followButton";

interface Props {
  users: User[];
  currentlyFollowing: User["id"][];
  followUser: (userId: User["id"]) => void;
}

const CoreTeam = ({ users, currentlyFollowing, followUser }: Props) => {
  return (
    <div className=" mb-6 rounded bg-gray-1300 p-4 pb-8">
      <h2 className="pb-2 text-sm font-bold text-black">
        &apos;Hey! So happy you&apos;ve joined our team!
      </h2>
      <p className="pb-4 text-[.625rem] font-normal text-black">
        A warm welcome from the devs behind the project
      </p>
      {users.map((user) => (
        <div className="mb-4 flex items-center justify-between" key={user.id}>
          <div className="flex items-center">
            <Image
              src={profileFrame}
              alt="profile logo"
              className="!h-10 !w-10 min-w-0"
            />
            <div className="pl-4 ">
              <p className="text-sm font-bold text-black">
                {user.name ? user.name : user.walletId.slice(0, 8)}
              </p>
              <p className="font-noraml text-xs text-gray-1200">
                {"Co-Founder of linkDOT"}
              </p>
            </div>
          </div>
          <Follow
            following={currentlyFollowing.includes(user.id)}
            followUser={followUser}
            userId={user.id}
          />
        </div>
      ))}
    </div>
  );
};

export { CoreTeam };
