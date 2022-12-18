import {
  allUsers,
  createUser,
  followUser,
  getUser,
  getUserByWalletAddress,
  searchUsers,
  updateEmail,
} from "./user";

export const dbService = {
  allUsers,
  createUser,
  getUser,
  followUser,
  getUserByWalletAddress,
  searchUsers,
  updateEmail,
};
