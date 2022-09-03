import { useRouter } from "next/router";

import Logo from "../Logo";
import { MenuItem } from "./MenuItem";

const SideMenu = () => {
  const router = useRouter();
  const routes = [
    { route: "Dashboard", path: "/" },
    { route: "Badge Insight", path: "/insights" },
  ];
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ul className="h-full">
        {routes.map(({ route, path }) => (
          <MenuItem
            key={route}
            name={route}
            active={router.pathname === path} // Checking whether url is current window url
            path={path}
          />
        ))}
      </ul>
      <div>
        <Logo />
      </div>
    </div>
  );
};

export { SideMenu };
