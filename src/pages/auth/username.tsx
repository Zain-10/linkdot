import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { UserNameForm } from "@/components/auth/form/UserName";
import { VerticalDivider } from "@/components/auth/VeriticalDivider";
import { useUserState } from "@/context/global.context";
import { authRedirectPage } from "@/helpers/utils/getAuthRedirectPage";
import { AuthBase } from "@/layouts/AuthBase";
import { Base } from "@/layouts/Base";

const UserName: NextPage = () => {
  const user = useUserState();
  const router = useRouter();
  const address = useAddress();

  useEffect(() => {
    if (user?.user_name) {
      const redirectPath = authRedirectPage(user);
      if (redirectPath) router.push(redirectPath);
    }
  }, [user]);

  return (
    <Base>
      <AuthBase>
        <div className="mb-5 w-full text-center md:mb-0 md:text-right">
          <p className="mb-5 text-base font-medium leading-6">
            Complete your <br /> Registration
          </p>
          <div className="flex justify-center md:justify-end">
            <p className="text-xs font-light leading-5">You selected as </p>
            <span className="mr-1"></span>
            <p className="cursor-pointer text-xs font-light leading-5 hover:scale-105">
              {user?.category}
            </p>
          </div>
        </div>

        <div className="h-full">
          <VerticalDivider />
        </div>
        <div className="flex justify-center">
          <div className="w-3/4 md:w-full">
            {address && <UserNameForm wallet_id={address} />}
          </div>
        </div>
      </AuthBase>
    </Base>
  );
};

export default UserName;