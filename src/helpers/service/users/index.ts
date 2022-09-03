import { apiRoutes } from "@/config/apiRoutes";
import { axiosWrapper } from "@/helpers/axios-wrapper";

async function getUserData() {
  // const response = await axios.get(
  //   "https://62ef5bcd8d7bc7c2eb789079.mockapi.io/users/1"
  // );
  // return response.data;
  return axiosWrapper.get({ url: apiRoutes.getUser });
}

export const userService = { getUserData };
