import "react-datepicker/dist/react-datepicker.css";

import { ContractFactory, providers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";

import {
  abi,
  bytecode,
} from "@/../artifacts/contracts/LinkDotContract.sol/LinkDotContract.json";
import SnapShortPreview from "@/components/badge/preview/SnapShortPreview";
import { Button } from "@/components/button";
import { apiRoutes } from "@/config/apiRoutes";
import { LocalRoutes } from "@/config/localRoutes";
import { BadgeOption } from "@/constants/badge";
import { axiosClient } from "@/helpers/axios-client";
import { uploadMetadataToIPFS } from "@/helpers/utils/ipfs";
import CalendarIcon from "@/public/assets/svg/calendar.svg";
import CameraIcon from "@/public/assets/svg/camera.svg";
import ChevronDownIcon from "@/public/assets/svg/chevron-down.svg";
import XIcon from "@/public/assets/svg/x.svg";
import { toBlob } from "html-to-image";
/**
 * TODO:
 * 1. Add Datepicker for selecting date.
 * 2. Check if `handleInputChange` function supports select input change.
 * 3. Implement handle Submit Logic.
 * 4. Implement IPFS storage.
 * 5. Implement form validation error.
 */

const initialInputState = {
  image: undefined,
  name: "",
  badge_type: "",
  description: "",
  issued_date: "",
  fileName: undefined,
  imageURL: "",
};

const CreateBadgeForm = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formInput, setFormInput] = useState<FormInput>(initialInputState);

  // const [errors, setErrors] = useState<FormInput>({
  //   image: "",
  //   name: "",
  //   badge_type: "",
  //   description: "",
  //   issued_date: "",
  // });

  const ref = useRef<HTMLInputElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  useEffect(() => {}, []);

  const handleInputChange = async (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ): Promise<void> => {
    const { name, value } = event.currentTarget;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleImageUpload = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    // Checking File object is not empty
    if (event.currentTarget.files?.length && event.currentTarget.files[0]) {
      const file = event.currentTarget.files[0];
      const imageURL = URL.createObjectURL(file);
      setFormInput({
        ...formInput,
        image: file,
        fileName: file?.name,
        imageURL,
      });
    }
  };

  const handleDateChange = (date: Date) => {
    setFormInput({ ...formInput, issued_date: `${date}` });
  };
  const removeAndRestartFileUpload = (): void => {
    // Clearing the curently selected file from the state.
    setFormInput({ ...formInput, fileName: "", image: undefined });
    // Triggering a click on the hidden file input to open the file explorer.
    ref.current?.click();
  };

  const deployContract = async (badgeMetaDataIPFS: string) => {
    const wallet = global.window.ethereum;

    interface TX extends Omit<providers.TransactionResponse, "data"> {
      abi?: object;
    }

    // @ts-ignore
    const provider = new providers.Web3Provider(wallet);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const factory = new ContractFactory(abi, bytecode, signer);
    console.log("deploying contract...");

    const contract = await factory.deploy(
      badgeMetaDataIPFS,
      "LinkDotBadge",
      "LDB"
    );
    await contract.deployTransaction.wait();
    const contractData: TX = contract.deployTransaction;
    // @ts-ignore
    delete contractData?.data;
    contractData.abi = abi;

    console.log("contract address: ", contract.address);
    return contract.deployTransaction;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, badge_type, description, image } = formInput;
    if (image) {
      try {
        setLoading(true);
        console.log("badgeRef.current: ", badgeRef.current);
        if (badgeRef.current === null) return null;
        try {
          const imgRefBlob = await toBlob(badgeRef.current, {
            cacheBust: true,
          });

          console.log("imgRefBlob: ", imgRefBlob);
        } catch (error) {
          console.log("error in toBlob: ", error);
          return;
        }
        debugger;

        const metadata = await uploadMetadataToIPFS(
          name,
          badge_type,
          description,
          image
        );

        console.log("metadata: ", metadata);
        if (metadata) {
          const txData = await deployContract(metadata.url);
          await axiosClient
            .post(apiRoutes.createBadge, {
              name,
              badge_type,
              description,
              ipfs: metadata,
              ipfs_img: metadata.data.image.pathname,
              txData,
            })
            .then((res) => {
              const badgeId = res.data.data.badge_id;
              setFormInput(initialInputState);
              router.push(`${LocalRoutes.badge.preview}/${badgeId}`);
            })
            .catch((err) => console.log(err));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="container-wraper flex items-center justify-between">
        <div ref={badgeRef} className="preview mx-2 basis-1/2">
          {/* @ts-ignore */}
          <SnapShortPreview formInput={formInput} />
        </div>
        <div className="badge-draft mx-2 basis-1/2">
          <div className="mb-6 flex justify-between text-base">
            <h2>Create Badge</h2>
            <Link href={LocalRoutes.dashboard} className="cursor-pointer">
              <Image src={XIcon} />
            </Link>
          </div>
          <form
            className="flex h-full w-full flex-1 flex-col justify-between "
            onSubmit={handleSubmit}
          >
            {/* Select Badge Type */}
            <div className="relative flex w-full flex-wrap items-stretch">
              <select
                className="border-grey-300 py-auto h-14 w-full flex-1 appearance-none border bg-transparent px-5 focus:outline-none lg:max-h-14"
                name="badge_type"
                value={formInput.badge_type}
                onChange={handleInputChange}
                required
              >
                <option selected disabled>
                  Select Badge Type*
                </option>
                {Object.values(BadgeOption).map((value) => (
                  <option
                    className="text-black transition ease-in-out"
                    value={value}
                    key={value}
                  >
                    {value}
                  </option>
                ))}
              </select>
              <span className="absolute right-0 z-10 flex h-full w-8 items-center justify-center rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug text-white">
                <Image src={ChevronDownIcon} />
              </span>
            </div>
            {/* Select Badge Type */}
            {/* Badge Name */}
            <div>
              <input
                className="border-grey-300 py-auto h-14 w-full flex-1 appearance-none border bg-transparent p-5 focus:outline-none lg:max-h-14"
                type="text"
                name="name"
                placeholder="Enter Badge Name*"
                onChange={handleInputChange}
                value={formInput.name}
                required
              />
            </div>
            {/* Badge Name */}

            {/* Badge Description */}
            <div>
              <input
                className="border-grey-300 py-auto h-14 w-full flex-1 appearance-none border bg-transparent p-5 focus:outline-none lg:max-h-14"
                type="text"
                name="description"
                placeholder="Enter Badge Description*"
                value={formInput.description}
                onChange={handleInputChange}
                required
              />
              <p className="pt-2 text-right text-sm text-gray-400">20 Words</p>
            </div>
            {/* Badge Description */}

            {/* Issued Date */}
            <div className="relative flex w-full flex-wrap items-stretch">
              <DatePicker
                className="border-grey-300 py-auto h-14 w-full flex-1 appearance-none border bg-transparent p-5 focus:outline-none lg:max-h-14"
                placeholderText="Month and Year of Badge issuing*"
                required
                selected={
                  formInput.issued_date
                    ? new Date(formInput.issued_date)
                    : undefined
                }
                onChange={(date: Date) => handleDateChange(date)}
              />
              <span className="absolute right-0 z-10 flex h-full w-8 items-center justify-center  rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug text-white">
                <Image src={CalendarIcon} />
              </span>
            </div>
            {/* Issued Date */}
            {/* Image Upload */}
            <div className="relative flex w-full flex-wrap items-stretch">
              <button
                className="border-grey-300 py-auto h-14 w-full flex-1  appearance-none border bg-transparent px-5 text-left text-gray-400  lg:max-h-14"
                type="button"
                onClick={removeAndRestartFileUpload}
              >
                {formInput.fileName
                  ? formInput.fileName
                  : "Upload Badge Image*"}
              </button>
              <input
                hidden
                type={"file"}
                ref={ref}
                onChange={handleImageUpload}
                required
                name="file"
                accept="image/png"
              />
              <span
                className="absolute right-0 z-10 flex h-full w-8 items-center justify-center  rounded bg-transparent py-3 pr-3 text-center text-base font-normal leading-snug"
                onClick={removeAndRestartFileUpload}
              >
                {formInput.image ? (
                  <Image src={XIcon} />
                ) : (
                  <Image src={CameraIcon} />
                )}
              </span>
            </div>
            {/* Image Upload */}
            <div className="h-14" onClick={formRef.current?.submit}>
              <Button
                outerBoxShadowColor="#FFFFFF"
                innerBoxShadowColor="#FFFFFF"
                isLoading={isLoading}
              >
                Create and Preview
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { CreateBadgeForm };
