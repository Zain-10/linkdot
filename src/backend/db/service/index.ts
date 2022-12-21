import { deleteOtp, generateOTP, validateOtp } from "./otp";
import {
  allUsers,
  createUser,
  followUser,
  getUser,
  getUserByWalletAddress,
  searchUsers,
  updateUser,
} from "./user";

export const dbService = {
  allUsers,
  createUser,
  getUser,
  followUser,
  getUserByWalletAddress,
  searchUsers,
  updateUser,
  validateOtp,
  generateOTP,
  deleteOtp,
};
