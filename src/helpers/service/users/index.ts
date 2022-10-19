import { apiRoutes } from "@/config/apiRoutes";
import { axiosWrapper } from "@/helpers/axios-wrapper";

async function getUserData() {
  return axiosWrapper.get({ url: apiRoutes.getUser });
}

async function updateUser(payload: any) {
  return axiosWrapper.patch({ url: apiRoutes.updateUser, payload });
}

export const userService = { getUserData, updateUser };
