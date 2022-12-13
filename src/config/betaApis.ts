const BASE_URL = `${process.env.NEXT_PUBLIC_API_SERVER_URI}/api/v1`;

export const ApiRoutes = {
  GET_USERS: `${BASE_URL}/users`,
  GET_USER: `${BASE_URL}/users/:id`,
  FOLLOW_USER: `${BASE_URL}/users/:id/follow`,
  GET_USER_BY_WALLET_ADDRESS: `${BASE_URL}/users/wallet/:address`,
  CREATE_USER: `${BASE_URL}/users`,
  SEARCH_USER: `${BASE_URL}/users/search`,
};
