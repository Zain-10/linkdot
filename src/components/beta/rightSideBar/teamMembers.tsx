import moment from "moment";
import Image from "next/image";

import profileFrame from "../../../../public/assets/svg/profilepic.svg";
import { Follow } from "../followButton";

interface Props {
  users: User[];
  currentUser: User;
  followUser: (userId: string) => void;
}

const TeamMembers = ({ users, currentUser, followUser }: Props) => {
  return (
    <div className=" mb-6 rounded bg-gray-1300 p-4 pb-8">
      <h2 className="pb-4 text-sm font-bold text-black">You might like</h2>
      {users.map((user) => (
        <div className="mb-4 flex items-center justify-between" key={user.id}>
          <div className="flex items-center">
            <Image
              src={profileFrame}
              alt="profile logo"
              className="!h-10 !w-10 min-w-0"
            />
            <div className="pl-4">
              <p className="text-sm font-bold text-black">
                {user.walletId.slice(0, 8)}
              </p>
              <p className="font-noraml text-xs text-gray-1200">
                {moment(user.createdAt).format("MMM YYYY")}
              </p>
            </div>
          </div>
          {/* if the user already following */}

          <Follow
            following={currentUser.followingIDs.includes(user.id)}
            followUser={followUser}
            userId={user.id}
          />
        </div>
      ))}
    </div>
  );
};

export { TeamMembers };
