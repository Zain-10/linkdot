export const RelatedFields = {
  following: {
    select: {
      id: true,
      name: true,
      walletId: true,
    },
  },
  followedBy: {
    select: {
      id: true,
      name: true,
      walletId: true,
    },
  },
};
