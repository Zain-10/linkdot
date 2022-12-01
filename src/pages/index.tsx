import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { LinkDotLoader } from "@/components/beta/loader";

const Beta: NextPage = () => {
  const address = useAddress();
  const router = useRouter();

  useEffect(() => {
    if (!address) {
      router.push("/beta/connect");
    }
  }, []);

  useEffect(() => {
    if (!address) {
      router.push("/beta/connect");
    }
  }, [address]);

  return <LinkDotLoader />;
};

export default Beta;
