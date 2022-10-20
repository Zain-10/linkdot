import type { FC } from "react";
import { useEffect, useRef, useState } from "react";

import { getIPFSGatewayURL } from "@/helpers/utils/ipfs";

import { BadgeCard } from "../Card";
import { Badge } from "../NTTBadge";

const SnapShortPreview: FC<FormInput> = (prop) => {
  // @ts-ignore
  const { formInput } = prop;

  const badgeRef = useRef<HTMLDivElement | null>(null);

  const [badge, setBadge] = useState<FormInput>();

  console.log("formInput", formInput);

  useEffect(() => {
    setBadge(formInput);
    // console.log("formInput: ", formInput);
  }, [formInput]);

  return (
    <div className="mb-4 ">
      <BadgeCard>
        <div className="flex flex-col items-center p-6 md:px-16">
          <div ref={badgeRef} className="rounded-2xl">
            {badge && (
              <Badge
                name={badge?.name}
                type={badge?.badge_type}
                // @ts-ignore
                createdDate={badge?.created_at}
                description={badge?.description}
                // @ts-ignore
                image={getIPFSGatewayURL(badge.imageURL)}
              />
            )}
          </div>
          <span className="text-sm font-thin">Preview</span>
        </div>
      </BadgeCard>
    </div>
  );
};

export default SnapShortPreview;
