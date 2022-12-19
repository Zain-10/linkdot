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

  const stopLoading = () => setLoading(false);

  useEffect(() => {
    if (!address) {
      console.log("wallet not connected");
      router.push("/connect");
    }

    // User not found
    if (!user && address) {
      console.log("User not found or not logged in");
      router.push("/connect");
    }
  }, [address]);

  if (address && user) {
    return (
      <>
        {loading ? (
          <LinkDotLoader callback={stopLoading} />
        ) : (
          <Main address={address} user={user}>
            <Profile user={user} address={address} />
          </Main>
        )}
      </>
    );
  }
  return null;
};

export default Home;
