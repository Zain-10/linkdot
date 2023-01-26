import { Tab } from "@headlessui/react";

import type { NFT } from "./showNFTs";
import { ShowNFTs } from "./showNFTs";
import type { PoAP } from "./showPoAP";
import { ShowPoAPs } from "./showPoAP";

interface AssetsTabProps {
  nfts: NFT[];
  poaps: PoAP[];
}

const AssetsTab = ({ nfts, poaps }: AssetsTabProps) => {
  return (
    <Tab.Group>
      <Tab.List className="solid flex items-center overflow-hidden border-b border-b-gray-1400">
        <Tab className="solid mr-3 min-w-[3.75rem] border-b-2 border-b-gray-1400 p-1.5 text-base font-bold text-black">
          PoAPs
        </Tab>
        <Tab className="mr-3 min-w-[3.75rem] p-1.5 text-base font-bold text-black opacity-30">
          NFTs
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <ShowPoAPs poaps={poaps} />
        </Tab.Panel>
        <Tab.Panel>
          <ShowNFTs nfts={nfts} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export { AssetsTab };
