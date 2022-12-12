import { ApiError } from "@/backend/helpers/handle-error";
import { StatusCodes } from "@/constants";
import prisma from "@/lib";

const getUserFromDB = async (id: string) => {
  // get a user from the database
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    // include the following related users
    include: {
      following: {
        select: {
          id: true,
          name: true,
          walletId: true,
        },
      },
      // include the followedBy related users
      followedBy: {
        select: {
          id: true,
          name: true,
          walletId: true,
        },
      },
    },
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, `User: ${id} not found`);
  }
  return user;
};

const followUserToDB = async (userId: string, followedId: string) => {
  // add a relationship between the follower and the followed

  const user = await getUserFromDB(userId);
  const followed = await getUserFromDB(followedId);

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
  const updatedUser = await getUserFromDB(user.id);
  return updatedUser;
};

export { followUserToDB, getUserFromDB };
