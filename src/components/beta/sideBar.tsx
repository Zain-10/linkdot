import Image from "next/image";

import AwardSVG from "@/public/assets/svg/award.svg";
import BellSVG from "@/public/assets/svg/bell.svg";
import HashSVG from "@/public/assets/svg/hash.svg";
import logo from "@/public/assets/svg/logoblack.svg";
import MessageSVG from "@/public/assets/svg/message-square.svg";
import UserSVG from "@/public/assets/svg/user.svg";

import { MenuItem } from "./menuitem";

const SideBar = () => {
  return (
    <div className="sticky top-0 flex h-screen w-[16.875rem] flex-col items-center justify-between bg-gray-1100 p-8">
      <div className="pt-11">
        <div>
          <MenuItem title={"Profile"} route={"/"}>
            <Image src={UserSVG} alt="user" />
          </MenuItem>
        </div>
        <div>
          <MenuItem title={"Explore"} disabled route={"/coming-soon"}>
            <Image src={HashSVG} alt="expolre" />
          </MenuItem>
        </div>
        <MenuItem title={"Need Badge"} disabled route={"/coming-soon"}>
          <Image src={AwardSVG} alt="badge" />
        </MenuItem>
        <MenuItem title={"Notification"} disabled route={"/coming-soon"}>
          <Image src={BellSVG} alt="notification" />
        </MenuItem>
        <MenuItem title={"Message"} disabled route={"/coming-soon"}>
          <Image src={MessageSVG} alt="message" />
        </MenuItem>
      </div>
      <div>
        <Image src={logo} alt="logo" />
      </div>
    </div>
  );
};

export { SideBar };
