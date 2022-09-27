import { apiRoutes } from "@/config/apiRoutes";
import { axiosWrapper } from "@/helpers/axios-wrapper";

async function getUserData() {
  return axiosWrapper.get({ url: apiRoutes.getUser });
}

export const userService = { getUserData };
