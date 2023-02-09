/**
 * @description Profile page component, a private route that is only accessible to authenticated users.
 * Fetches the profile data from the Lens API using the `default profile` query.
 * This query is used to fetch the profile data of the user who is currently logged in.
 */

import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { ConnectComponent } from "@/components/connect";
import {
  Profile,
  useDefaultProfileQuery,
  useRecommendedProfilesQuery,
} from "@/graphql/generated";

const ethereumAddress = "0xccd37217ed186b094469FA90b375BE23757609c8"; // TODO: remove this hard coded address

const RecommendedProfiles = () => {
  // TODO: move this component to a separate file
  const { data: recommendedProfiles } = useRecommendedProfilesQuery({});

  console.log("recommendedProfiles", recommendedProfiles);

  if (!recommendedProfiles) {
    return <div>Loading recommended profiles...</div>;
  }

  return (
    <div>
      <h2>Recommended Profiles</h2>
      <hr />
      <ul>
        {recommendedProfiles.recommendedProfiles.map((profile: Profile) => (
          <li key={profile.id}>{profile.handle}</li>
        ))}
      </ul>
    </div>
  );
};

const Profile: NextPage = () => {
  const [gitPoAps, setGitPoAps] = useState<GitPoAp[]>([]);
  const [mintKudos, setMintKudos] = useState<Kudo[]>([]);

  const address = useAddress(); // use the useAddress hook to get the user's ethereum address and pass it to the query
  console.log(gitPoAps);
  console.log("mintKudos", mintKudos);

  // fetch currently logged in user's profile data
  const { data: profile } = useDefaultProfileQuery({
    request: {
      ethereumAddress,
      // TODO: use the user's ethereum address. the hard coded address is for testing purposes only
    },
  });
  // TODO: consider adding profile data to the context and use it in other components

  const fetchGitPoAPs = async (address: string) => {
    console.log("Fetching GitPoAPs...");

    const apiUri = process.env.NEXT_PUBLIC_GIT_POAP_API_URI;
    const response = await fetch(`${apiUri}/address/${address}/gitpoaps`);

    if (!response.ok) {
      console.error("Failed to fetch GitPoAPs:", response.statusText);
      return;
    }

    const data = await response.json();
    setGitPoAps(data);
  };

  const fetchMintKudos = async (address: string) => {
    console.log("Fetching mint kudos...");

    try {
      const apiUri = process.env.NEXT_PUBLIC_MINT_KUDOS_API_URI;
      const response = await fetch(
        `${apiUri}/wallets/${address}/tokens?claimStatus=unclaimed`
      );

      if (!response.ok) {
        console.error("Failed to fetch mint kudos:", response.statusText);
        return;
      }

      const { data } = await response.json();
      setMintKudos(data);
    } catch (error) {
      console.error("Failed to fetch mint kudos:");
    }
  };

  useEffect(() => {
    if (address && profile?.defaultProfile) {
      fetchGitPoAPs(address);
      fetchMintKudos(address);
    }
  }, [address]);

  if (!address) {
    return <ConnectComponent />;
  }

  return (
    <>
      <div>{profile?.defaultProfile?.handle}</div>
      <br />
      <RecommendedProfiles />
    </>
  );
};

export default Profile;
