import Link from "next/link";

import { LocalRoutes } from "@/config/localRoutes";

import { Button } from "../button";

const NoBadge = () => (
  <div className="m-auto flex h-full items-center justify-center text-center md:w-1/2">
    <div className="">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
        In urna et enim cursus purus laoreet mattis etiam.
      </p>

      <Link href={LocalRoutes.badge.create}>
        <div className="mx-auto mt-6 w-1/2">
          <Button
            boxShadowVariant={2}
            borderWidth={"2px"}
            outerBoxShadowColor="#A58E09"
          >
            <span className="p-2 font-semibold">Create Badge</span>
          </Button>
        </div>
      </Link>
    </div>
  </div>
);

export { NoBadge };
