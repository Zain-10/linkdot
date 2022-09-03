import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import listenForOutsideClicks from "@/helpers/utils/listen-for-outside-click";
import Settings from "@/public/assets/svg/Vector.svg";

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const menuRef = useRef(null);
  useEffect(
    listenForOutsideClicks(listening, setListening, menuRef, setIsOpen)
  );

  return (
    <div className="relative">
      <Image src={Settings} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="absolute bg-white p-3">
          <div className="border-1 border-black">
            <span className="text-black">Disconnect</span>
          </div>
        </div>
      )}
    </div>
  );
};

export { DropDown };
