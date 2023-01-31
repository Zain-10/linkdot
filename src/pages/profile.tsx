/**
 * @description Profile page component, a private route that is only accessible to authenticated users.
 * Fetches the profile data from the Lens API using the `default profile` query.
 * This query is used to fetch the profile data of the user who is currently logged in.
 */

import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";

import { useDefaultProfileQuery } from "@/graphql/generated";

const ethereumAddress = "0xccd37217ed186b094469FA90b375BE23757609c8";

const Profile: NextPage = () => {
  // fetch currently logged in user's profile data

  const address = useAddress(); // use the useAddress hook to get the user's ethereum address and pass it to the query

  console.log(address);

  const { data: profile } = useDefaultProfileQuery({
    request: {
      ethereumAddress,
      // TODO: use the user's ethereum address. the hard coded address is for testing purposes only
    },
  });

  return <div>{profile?.defaultProfile?.handle}</div>;
};

export default Profile;
