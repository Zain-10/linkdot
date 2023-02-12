import { useMetamask } from "@thirdweb-dev/react";

import OutlineButton from "../button/OutlineButton";
import { ProfileItem } from "../profileItem";

interface RecommendedProfilesProps {
  profiles: Profile[];
}

const RecommendedProfiles = ({ profiles }: RecommendedProfilesProps) => {
  const connectWithMetamask = useMetamask();
  return (
    <div>
      <p className="mb-6 text-xl font-bold">Recommended profiles</p>
      {profiles?.map((profile) => (
        <div key={profile.id} className="flex justify-between">
          <div className="pr-2">
            <ProfileItem profile={profile} trimBio={40} />
          </div>

          <OutlineButton onClick={connectWithMetamask}>Follow</OutlineButton>
        </div>
      ))}
    </div>
  );
};

export default RecommendedProfiles;
