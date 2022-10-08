import { FormInput } from "@/components/badge/create/index";
import { FC, useEffect, useRef, useState } from "react";
import { BadgeCard } from "../Card";
import { Badge } from "../NTTBadge";

type badgeData = Omit<NTTBadge, "_id">;

const SnapShortPreview: FC<FormInput> = (prop) => {
  // @ts-ignore
  const { formInput } = prop;
  console.log("formInput: ", formInput);

  const [badge, setBadge] = useState<FormInput>();

  const badgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setBadge(formInput);
    // console.log("formInput: ", formInput);
  }, [formInput]);

  return (
    <div className="">
      <BadgeCard>
        <div className="p-4 pb-6 md:px-16">
          <div ref={badgeRef} className="rounded-2xl">
            {badge && (
              <Badge
                name={badge?.name}
                type={badge?.badge_type}
                // @ts-ignore
                createdDate={badge?.created_at}
                description={badge?.description}
                // @ts-ignore
                image={badge.imageURL}
              />
            )}
          </div>
        </div>
      </BadgeCard>
    </div>
  );
};

export default SnapShortPreview;
