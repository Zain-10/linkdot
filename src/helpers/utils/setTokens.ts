import type { LOCAL_STORAGE } from "@/constants";

enum Token {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  WALLET_ID = "wallet_id",
}

const setToken = async (token: Token, value: string) =>
  localStorage.setItem(token, value);

const setToLocal = (key: LOCAL_STORAGE, value: string) =>
  localStorage.setItem(key, value);

export { setToken, setToLocal, Token };
