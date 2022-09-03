import Link from "next/link";

interface Props {
  username: string;
}

export const UserLogo = ({ username }: Props) => (
  <Link href={"/"}>
    <div className="flex cursor-pointer hover:scale-105">
      <div className="mask mask-hexagon-2 mr-4 h-8 w-8 bg-gradient-to-r from-gradient-purple to-gradient-blue"></div>
      {username && <span className="text-2xl font-medium">@{username}</span>}
    </div>
  </Link>
);
