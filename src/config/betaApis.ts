const BASE_URL = `/api/v1`;

export const ApiRoutes = {
  GET_USERS: `${BASE_URL}/users`,
  GET_USER: `${BASE_URL}/users/:id`,
  FOLLOW_USER: `${BASE_URL}/users/:id/follow`,
  GET_USER_BY_WALLET_ADDRESS: `${BASE_URL}/users/wallet/:address`,
  CREATE_USER: `${BASE_URL}/users`,
  SEARCH_USER: `${BASE_URL}/users/search`,
  UPDATE_EMAIL: `${BASE_URL}/users/:id/update-email`,
  VERIFY_EMAIL: `${BASE_URL}/users/:id/verify-email`,
};
