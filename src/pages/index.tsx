import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Main } from "@/components/beta/main";
import { Profile } from "@/components/beta/profile";
import { useUserState } from "@/context/global.context";

const Home: NextPage = () => {
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

  if (address && user) {
    return (
      <Main>
        <Profile user={user} address={address} />
      </Main>
    );
  }
  return null;
};

export default Home;
