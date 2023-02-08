import OutlineButton from "../button/OutlineButton";
import { Profile } from "../profile";

type Profile = {
  id: string;
  handle: string;
  name: string;
  bio: string;
};

interface RecommendedProfilesProps {
  profiles: Profile[];
}

const RecommendedProfiles = ({ profiles }: RecommendedProfilesProps) => {
  return (
    <div>
      <p className="mb-6 text-xl font-bold">Recommended profiles</p>
      <div className="flex flex-col gap-8">
        {profiles?.map((profile) => (
          <div key={profile.id} className="flexCenter gap-6">
            <div className="h-10 w-10 rounded-full bg-black" />
            <div>
              <h6 className="text-base font-bold">{profile.handle}</h6>
              <p className="text-sm font-normal text-[#000000b3]">
                {profile.bio.slice(0, 20)}
              </p>
            </div>
            <OutlineButton>Follow</OutlineButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProfiles;
