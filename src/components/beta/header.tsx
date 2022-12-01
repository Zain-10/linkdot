import { useEffect, useRef, useState } from "react";

import listenForOutsideClicks from "@/helpers/utils/listen-for-outside-click";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const menuRef = useRef(null);
  useEffect(
    listenForOutsideClicks(listening, setListening, menuRef, setIsOpen)
  );

  return (
    <div className="sticky top-0 z-10 flex h-[4.75rem] w-full items-center bg-white pt-3 pr-8 pb-6 pl-4">
      <form className="relative mr-4 w-full">
        <input
          type="search"
          placeholder="Search by wallet id, badge, name..."
          className="solid h-10 w-full rounded border border-gray-1200 bg-gray-1300 py-3.5 pl-7 pr-14 text-xs text-black outline-0"
        />
        <button type="submit" className="absolute right-0 h-full w-12">
          {/* <SVGIcon name="searchicon"></SVGIcon> */}
        </button>
      </form>
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
              <p className="ml-2 w-24 overflow-hidden text-ellipsis whitespace-nowrap text-base text-black">
                0x6b1bd5ddddddddddd....
              </p>
            </div>
            <div className={isOpen ? "origin-center rotate-180" : "rotate-0"}>
              {/* <SVGIcon name="downarrowicon"></SVGIcon> */}
            </div>
          </div>
        </button>
        {isOpen && (
          <div className="solid absolute  z-10 flex w-full cursor-pointer items-center rounded-b border border-t-0 border-gray-1200 bg-gray-1300 p-3">
            {/* <SVGIcon name="logouticon"></SVGIcon> */}
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
