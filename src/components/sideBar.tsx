import Image from "next/image";
import { useRouter } from "next/router";

import { LocalRoutes } from "@/constants";
// import AwardSVG from "@/public/assets/svg/award.svg";
// import BellSVG from "@/public/assets/svg/bell.svg";
// import MessageSVG from "@/public/assets/svg/message-square.svg";
// import UserSVG from "@/public/assets/svg/user.svg";
import HashSVG from "@/public/assets/svg/hash.svg";
import HomeIcon from "@/public/assets/svg/home.svg";
import primaryLogo from "@/public/assets/svg/primaryLogo.svg";

import { MenuItem } from "./menuitem";

const SideBar = () => {
  // use active path to highlight the menu item
  const { pathname } = useRouter();

  return (
    <div className="sticky top-0 flex h-screen w-[220px] flex-col items-center justify-between bg-[#f2f2f282] p-8">
      <div className="pt-11">
        <div>
          <MenuItem
            title={"Explore"}
            route={LocalRoutes.EXPLORE}
            isActive={pathname === LocalRoutes.EXPLORE}
          >
            <Image src={HashSVG} alt="expolre" />
          </MenuItem>
        </div>
        <div>
          <MenuItem
            title={"Home"}
            route={LocalRoutes.PROFILE}
            isActive={pathname === LocalRoutes.PROFILE}
          >
            <Image src={HomeIcon} alt="user" />
          </MenuItem>
        </div>

        {/* Need to give condition based on wallet connected */}
        {/* <MenuItem title={"Need Badge"} disabled route={"/coming-soon"}>
          <Image src={AwardSVG} alt="badge" />
        </MenuItem>
        <MenuItem title={"Notification"} disabled route={"/coming-soon"}>
          <Image src={BellSVG} alt="notification" />
        </MenuItem>
        <MenuItem title={"Message"} disabled route={"/coming-soon"}>
          <Image src={MessageSVG} alt="message" />
        </MenuItem> */}
      </div>
      <div>
        <Image src={primaryLogo} alt="logo" />
      </div>
    </div>
  );
};

export { SideBar };
