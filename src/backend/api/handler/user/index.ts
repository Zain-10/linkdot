import type { NextApiRequest, NextApiResponse } from "next";

import { followUserToDB, getUserFromDB } from "@/backend/service/user";
import { StatusCodes } from "@/constants";
import prisma from "@/lib";

const getUsers = async (_: NextApiRequest, res: NextApiResponse) => {
  console.log("Requesting users");
  const uers = await prisma.user.findMany();
  return res.status(StatusCodes.OK).json(uers);
};

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  console.log("creating user with data: ", body);
  const user = await prisma.user.create({
    data: body,
  });
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

  const user = await getUserFromDB(id);

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

  const user = await followUserToDB(id, req.body.userId);

  return res.status(StatusCodes.OK).json(user);
};

export { createUser, followUser, getUser, getUsers };
