import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Main } from "@/components/beta/main";

const ComingSoon: NextPage = () => {
  const address = useAddress();
  const router = useRouter();

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

  return (
    <Main>
      <div className="profileWrapper mr-4 flex h-full w-full flex-1 content-center justify-center">
        Coming Soon
      </div>
    </Main>
  );
};

export default ComingSoon;
