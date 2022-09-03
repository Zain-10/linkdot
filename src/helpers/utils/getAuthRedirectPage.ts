import { LocalRoutes } from "@/config/localRoutes";

function authRedirectPage(user: User): string | null {
  if (!user?.category) return LocalRoutes.authSelectCategory;
  if (!user?.user_name) return LocalRoutes.authSetUserName;
  if (!user?.email) return LocalRoutes.authSetEmail;
  return null;
}

export { authRedirectPage };
