import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/button";
import type { IssueBadgePayload } from "@/helpers/service/badge";
import { badgeService, UploadMode } from "@/helpers/service/badge";
import { getIPFSGatewayURL } from "@/helpers/utils/ipfs";
import CheckIcon from "@/public/assets/svg/check.svg";
import FileIcon from "@/public/assets/svg/file-text.svg";

import { BadgeCard } from "../Card";
import { Badge } from "../NTTBadge";

const IssueBadge = ({ _id }: Pick<NTTBadge, "_id">) => {
  const [badge, setBadge] = useState<NTTBadge>();
  const [emails, setEmails] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getBadge = async (_id: string) => {
    const badge = await badgeService.getBadgeDetail(_id);
    // @ts-ignore
    setBadge(badge?.data);
  };

  useEffect(() => {
    getBadge(_id);
  }, []);
  const handleOnChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const emails = e.currentTarget.value.split(",");
    setEmails(emails);
  };

  const openFileExplorer = () => inputRef.current?.click();

  // const csvFileToArray = (string: string) => {
  //   const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
  //   const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

  //   const array = csvRows.map((i) => {
  //     const values = i.split(",");
  //     const obj = csvHeader.reduce((object, header, index) => {
  //       object[header] = values[index];
  //       return object;
  //     }, {});
  //     return obj;
  //   });

  //   setArray(array);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (badge && badge?._id) {
      const payload: IssueBadgePayload = {
        emails,
        uploadMode: UploadMode.EMAIL,
        badge_id: badge?._id,
      };
      const response = await badgeService.issueBadge(payload);
      console.log(response);
    }
  };
  return (
    <>
      {badge ? (
        <div className="grid w-full grid-cols-2 gap-16">
          <BadgeCard>
            <div className="p-4 pb-6 md:px-16">
              <Badge
                _id={badge?._id}
                name={badge?.name}
                type={badge?.badge_type}
                createdDate={badge?.created_at}
                description={badge?.description}
                image={getIPFSGatewayURL(badge?.ipfs_data.ipfs_nft)}
              />
            </div>
          </BadgeCard>
          {/* Upload */}
          <div className="flex w-full flex-col justify-between">
            <div className="mb-4 flex w-1/2 items-center justify-between">
              <button
                onClick={openFileExplorer}
                className="flex justify-between border py-2 px-4"
              >
                <span className="mr-2">Upload CSV</span>
                <Image src={FileIcon} />
              </button>
              <span>or</span>
            </div>
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col justify-between"
            >
              <textarea
                name="emails"
                className="h-36 w-full border bg-transparent"
                value={emails}
                required
                onChange={handleOnChange}
              />
              <input ref={inputRef} hidden type={"file"} accept={".csv"} />
              {/* Help Text */}
              <p className="text-sm">
                Enter User Email ID separated by comma or upload CSV file for
                bulk Share, click file icon for Uploading CSV file
              </p>
              {/* Help Text */}
              {/* Import Message */}
              <div className="h-16 w-full bg-[#424345] py-3 text-center">
                <p className="text-sm text-green-500">
                  Done <Image src={CheckIcon} />
                </p>
                <p className="text-sm">Imported 6 Mail Ids.</p>
              </div>
              {/* Import Message */}

              {/* Submit Button */}
              <div className="h-16 pb-2" onClick={formRef.current?.submit}>
                <Button backgroundColor="#3DAF50" outerBoxShadowColor="#FFFFFF">
                  <span>Share Badge</span>
                </Button>
              </div>
              {/* Submit Button */}
            </form>
            {/* Form */}
          </div>
          {/* Upload */}
        </div>
      ) : (
        <div>Badge Information Is Not Available</div>
      )}
    </>
  );
};

export { IssueBadge };