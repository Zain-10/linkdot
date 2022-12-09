export interface NFT {
  id: number;
  image_url: string;
  name: string;
  asset_contract: {
    image_url: string;
    name: string;
    owner: string;
    created_date: string;
  };
  permalink: string;
}

interface NFTs {
  nfts: NFT[];
}

const ShowNFTs = ({ nfts }: NFTs) => {
  if (nfts.length === 0) {
    return (
      <div className="flex h-80 w-full flex-col items-center justify-center">
        <p className="text-base font-bold text-black">No NFTs Found.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-4 py-4 xl:grid-cols-4">
      {nfts.map((nft) => (
        <a
          key={nft.id}
          href={nft.permalink || ""}
          target="_blank"
          rel="noreferrer"
        >
          <div className="rounded border border-solid border-black">
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
        </a>
      ))}
    </div>
  );
};

export { ShowNFTs };
