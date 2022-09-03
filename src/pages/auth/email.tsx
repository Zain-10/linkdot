import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { EmailForm } from "@/components/auth/form/Email";
import { VerticalDivider } from "@/components/auth/VeriticalDivider";
import { useUserState } from "@/context/global.context";
import { authRedirectPage } from "@/helpers/utils/getAuthRedirectPage";
import { AuthBase } from "@/layouts/AuthBase";
import { Base } from "@/layouts/Base";

const Email: NextPage = () => {
  const user: User = useUserState();
  const router = useRouter();
  const address = useAddress();

  useEffect(() => {
    // TODO: Need refactoring
    if (user?.email) {
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
            <p className="text-xs font-light leading-5">
              Your display name is{" "}
            </p>
            <span className="mr-1"></span>
            <p className="cursor-pointer text-xs font-light leading-5 hover:scale-105">
              {user?.user_name}
            </p>
          </div>
        </div>

        <div className="h-full">
          <VerticalDivider />
        </div>
        <div className="flex justify-center">
          <div className="w-3/4 md:w-full">
            {address && <EmailForm wallet_id={address} />}
          </div>
        </div>
      </AuthBase>
    </Base>
  );
};

export default Email;
