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

export type Query = {
  orderBy?: object;
  where: object;
  include?: object;
  take?: number;
};

export const SortByCreatedAt = {
  createdAt: "desc",
};
