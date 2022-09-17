import { LocalRoutes } from "@/config/localRoutes";

function authRedirectPage(user: User): string | null {
  if (!user?.category) return LocalRoutes.authSelectCategory;
  if (!user?.user_name) return LocalRoutes.authSetUserName;
  if (!user?.email) return LocalRoutes.authSetEmail;
  return null;
}

const fallbackToAuthPath = (user: User, callBackPath: string) => {
  // TODO: needs to be refactored
  // possible cases:
  // 1. user category is not set
  // 2. user name is not set
  // 3. user email is not set
  // 4. user is fully set up

  if (user?.category && user?.user_name && user?.email) return callBackPath;
  if (!user?.category) return LocalRoutes.authSelectCategory;
  if (!user?.user_name) return LocalRoutes.authSetUserName;
  if (!user?.email) return LocalRoutes.authSetEmail;
  return LocalRoutes.dashboard;
};

export { authRedirectPage, fallbackToAuthPath };
