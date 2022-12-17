import type { GetServerSideProps, NextPage } from "next";

import { BadgeInsight } from "shelf/components/badge/insights";
import { Base } from "shelf/components/layouts/Base";
import { WithUserBase } from "shelf/components/layouts/WithUserBase";
import { Header } from "shelf/components/layouts/header";

type PageProps = Pick<NTTBadge, "_id">;

const Insight: NextPage<PageProps> = ({ _id }) => {
  return (
    <Base>
      <WithUserBase>
        <Header />
        <div className="px-10">
          <BadgeInsight _id={_id} />
        </div>
      </WithUserBase>
    </Base>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { _id },
  } = context;
  return {
    props: { _id },
  };
  // ...
};

export default Insight;
