type GitPoAp = {
  gitPoapId: number;
  gitPoapEventId: number;
  poapTokenId: string;
  poapEventId: number;
  poapEventFancyId: string;
  name: string;
  year: number;
  description: string;
  imageUrl: string;
  repositories: string[];
  earnedAt: string;
  mintedAt: string;
};

type Kudo = {
  kudosTokenId: number;
  headline: string;
  assetUrl: string;
  createdAt: string;
  claimStatus: string;
  communityId: string;
};
