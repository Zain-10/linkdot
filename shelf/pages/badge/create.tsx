import type { NextPage } from "next";

import { CreateBadgeForm } from "shelf/components/badge/create";
import { Base } from "shelf/components/layouts/Base";
import { Footer } from "shelf/components/layouts/Footer";
import { WithUserBase } from "shelf/components/layouts/WithUserBase";
import { Header } from "shelf/components/layouts/header";

const CreateBadge: NextPage = () => (
  <Base>
    <WithUserBase>
      <Header />
      <div className="flex h-full w-full flex-1 justify-center">
        <CreateBadgeForm />
      </div>
      <div className="text-left">
        <Footer textAlign="left" />
      </div>
    </WithUserBase>
  </Base>
);

export default CreateBadge;
