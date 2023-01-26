import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Main } from "@/components/main";
import { useUserState } from "@/context/global.context";

const ComingSoon: NextPage = () => {
  const address = useAddress();
  const router = useRouter();
  const user = useUserState();

  useEffect(() => {
    if (!address) {
      router.push("/connect");
    }
  }, []);

  useEffect(() => {
    if (!address) {
      router.push("/connect");
    }
  }, [address]);

  if (address) {
    return (
      <Main address={address} user={user}>
        <div className="profileWrapper mr-4 flex h-full w-full flex-1 content-center justify-center">
          Coming Soon
        </div>
      </Main>
    );
  }
  return null;
};

export default ComingSoon;
