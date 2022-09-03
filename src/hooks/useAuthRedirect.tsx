import { useRouter } from "next/router";

import { LocalRoutes } from "@/config/localRoutes";

function useAuthRedirect(user: User) {
  const router = useRouter();
  if (!user.category) router.push(LocalRoutes.authSelectCategory);
  if (!user.user_name) router.push(LocalRoutes.authSetUserName);
  if (!user.email) router.push(LocalRoutes.authSetEmail);
  return router.push(LocalRoutes.dashboard);
}

export { useAuthRedirect };
