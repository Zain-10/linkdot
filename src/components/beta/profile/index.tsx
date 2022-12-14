import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";

import BlockChainSVG from "@/public/assets/svg/blockchain.svg";
import CalendarSVG from "@/public/assets/svg/calendar.svg";
import profileLogo from "@/public/assets/svg/profileLogo.svg";

import { AssetsTab } from "./tab";

interface Props {
  user: User;
  address: string;
}

const Profile = ({ user, address }: Props) => {
  const [NFTs, setNFTs] = useState([]);
  const [PoAPs, setPoAPs] = useState([]);

  const fetchNFTs = async (address: string) => {
    const url = `${process.env.NEXT_PUBLIC_OPENSEA_API_URI}/assets/?limit=50&offset=0&order_by=sale_price&owner=${address}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": `${process.env.NEXT_PUBLIC_OPENSEA_API_KEY}`,
      },
    });
    const data = await res.json();

    setNFTs(data.assets);
  };

  const fetchPoAPs = async (address: string) => {
    const url = `${process.env.NEXT_PUBLIC_POAP_API_URI}/actions/scan/${address}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": `${process.env.NEXT_PUBLIC_POAP_API_KEY}`,
      },
    });
    const data = await res.json();

    setPoAPs(data);
  };

  useEffect(() => {
    if (address) {
      fetchNFTs(address);
      fetchPoAPs(address);
    }
  }, []);

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="profileWrapper mr-4 h-full w-full">
      <div className="profileCard relative !h-[8rem] w-full rounded">
        <div className="absolute bottom-[-2.406rem] left-3">
          <Image src={profileLogo} alt="profile logo" />
        </div>
      </div>
      <div className="px-3 pt-12 pb-6">
        <h2 className="max-w-[10.563rem] truncate text-lg font-normal leading-5 text-black">
          {`${address.slice(0, 10)}...${address.slice(-4)}`}
        </h2>
        <div className="pt-4">
          <div className="mb-4 flex items-center">
            <div className="mr-5 flex items-center">
              <Image src={BlockChainSVG} alt="ethereum logo" />
              <p className="p-2 text-xs font-normal leading-[0.875rem] text-gray-1200">
                Ethereum
              </p>
            </div>
            <div className="mr-5 flex items-center text-gray-1200">
              <Image
                src={CalendarSVG}
                alt="ethereum logo"
                height={12}
                width={12}
              />
              <p className="p-2 text-xs font-normal leading-[0.875rem] text-gray-1200">
                {moment(user?.createdAt).format("MMMM YYYY")}
              </p>
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <div className="mr-5 flex items-center">
              <p className="text-xs font-normal leading-[0.875rem] text-gray-1200">
                {user.followingIDs.length}
              </p>
              <p className="p-2 text-xs font-normal leading-[0.875rem] text-gray-1200">
                Following
              </p>
            </div>
            <div className="mr-5 flex items-center">
              <p className="text-xs font-normal leading-[0.875rem] text-gray-1200">
                {user.followedByIDs.length}
              </p>
              <p className="p-2 text-xs font-normal leading-[0.875rem] text-gray-1200">
                Followers
              </p>
            </div>
          </div>
          <button className="flex h-8 min-w-[12rem] items-center justify-center border-2 border-solid border-black py-2 text-xs font-bold leading-[0.875rem] text-black hover:bg-black hover:text-white">
            Share
          </button>
        </div>
      </div>
      <div className="pb-6">
        <AssetsTab nfts={NFTs} poaps={PoAPs} />
      </div>
    </div>
  );
};

export { Profile };
