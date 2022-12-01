import type { GetServerSideProps, NextPage } from "next";

import { PreviewBadge } from "@/components/badge/preview";
import { Base } from "@/layouts/Base";
import { Footer } from "@/layouts/Footer";
import { Header } from "@/layouts/header";
import { WithUserBase } from "@/layouts/WithUserBase";

type PageProps = Pick<NTTBadge, "_id">;
const Preview: NextPage<PageProps> = ({ _id }) => {
  return (
    <Base>
      <WithUserBase>
        <Header />
        <div className="flex h-full w-full flex-1 justify-center">
          <div className="w-full md:w-2/5 lg:w-2/6 lg:px-10">
            <div className="mb-2 flex justify-between text-base">
              <h2>Preview</h2>
              {/* // TODO: Implement edit badge UI and Logic */}
              {/* <Link href={"/"}>Edit</Link> */}
              <span>Edit</span>
            </div>
            <PreviewBadge _id={_id} />
          </div>
        </div>
        <div className="text-left">
          <Footer textAlign="left" />
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

export default Preview;
