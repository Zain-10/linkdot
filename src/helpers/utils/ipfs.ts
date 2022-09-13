import { NFTStorage } from "nft.storage";

/**
 * NOTES:
 * We are using NFT.storage(https://nft.storage/docs/) to store the metadata of the badge.
 * Currently, we use the ERC-1155 standard to store the badge metadata. 
 * We need to change it to ERC-721.
 * Learn more about ERC-721: https://eips.ethereum.org/EIPS/eip-721
 * https://medium.com/blockchain-manchester/erc-721-metadata-standards-and-ipfs-94b01fea2a89


 * TODO: Need to test the speed of creating and retreiving data from NFT.Storage
 * QUESTION: If we are saving badge related metadata in the IPFS, is still need to persist in database?
 *
 */

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

export { getIPFSGatewayURL, uploadMetadataToIPFS };
