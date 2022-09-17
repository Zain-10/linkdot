import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Category } from "@/components/auth/Category";
import { VerticalDivider } from "@/components/auth/VeriticalDivider";
import { LocalRoutes } from "@/config/localRoutes";
import { useUserState } from "@/context/global.context";
import { fallbackToAuthPath } from "@/helpers/utils/getAuthRedirectPage";
import { AuthBase } from "@/layouts/AuthBase";
import { Base } from "@/layouts/Base";

const SelectCategory: NextPage = () => {
  const user = useUserState();
  const router = useRouter();

  useEffect(() => {
    if (user?.category) {
      const redirectPath = fallbackToAuthPath(user, LocalRoutes.dashboard);
      if (redirectPath) {
        router.push(redirectPath);
      }
    }
  }, [user]);

  return (
    <Base>
      <AuthBase>
        <div className="mb-5 w-full text-center md:mb-0 md:text-right">
          <p className="mb-5 text-base font-medium leading-6">
            Complete your <br /> Registration
          </p>
          <p className="text-xs font-light leading-5">Select your category</p>
        </div>

        <div className="h-2/5">
          <VerticalDivider />
        </div>
        <Category />
      </AuthBase>
    </Base>
  );
};

export default SelectCategory;
