import { Menu, Transition } from "@headlessui/react";
import { useDisconnect } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { LocalRoutes } from "@/config/localRoutes";
import Settings from "@/public/assets/images/settings.png";

const HeaderLinks = () => {
  const disconnect = useDisconnect();
  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };
  return (
    <ul className="list-reset flex items-center">
      <li className="my-auto">
        <Link href={LocalRoutes.badge.create}>
          <button
            className="bg-brand-yellow px-6 py-2.5 text-sm font-medium text-black"
            style={{
              lineHeight: "15px",
              boxShadow: "#0f1018 4px 5px 0px -1px, 4px 5px #FFFFFF",
            }}
          >
            Create Badge
          </button>
        </Link>
      </li>

      <li>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center py-2 pl-4 text-sm font-medium text-gray-700 shadow-sm focus:outline-none">
              <Image
                src={Settings}
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right border bg-white text-center shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1 px-3">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={disconnect}
                      className={classNames(
                        active
                          ? "bg-gray-100 text-gray-900"
                          : "border-2 border-black text-gray-700",
                        "block cursor-pointer px-4 py-2 text-sm"
                      )}
                    >
                      Disconnect
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </li>
    </ul>
  );
};

export { HeaderLinks };
