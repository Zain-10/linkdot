import axios from "axios";

import { ApiRoutes } from "@/config/betaApis";

const followUser = async (
  currentUserId: User["id"],
  followUserId: User["id"]
) => {
  const url = ApiRoutes.FOLLOW_USER.replace(":id", currentUserId);
  await axios
    .post(url, { userId: followUserId })
    .then((response) => {
      console.log("Successfully followed user");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return null;
};

export { followUser };
