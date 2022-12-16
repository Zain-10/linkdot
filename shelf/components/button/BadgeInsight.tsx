import Link from "next/link";

import { LocalRoutes } from "@/config/localRoutes";

import { Button } from "../../../src/components/button";

type IssueToUserProps = Pick<NTTBadge, "_id">;

const BadgeInsightLink = ({ _id }: IssueToUserProps) => (
  <Link href={`${LocalRoutes.badgeInsights}/${_id}`}>
    <div className="text-sm font-bold">
      <Button
        boxShadowVariant={2}
        outerBoxShadowColor="#FFFFFF"
        borderWidth="2px"
      >
        <span className="md:text-xs">View</span>
      </Button>
    </div>
  </Link>
);

export { BadgeInsightLink };
