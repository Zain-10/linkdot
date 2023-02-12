import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";

import OutlineButton from "@/components/button/OutlineButton";
import { Search } from "@/components/header/search";
import { ProfileItem } from "@/components/profileItem";
import { SideBar, SideBarType } from "@/components/sideBar";
import {
  SearchRequestTypes,
  useRecommendedProfilesQuery,
  useSearchProfilesQuery,
} from "@/graphql/generated";

interface PageProps {
  query: {
    query: string;
  };
}

const ExplorePage: NextPage<PageProps> = ({ query }) => {
  const queryStr = query.query;

  const [searchQuery, SetSearchQuery] = useState<string>(queryStr);

  const { data: searchResults } = useSearchProfilesQuery(
    {
      request: {
        query: searchQuery,
        type: SearchRequestTypes.Profile,
      },
    },
    {
      enabled: !!queryStr,
    }
  );

  const { data: recommendedProfiles } = useRecommendedProfilesQuery(
    {},
    {
      enabled: !searchQuery,
    }
  );

  const profiles =
    // @ts-ignore
    searchResults?.search?.items ||
    recommendedProfiles?.recommendedProfiles ||
    [];

  useEffect(() => {
    SetSearchQuery(query.query);
  }, [query.query]);

  return (
    // TODO: Add a loading state
    <div className="h-screen bg-white text-black">
      <div className="flex">
        <SideBar type={SideBarType.PUBLIC} />
        <div className="flex-1 flex-col gap-10 py-8 px-24">
          <div className="border-1 rounded md:w-full lg:w-3/4">
            <Search />
          </div>
          <div className="w-full">
            {/* @ts-ignore */}
            {profiles?.map((profile) => (
              <div key={profile.id} className="flex w-full justify-between">
                <ProfileItem profile={profile} />
                <OutlineButton>Follow</OutlineButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: { query },
  };
};

export default ExplorePage;
