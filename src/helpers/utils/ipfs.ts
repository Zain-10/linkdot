import { NFTStorage } from "nft.storage";

export { getIPFSGatewayURL, uploadMetadataToIPFS };

const getIPFSGatewayURL = (ipfsURL: string) => {
  const urlArray = ipfsURL.split("/");
  const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
  return ipfsGateWayURL;
};

const uploadMetadataToIPFS = async (
  name: string,
  type: string,
  description: string,
  image: File
) => {
  // Saving metadata to NFT.storage
  // NOTE: The Speed of creating and retreiving data from NFT.Storage not tested in the current point time.
  // NOTE: If we are saving badge related metadata in the IPFS, is still need to persist in database?

  const client = new NFTStorage({
    // @ts-ignore
    token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY,
  });
  return client.store({
    name,
    description,
    type,
    image,
  });
};
