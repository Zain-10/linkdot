type User = {
  id: string;
  name: string;
  email: string;
  walletId: string;
  walletName: string;
  following: string[];
  followingIDs: string[];
  followers: string[];
  followedByIDs: string[];
  createdAt: string;
  loggedIn?: boolean;
  role?: string;
  emailVerified?: boolean;

  // TODO: To be removed
  created_at: string;
  wallet_id: string;
  wallet_name: string;
  user_name: string;
  category: string;
};
