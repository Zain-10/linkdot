import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { ConnectComponent } from "@/components/connect";
import {
  PublicationSortCriteria,
  useExplorePublicationsQuery,
  useProfilesQuery,
} from "@/graphql/generated";

const CHINDU_GREY_PROFILE_ID = "0x019bb6";
const PUB_LIMIT = 5;

const Explore: NextPage = () => {
  const [profileIds, setProfileIds] = useState<string[]>([]);

  // get the list of publications
  const { data: publicationsData, isLoading: isPublicationsLoading } =
    useExplorePublicationsQuery({
      request: {
        sortCriteria: PublicationSortCriteria.TopCommented,
        limit: PUB_LIMIT,
      },
    });
  // get the list of profiles for the profileIds
  const { data: profilesData, isLoading: isProfilesLoading } = useProfilesQuery(
    {
      request: {
        profileIds,
      },
    },
    {
      // only run the query if there are profileIds
      enabled: !!profileIds.length,
    }
  );

  // get the array of publications
  const publications = publicationsData?.explorePublications.items;

  // get the array of profiles
  const profiles = profilesData?.profiles.items;

  // function to return the profileIds from the publications' profileIds
  // add the CHINDU_GREY_PROFILE_ID to the set to avoid duplicates
  const getProfileIds = () => {
    if (!publications) {
      return [];
    }
    // map the publications to get the profileIds
    const Ids = publications.map((publication) => publication.profile.id);
    // create a new set with the profileIds and the CHINDU_GREY_PROFILE_ID
    const newProfileIds: Set<string> = new Set([
      ...Ids,
      CHINDU_GREY_PROFILE_ID,
    ]);
    // return the array of profileIds
    return Array.from(newProfileIds);
  };

  useEffect(() => {
    if (!isPublicationsLoading && publications?.length === 5) {
      setProfileIds(getProfileIds());
    }
  }, [publications]);
  return (
    <>
      {isProfilesLoading && <div>Loading...</div>}
      {profiles?.map((profile) => (
        <div key={profile.id}>
          <div>{profile.handle}</div>
        </div>
      ))}
      <ConnectComponent />
    </>
  );
};

export default Explore;
