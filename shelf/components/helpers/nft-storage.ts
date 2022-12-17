import { NFTStorage } from "nft.storage";

export const client = () => {
  const NFT_STORAGE_API_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
  if (NFT_STORAGE_API_KEY)
    return new NFTStorage({ token: NFT_STORAGE_API_KEY });
  throw new Error(
    "Environment variable not set -  NEXT_PUBLIC_NFT_STORAGE_API_KEY"
  );
};
