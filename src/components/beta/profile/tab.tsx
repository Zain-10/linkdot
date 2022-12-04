import { Tab } from "@headlessui/react";

interface NFT {
  id: number;
  image_url: string;
  name: string;
  asset_contract: {
    image_url: string;
    name: string;
    owner: string;
    created_date: string;
  };
}

interface NFTs {
  nfts: NFT[];
}

const ShowNFTs = ({ nfts }: NFTs) => {
  return (
    <div className="grid grid-cols-3 gap-4 py-4 xl:grid-cols-4">
      {nfts.map((nft) => (
        <div className="rounded border border-solid border-black" key={nft.id}>
          <div className="badge-card h-44  w-full overflow-hidden rounded-t object-contain">
            {/* TODO: fix nextjs image domains problem 
                TODO: fix style issue with <Image />
              */}
            {/* <Image
              src={nft.image_url}
              alt="badge image"
              className="h-full w-full object-contain"
              layout="fill"
            /> */}
            <img
              src={nft.asset_contract.image_url || nft.image_url}
              alt="badge image"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="rounded-b border-t border-solid border-black px-4 pt-2.5 pb-4">
            <h2 className="mb-1.5 text-sm font-bold text-black">
              {nft.asset_contract.name || nft.name}
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <SVGIcon name="badgeindicationicon"></SVGIcon>  */}
                <p className="ml-2 text-xs font-normal text-gray-1600">
                  {/* {item.ownerName} */}
                </p>
              </div>
              <p className=" text-xs font-normal text-gray-1600">
                {nft.asset_contract.created_date.slice(0, 4)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AssetsTab = ({ nfts }: NFTs) => {
  return (
    <Tab.Group>
      <Tab.List className="solid flex items-center overflow-hidden border-b border-b-gray-1400">
        <Tab className="solid mr-3 min-w-[3.75rem] border-b-2 border-b-gray-1400 p-1.5 text-base font-bold text-black">
          NFTs
        </Tab>
        <Tab className="mr-3 min-w-[3.75rem] p-1.5 text-base font-bold text-black opacity-30">
          PoAPs
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          {nfts && nfts.length > 0 ? (
            <ShowNFTs nfts={nfts} />
          ) : (
            <p className="text-base font-bold text-black">No NFTs Found.</p>
          )}
        </Tab.Panel>
        <Tab.Panel>
          <p className="text-base font-bold text-black">Coming Soon.</p>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export { AssetsTab };
