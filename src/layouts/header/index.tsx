import { useUserState } from "@/context/global.context";

import { HeaderLinks } from "./HeaderLinks";
import { UserLogo } from "./UserLogo";

export const Header = () => {
  const user = useUserState();
  console.log(user);

  return (
    <header className="min-h-12 mb-6 flex items-center justify-between">
      <UserLogo username={user?.user_name} />
      <HeaderLinks />
    </header>
  );
};
