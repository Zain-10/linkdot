import React from "react";

import { withUser } from "@/components/hoc/WithUser";

import { Footer } from "./Footer";

const AuthBase = withUser(({ children }: React.PropsWithChildren<{}>) => (
  <div className="flex h-full  w-full flex-1 flex-col items-center justify-center">
    <div
      style={{
        gridTemplateColumns: "2fr 0fr 2fr",
      }}
      className="w-full items-center md:grid md:w-3/4 lg:w-2/3"
    >
      {children}
    </div>
    <div className="mt-10 md:absolute md:left-1/2 md:bottom-10 md:m-0">
      <Footer />
    </div>
  </div>
));

export { AuthBase };
