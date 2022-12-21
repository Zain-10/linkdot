import type { NextApiRequest, NextApiResponse } from "next";

import { dbService } from "@/backend/db/service";
import { sendEmailVerification } from "@/backend/helpers/send-email";
import { StatusCodes } from "@/constants";

const getUsers = async (_: NextApiRequest, res: NextApiResponse) => {
  console.log("Requesting users");
  const uers = await dbService.allUsers();
  res.setHeader("Cache-Control", "s-maxage=10, must-revalidate");
  return res.status(StatusCodes.OK).json(uers);
};

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  console.log("creating user with data: ", body);

  if (!body.walletId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "walletId is required" });
  }

  // Check if user already exists
  const existingUser = await dbService.getUserByWalletAddress(body.walletId);

  if (existingUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "user already exists",
    });
  }

  const user = await dbService.createUser(body.walletId);
  return res.status(StatusCodes.CREATED).json(user);
};

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Requesting user with id: ", req.query.id);

  const { id } = req.query;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "id is required" });
  }

  if (typeof id !== "string") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "id must be a string" });
  }

  const user = await dbService.getUser(id);

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "user not found" });
  }

  return res.status(StatusCodes.OK).json(user);
};

const followUser = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Request received to follow user with id: ", req.query.id);

  const { id } = req.query;
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "id is required" });
  }

  if (typeof id !== "string") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "id must be a string" });
  }

  const user = await dbService.followUser(id, req.body.userId);

  return res.status(StatusCodes.OK).json(user);
};

const getUserByAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Requesting user with address: ", req.query.address);

  const { address } = req.query;

  if (!address) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "address is required" });
  }

  if (typeof address !== "string") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "address must be a string",
    });
  }

  const user = await dbService.getUserByWalletAddress(address);

  if (!user) {
    return res

      .status(StatusCodes.NOT_FOUND)
      .json({ message: "user not found" });
  }
  res.setHeader("Cache-Control", "s-maxage=10, must-revalidate");
  return res.status(StatusCodes.OK).json(user);
};

const searchUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  console.log("Requesting users with search query: ", query);

  if (!query) {
    const users = await dbService.allUsers();
    return res.status(StatusCodes.OK).json(users);
  }

  const users = await dbService.searchUsers(query);
  res.setHeader("Cache-Control", "s-maxage=10, must-revalidate");
  return res.status(StatusCodes.OK).json(users);
};
/**
 * Update user data, currently only name is supported. Raises a 400 if other fields are present.
 * To Update email use the updateEmail endpoint
 * @param req NextApiRequest
 * @param res NextApiResponse
 * @returns 200 if user is updated
 */
const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { body } = req;

  console.log(
    `Request received to update user with id: ${id} with data: ${body}`
  );

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "id is required" });
  }

  if (typeof id !== "string") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "id must be a string" });
  }

  const { name, email, ...rest } = body;
  if (email) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "email can only be updated using the /update-email endpoint",
    });
  }
  if (Object.keys(rest).length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "only name and email can be updated" });
  }

  // if the user is updating their name, validate it
  if (name) {
    const existingUsers = await dbService.searchUsers({ name });
    if (existingUsers.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "name already exists",
      });
    }
  }

  const user = await dbService.updateUser(id, { name });

  return res.status(StatusCodes.OK).json(user);
};

const updateEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;
  const { id } = req.query;

  console.log("recieved request for updating email for user with id: ", id);

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "id is required" });
  }

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "email is required" });
  }

  if (typeof id !== "string") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "id must be a string" });
  }

  // TODO: validate email

  const user = await dbService.getUser(id);

  if (user.email === email) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "cannot update email to the same email",
    });
  }
  // Check if email is already in use by another user
  const existingUsers = await dbService.searchUsers({ email });
  if (existingUsers.length > 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "email already exists",
    });
  }

  const otp = await dbService.generateOTP(email);
  if (otp) {
    await sendEmailVerification(email, otp);

    return res.status(StatusCodes.OK).json({
      message:
        "an email containing a verification code has been sent to you your email",
    });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "an error occurred while sending the email",
  });
};

const verifyEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  console.log("recieved request for verifying email for user with id: ", id);
  if (typeof id !== "string") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "id must be a string" });
  }
  const { email, otp } = req.body;

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "email is required" });
  }

  if (!otp) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "otp is required" });
  }

  const user = await dbService.getUser(id);

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "user not found" });
  }

  // validate otp
  const otpValid = await dbService.validateOtp(
    // @ts-ignore
    email,
    otp
  );

  if (!otpValid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "otp is invalid" });
  }
  const updatedUser = await dbService.updateUser(id, {
    emailVerified: true,
    email,
  });
  if (updatedUser) {
    // delete otp
    await dbService.deleteOtp(email);
  }
  return res.status(StatusCodes.OK).json(updatedUser);
};

export {
  createUser,
  followUser,
  getUser,
  getUserByAddress,
  getUsers,
  searchUsers,
  updateEmail,
  updateUser,
  verifyEmail,
};
