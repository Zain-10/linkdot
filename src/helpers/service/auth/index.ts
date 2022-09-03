import { apiRoutes } from "@/config/apiRoutes";
import { axiosWrapper } from "@/helpers/axios-wrapper";

async function setUserName({
  user_name,
  wallet_id,
}: Pick<User, "user_name" | "wallet_id">) {
  return axiosWrapper.post({
    url: apiRoutes.setUsername,
    payload: { wallet_id, user_name },
  });
}

async function setEmail({
  email,
  wallet_id,
}: Pick<User, "email" | "wallet_id">) {
  return axiosWrapper.post({
    url: apiRoutes.saveEmail,
    payload: { email, wallet_id },
  });
}
export const authService = { setUserName, setEmail };
