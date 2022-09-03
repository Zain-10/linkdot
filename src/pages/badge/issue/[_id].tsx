import type { GetServerSideProps, NextPage } from "next";

import { IssueBadge } from "@/components/badge/issue";
import { Base } from "@/layouts/Base";
import { Header } from "@/layouts/header";
import { WithUserBase } from "@/layouts/WithUserBase";

type PageProps = Pick<NTTBadge, "_id">;

const Issue: NextPage<PageProps> = ({ _id }) => (
  <Base>
    <WithUserBase>
      <Header />
      <div className="my-auto flex h-full w-full justify-center">
        <div className="w-full lg:w-3/4 lg:px-10">
          <h2 className="mb-4">Issue Badge </h2>
          <IssueBadge _id={_id} />
        </div>
      </div>
    </WithUserBase>
  </Base>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { _id },
  } = context;
  return {
    props: { _id },
  };
  // ...
};

export default Issue;
