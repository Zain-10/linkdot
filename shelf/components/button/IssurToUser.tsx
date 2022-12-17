import Link from "next/link";
import React from "react";

import { LocalRoutes } from "@/config/localRoutes";

type IssueToUserProps = Pick<NTTBadge, "_id"> & React.PropsWithChildren;

const IssueToUserLink = ({ _id, children }: IssueToUserProps) => (
  <Link href={`${LocalRoutes.issueToUser}/${_id}`}>
    <div className="text-sm font-bold">{children}</div>
  </Link>
);

export { IssueToUserLink };
