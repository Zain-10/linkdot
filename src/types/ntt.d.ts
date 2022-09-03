type NTTBadge = {
  _id: readonly string;
  name: string;
  created_at: string;
  description: string;
  badge_type: string;
  image: string;
  issued_date: string;
  ipfs_data: IPFSData;
};

type NTTMetadata = {
  name: readonly string;
  description: readonly string;
};

type IPFSData = {
  ipfs_nft: readonly string;
  ipfs_uri: readonly string;
};
