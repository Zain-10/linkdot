import Link from "next/link";

import { Button } from "@/components/button";
import { LocalRoutes } from "@/config/localRoutes";

const ClaimComponent = ({
  address,
  claimBadge,
}: {
  address: string;
  claimBadge: Function;
}) => {
  return (
    <>
      <h1 className="text-3xl font-bold">Claim your Badge</h1>
      <p className="text-base font-light">Do you want to claim this badge?</p>
      {address && (
        <>
          <p className="text-xs font-light">
            This badge will be sent to wallet id
          </p>
          <p className="text-xs font-light text-[#4EABEA]">{address}</p>
        </>
      )}
      <div className="grid grid-cols-2 gap-4">
        <Button
          boxShadowVariant={2}
          outerBoxShadowColor={"#FFFFFF"}
          borderWidth={"2px"}
        >
          <span className="p-2">
            <Link href={LocalRoutes.dashboard}>Go To Dashboard</Link>
          </span>
        </Button>
        <Button
          boxShadowVariant={2}
          outerBoxShadowColor={"#FFFFFF"}
          borderWidth={"2px"}
          backgroundColor={"#FFFFFF"}
          textColor={"#000000"}
        >
          {/* @ts-ignore */}
          <span onClick={claimBadge} className="p-2 text-base font-medium">
            Claim
          </span>
        </Button>
      </div>
    </>
  );
};

export { ClaimComponent };
