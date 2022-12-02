import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { LinkDotLoader } from "@/components/beta/loader";
import { Main } from "@/components/beta/main";
import { Profile } from "@/components/beta/profile";
import { useUserState } from "@/context/global.context";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const address = useAddress();
  const router = useRouter();
  const user = useUserState();

  useEffect(() => {
    if (!address) {
      router.push("/connect");
    }
  }, []);

  const stopLoading = () => setLoading(false);

  useEffect(() => {
    if (!address) {
      router.push("/connect");
    }
  }, [address]);

  if (address && user) {
    return (
      <>
        {loading ? (
          <LinkDotLoader callback={stopLoading} />
        ) : (
          <Main>
            <Profile user={user} address={address} />
          </Main>
        )}
      </>
    );
  }
  return null;
};

export default Home;
