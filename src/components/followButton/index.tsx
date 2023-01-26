interface FollowProps {
  following: boolean;
  userId: string;
  followUser: (userId: string) => void;
}

const Follow = ({ following, userId, followUser }: FollowProps) => {
  return (
    <button
      disabled={following}
      onClick={() => followUser(userId)}
      className={`'ml-4 flex h-8 min-w-[5.5rem] items-center justify-center rounded-sm border border-solid border-black py-2 text-xs font-bold ${
        following ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
};

export { Follow };
