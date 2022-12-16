import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import listenForOutsideClicks from "@/helpers/utils/listen-for-outside-click";
import ChevronDownSVG from "@/public/assets/svg/chevron-down.svg";
import LogoutSVG from "@/public/assets/svg/log-out.svg";
import { Search } from "./search";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const menuRef = useRef(null);
  const disconnect = useDisconnect();
  const address = useAddress();

  useEffect(
    listenForOutsideClicks(listening, setListening, menuRef, setIsOpen)
  );

  return (
    <div className="sticky top-0 z-10 flex h-[4.75rem] w-full items-center bg-white pt-3 pr-8 pb-6 pl-4">
      <Search />
      <div className="relative h-10 w-[21.875rem] shrink-0 grow-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className={`solid h-full w-full rounded border border-gray-1200 bg-gray-1300 px-2 py-1 ${
            isOpen ? "rounded-b-none  border-b-0 !pb-[0.313rem]" : "border-b"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* <SVGIcon name="octagonicon"></SVGIcon> */}
              <div className="mask mask-hexagon-2 h-7 w-7 bg-gradient-to-r from-gradient-purple to-gradient-blue"></div>
              <p className="ml-2 w-24 overflow-hidden text-ellipsis whitespace-nowrap text-base text-black">
                {address}
              </p>
            </div>
            <div className={isOpen ? "origin-center rotate-180" : "rotate-0"}>
              <Image src={ChevronDownSVG} alt="logout" />
            </div>
          </div>
        </button>
        {isOpen && (
          <div
            className="solid absolute  z-10 flex w-full cursor-pointer items-center rounded-b border border-t-0 border-gray-1200 bg-gray-1300 p-3"
            onClick={disconnect}
          >
            <Image src={LogoutSVG} alt="logout" />
            <div>
              <span className="ml-3.5 text-base text-black">Disconnect</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Header };
