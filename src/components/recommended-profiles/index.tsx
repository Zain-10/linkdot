import OutlineButton from "../button/OutlineButton";

interface RecommendedProfilesProps {
  profiles: Profile[];
}

const RecommendedProfiles = ({ profiles }: RecommendedProfilesProps) => {
  return (
    <div>
      <p className="mb-6 text-xl font-bold">Recommended profiles</p>
      {profiles?.map((profile) => (
        <div className="flex justify-between">
          <div className="pr-2">
            <Profile key={profile.id} profile={profile} />
          </div>

          <OutlineButton>Follow</OutlineButton>
        </div>
      ))}
    </div>
  );
};

export default RecommendedProfiles;

interface ProfileProps {
  profile: Profile;
}

const Profile = ({ profile }: ProfileProps) => (
  <div className="mb-4 flex items-center justify-between" key={profile.id}>
    <div className="flex items-center">
      <div className="h-10 w-10 rounded-full bg-black" />
      <div className="pl-4">
        <p className="text-base font-bold text-black">{profile.handle}</p>
        <p className="font-noraml text-gray-1200 text-xs">
          {profile.bio.slice(0, 40)}
        </p>
      </div>
    </div>
    {/* <Follow
      following={currentlyFollowing.includes(user.id)}
      followUser={followUser}
      userId={user.id}
    /> */}
  </div>
);
