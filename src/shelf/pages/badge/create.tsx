import type { NextPage } from "next";

import { CreateBadgeForm } from "@/components/badge/create";
import { Base } from "@/layouts/Base";
import { Footer } from "@/layouts/Footer";
import { Header } from "@/layouts/header";
import { WithUserBase } from "@/layouts/WithUserBase";

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
