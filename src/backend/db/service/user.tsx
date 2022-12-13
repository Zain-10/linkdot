import { ApiError } from "@/backend/helpers/handle-error";
import { StatusCodes } from "@/constants";
import prisma from "@/lib";

import { RelatedFields } from "../utils";

const allUsers = async () => {
  // get all users from the database
  const users = await prisma.user.findMany({
    // include the following related users
    include: RelatedFields,
  });
  return users;
};

const createUser = async (walletId: string) => {
  // create a user in the database
  console.log("creating user with walletId: ", walletId);
  const newUser = await prisma.user.create({
    data: {
      walletId,
    },
  });
  return newUser;
};

const getUser = async (id: string) => {
  // get a user from the database
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    // include the following related users
    include: RelatedFields,
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, `User: ${id} not found`);
  }
  return user;
};

const searchUser = async (
  query: Pick<User, "email" | "id" | "name" | "walletId">
) => {
  // get a user from the database
  const user = await prisma.user.findUnique({
    where: query,
    // include the following related users
    include: RelatedFields,
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, `User with ${query} not found`);
  }
  return user;
};

const followUser = async (userId: string, followedId: string) => {
  // add a relationship between the follower and the followed

  const user = await getUser(userId);
  const followed = await getUser(followedId);

  // Check if the user is already following the followed
  if (user.followingIDs.find((user) => user === followed.id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Already following");
  }

  if (user.id === followed.id) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Cannot follow yourself");
  }

  // adds the followed to the following array of the follower
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      following: {
        connect: {
          id: followed.id,
        },
      },
    },
  });
  // adds the follower to the followedBy array of the followed
  await prisma.user.update({
    where: {
      id: followed.id,
    },
    data: {
      followedBy: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  const updatedUser = await getUser(user.id);
  return updatedUser;
};

const getUserByWalletAddress = async (walletId: string) => {
  // get a user from the database
  const user = await prisma.user.findUnique({
    where: {
      walletId,
    },
    // include the following related users
    include: RelatedFields,
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, `User: ${walletId} not found`);
  }
  return user;
};

export {
  allUsers,
  createUser,
  followUser,
  getUser,
  getUserByWalletAddress,
  searchUser,
};
