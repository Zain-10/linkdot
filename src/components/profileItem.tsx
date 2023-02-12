interface ProfileProps {
  profile: Profile;
  trimBio?: number;
}

export const ProfileItem = ({ profile, trimBio = 100 }: ProfileProps) => (
  <div className="mb-4 flex items-center justify-between" key={profile.id}>
    <div className="flex items-center">
      <div className="h-10 w-10 rounded-full bg-black" />
      <div className="pl-4">
        <p className="text-base font-bold text-black">{profile.handle}</p>
        <p className="font-noraml text-gray-1200 text-xs">
          {profile.bio && profile.bio.slice(0, trimBio)}
        </p>
      </div>
    </div>
  </div>
);
