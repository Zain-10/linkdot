enum Token {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  WALLET_ID = "walletId",
}

const setToken = async (token: Token, value: string) =>
  localStorage.setItem(token, value);

export { setToken, Token };
