import type { NextApiRequest, NextApiResponse } from "next";

import { dbService } from "@/backend/db/service";
import { StatusCodes } from "@/constants";

const getUsers = async (_: NextApiRequest, res: NextApiResponse) => {
  console.log("Requesting users");
  const uers = await dbService.allUsers();
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

  return res.status(StatusCodes.OK).json(user);
};

export { createUser, followUser, getUser, getUserByAddress, getUsers };
