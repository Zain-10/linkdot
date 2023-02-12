import Link from "next/link";
import type { ReactNode } from "react";

import { AppConfig } from "@/utils/AppConfig";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="text-gray-700 w-full px-1 antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-md">
      <div className="border-gray-300 border-b">
        <div className="pt-16 pb-8">
          <div className="text-gray-900 text-3xl font-bold">
            {AppConfig.title}
          </div>
          <div className="text-xl">{AppConfig.description}</div>
        </div>
        <div>
          <ul className="flex flex-wrap text-xl">
            <li className="mr-6">
              <Link href="/">
                <a className="text-gray-700 hover:text-gray-900 border-none">
                  Home
                </a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/about/">
                <a className="text-gray-700 hover:text-gray-900 border-none">
                  About
                </a>
              </Link>
            </li>
            <li className="mr-6">
              <a
                className="text-gray-700 hover:text-gray-900 border-none"
                href="https://github.com/ixartz/Next-js-Boilerplate"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="py-5 text-xl">{props.children}</div>

      <div className="border-gray-300 border-t py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{" "}
        <span role="img" aria-label="Love">
          ♥
        </span>{" "}
        by <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>
        {/*
         * PLEASE READ THIS SECTION
         * We'll really appreciate if you could have a link to our website
         * The link doesn't need to appear on every pages, one link on one page is enough.
         * Thank you for your support it'll mean a lot for us.
         */}
      </div>
    </div>
  </div>
);

export { Main };
