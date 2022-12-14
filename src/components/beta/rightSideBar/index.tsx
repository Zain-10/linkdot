import axios from "axios";
import { useEffect, useMemo, useState } from "react";

import { ApiRoutes } from "@/config/betaApis";
import { Action, StatusCodes } from "@/constants";
import { useGlobalDispatch } from "@/context/global.context";

import { CoreTeam } from "./coreTeam";
import { TeamMembers } from "./teamMembers";

interface Props {
  currentUser: User;
}

const RightSideBar = ({ currentUser }: Props) => {
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [cofounders, setCofounders] = useState<User[]>([]);

  const dispatch = useGlobalDispatch();

  const handleFollow = async (userId: string) => {
    const url = ApiRoutes.FOLLOW_USER.replace(":id", currentUser.id);
    await axios
      .post(url, { userId })
      .then((response) => {
        if (response.status === StatusCodes.OK) {
          console.log("Successfully followed user");
          console.log(response.data);
          dispatch({ type: Action.SetUser, payload: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // fetch the recent users
  const fetchRecentUsers = async () => {
    const url = `${ApiRoutes.SEARCH_USER}?&limit=8&sort=createdAt&role=USER`; // will fetch the 8 most recent users
    const response = await axios.get(url);
    if (response.status === StatusCodes.OK) {
      setRecentUsers(response.data);
    }
  };
  // fetch the cofounders
  const fetchCofounders = async () => {
    const url = `${ApiRoutes.SEARCH_USER}?role=COFOUNDER&limit=4`; // will fetch the 4 most first users
    const response = await axios.get(url);
    if (response.status === StatusCodes.OK) {
      setCofounders(response.data);
    }
  };

  // remove the current user from the list of recent users
  const filteredUsers = useMemo(() => {
    return (users: User[]) => {
      return users.filter((user) => user.id !== currentUser.id);
    };
  }, [currentUser]);

  useEffect(() => {
    fetchRecentUsers();
    fetchCofounders();
  }, []);

  return (
    <div className="sticky top-[4.75rem] h-[calc(100vh-76px)] w-[21.875rem] shrink-0 grow-0 overflow-auto">
      <CoreTeam
        users={filteredUsers(cofounders)}
        currentUser={currentUser}
        followUser={handleFollow}
      />
      <TeamMembers
        users={filteredUsers(recentUsers)}
        currentUser={currentUser}
        followUser={handleFollow}
      />
    </div>
  );
};

export { RightSideBar };
