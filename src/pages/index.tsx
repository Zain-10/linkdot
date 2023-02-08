import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { ConnectComponent } from "@/components/connect";
import { Search } from "@/components/header/search";
import RecommendedProfiles from "@/components/recommended-profiles";
import { SideBar } from "@/components/sideBar";
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
        sortCriteria: PublicationSortCriteria.TopCollected,
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

  console.log(profiles, isProfilesLoading);

  return (
    <div className="h-screen bg-white text-black">
      <div className="flex">
        <SideBar type="public" />
        <div className="flexCenter flex-1 flex-col gap-10 px-24">
          <h1 className="text-5xl font-bold">Discover top web3 experts here</h1>
          <div className="border-1 rounded md:w-full lg:w-3/4">
            <Search />
          </div>

          <p className="text-xl font-bold">
            Join the biggest community of web 3
          </p>
          <div className="flex w-full flex-wrap justify-between gap-8">
            {/* @ts-ignore */}
            <RecommendedProfiles profiles={profiles} />
            <ConnectComponent />
          </div>
        </div>

        {/* {isProfilesLoading && <div>Loading...</div>}
        {profiles?.map((profile) => (
          <div key={profile.id}>
            <div>{profile.handle}</div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Explore;
