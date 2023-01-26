import Image from "next/image";
import { useEffect, useState } from "react";

import { Action } from "@/constants";
import { useGlobalDispatch } from "@/context/global.context";
import profileFrame from "@/public/assets/svg/profilepic.svg";

import { Follow } from "./followButton";
import { followUser } from "./helpers/followUser";

interface Props {
  users: User[];
  address: string;
  currentUser: User;
  loaded: boolean;
}

const Explore = ({ users, address, currentUser, loaded }: Props) => {
  const [empty, setEmpty] = useState(false);
  const dispatch = useGlobalDispatch();

  const currentlyFollowing = currentUser.followingIDs;

  const handleFollow = async (userId: string) => {
    const user = await followUser(currentUser.id, userId);
    dispatch({ type: Action.SetUser, payload: user });
    // TODO: global state is not updating immediately, so we need to manually update the following list
    // Fix this by updating global state
    currentlyFollowing.push(userId);
  };

  useEffect(() => {
    setEmpty(users.length === 0 && loaded);
  }, [users]);

  if (empty) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <p className="text-2xl font-bold text-black">No matches found</p>
      </div>
    );
  }
  return (
    <div className=" mr-4 h-full w-full">
      <div className="mb-6">
        {users.map((user) => (
          <div className="mb-4 flex items-center justify-between" key={user.id}>
            <div className="flex items-center">
              <Image
                src={profileFrame}
                alt="profile logo"
                height={60}
                width={60}
              />
              <div className="pl-4">
                <p className="text-md font-bold text-black">
                  {user.name ? user.name : user.walletId}
                </p>
                <p className="text-sm font-normal text-gray-1200">
                  {user.role === "COFOUNDER"
                    ? "Co-Founder of linkDOT"
                    : user.role}
                </p>
              </div>
            </div>
            {/* <button className="ml-4 flex min-w-[5.5rem] items-center justify-center rounded-[3px] border border-solid border-black bg-black px-8 py-2 text-sm font-bold text-white">
              Follow
            </button> */}
            {user.walletId !== address && (
              // Do not show follow button if user is viewing their own profile
              <Follow
                userId={user.id}
                followUser={handleFollow}
                following={currentlyFollowing.includes(user.id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Explore };
