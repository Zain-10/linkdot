import "react-datepicker/dist/react-datepicker.css";

import { ContractFactory, providers } from "ethers";
import { toBlob } from "html-to-image";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";

import {
  abi,
  bytecode,
} from "@/../artifacts/contracts/LinkDotContract.sol/LinkDotContract.json";
import { Button } from "@/components/button";
import { apiRoutes } from "@/config/apiRoutes";
import { LocalRoutes } from "@/config/localRoutes";
import { BadgeOption } from "@/constants/badge";
import { axiosClient } from "@/helpers/axios-client";
import { getBase64URL } from "@/helpers/utils/getBase64Url";
import { getIPFSGatewayURL, uploadMetadataToIPFS } from "@/helpers/utils/ipfs";
import CalendarIcon from "@/public/assets/svg/calendar.svg";
import CameraIcon from "@/public/assets/svg/camera.svg";
import ChevronDownIcon from "@/public/assets/svg/chevron-down.svg";
import XIcon from "@/public/assets/svg/x.svg";

import { Badge } from "../NTTBadge";

/// /////////////////////////////////
// NOTES:
// Currently, the badge `logo` and the `NFT` metadata is saved in a different IPFS directory.
// Entire badge creation process is slow because of this.
// TODO: Refactor the flow that can reduce the number of IPFS calls.
// TODO: Implement a client side validation for the form.
/// /////////////////////////////////

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
  const [logoIPFSHash, setLogoIPFSHash] = useState<object>();

  const ref = useRef<HTMLInputElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

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
      const imageUrl = await getBase64URL(file);

      const newFormInput = {
        image: file,
        imageURL: `${imageUrl}`,
      };

      setFormInput({
        ...formInput,
        ...newFormInput,
        fileName: file?.name,
      });
    }
  };

  const createSnapshot = async () => {
    if (badgeRef.current) {
      return toBlob(badgeRef.current, {
        cacheBust: true,
      });
    }
    return null;
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
    return {
      contractAddress: contract.address,
      contractData,
    };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, badge_type, description, image } = formInput;
    if (image) {
      /// //////////////////////////////////
      // 1. Upload Logo to IPFS
      /// //////////////////////////////////
      try {
        setLoading(true);
        const metadata = await uploadMetadataToIPFS(
          name,
          badge_type,
          description,
          image
        );
        console.log("Logo uploaded to IPFS: ", metadata);
        const imageurl = getIPFSGatewayURL(metadata.data.image.pathname);
        setFormInput({ ...formInput, imageURL: imageurl });
        // @ts-ignore
        setLogoIPFSHash(metadata);
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  const createBadge = async (payload: {
    name: string;
    description: string;
    badge_type: string;
    ipfs: object;
    ipfs_img: string;
    txData: object;
    mint_image: string;
    contract_address: string;
  }) => {
    await axiosClient
      .post(apiRoutes.createBadge, payload)
      .then((res) => {
        console.log("res: ", res);
        const badgeId = res.data.data.badge_id;
        setFormInput(initialInputState);
        router.push(`${LocalRoutes.badge.preview}/${badgeId}`);
      })
      .catch((err) => console.log(err));
  };

  const UploadNFTMetadata = async (
    name: string,
    type: string,
    description: string
  ) => {
    /// //////////////////////////////////
    // Upload NFT Metadata to IPFS
    /// //////////////////////////////////
    const blob = await createSnapshot();
    console.log("UploadNFTMetadata");
    // @ts-ignore
    const nftHash = await uploadMetadataToIPFS(name, type, description, blob);
    if (nftHash) console.log("NFT uploaded to IPFS: ", nftHash);
    return nftHash;
  };

  useEffect(() => {
    if (logoIPFSHash) {
      (async () => {
        setLoading(true);
        const { name, badge_type, description } = formInput;
        const nftCid = await UploadNFTMetadata(name, badge_type, description);
        if (nftCid) {
          const { contractAddress, contractData } = await deployContract(
            nftCid.url
          );
          await createBadge({
            name,
            badge_type,
            description,
            ipfs: logoIPFSHash,
            // @ts-ignore
            ipfs_img: logoIPFSHash.data.image.pathname,
            txData: contractData,
            mint_image: nftCid.data.image.pathname,
            contract_address: contractAddress,
          });
        }
      })();
      setLoading(false);
    }
  }, [logoIPFSHash]);

  return (
    <div className="flex-1 px-60">
      <div className="flex justify-between px-8 pb-4">
        <h2>Create Badge</h2>
        <Link href={LocalRoutes.dashboard} className="cursor-pointer">
          <Image src={XIcon} />
        </Link>
      </div>
      <div className="flex">
        <div className="h-full w-1/2 pr-10">
          <div className="border p-10">
            <div ref={badgeRef}>
              <Badge
                type={formInput.badge_type}
                name={formInput.name}
                description={formInput.description}
                image={formInput.imageURL}
                createdDate={formInput.issued_date}
              />
            </div>
          </div>
        </div>
        <div className="w-1/2">
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
    </div>
  );
};

export { CreateBadgeForm };
