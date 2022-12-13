import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

import { apiRoutes } from "@/config/apiRoutes";
import { StatusCodes } from "@/constants";

const axiosClientPublic = axios.create({
  baseURL: process.env.API_SERVER_URI,
});

const axiosClient = axios.create({
  baseURL: process.env.API_SERVER_URI,
});

axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  if (config?.headers) {
    const access_token = localStorage.getItem("access_token");
    if (access_token) config.headers.Authorization = access_token;
    else throw new Error(`Authorization header not set for url: ${config.url}`);
  }
  return config;
});

/**
 * @description get new access_token & refresh_token from backend
 * @param walletId
 * @returns {Promise<AxiosResponse>}
 */
const getTokensByWalletId = async (walletId: string) => {
  await axios.get(`${apiRoutes.getToken}?wallet_id=${walletId}`).then((res) => {
    const { access_token, refresh_token } = res.data.data;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  });
};

/**
 * @description retry the axios request in following cases:
 * 1. access_token expired
 * 2. refresh_token expired
 * redirect to /auth if access_token or refresh_token is not found in localStorage
 */
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    if (status === StatusCodes.UNAUTHORIZED) {
      console.log("JWT token expired, refreshing token...");
      /// /////////////////////////////////////////
      // get new access_token from backend, and retry request
      /// /////////////////////////////////////////
      const refresh_token = localStorage.getItem("refresh_token");
      if (refresh_token) {
        await axios
          .post(apiRoutes.refreshToken, { refresh_token })
          .then((res) => {
            const { access_token } = res.data.data;
            // Set new access_token token in localStorage
            localStorage.setItem("access_token", access_token);
          })
          .catch(async (err) => {
            if (err.response?.status === StatusCodes.NOT_ACCEPTABLE) {
              // refresh_token expired, getting new tokens
              console.log("refresh_token expired, getting new tokens...");
              const walletId = localStorage.getItem("walletId");
              if (walletId) {
                getTokensByWalletId(walletId);
              } else {
                console.log("WalletId not found");
                window.location.href = "/auth";
              }
            }
          });
        /// /////////////////////////////////////////
        // Retry the request once again after updating the access_token
        /// /////////////////////////////////////////
        const access_token = localStorage.getItem("access_token");
        // @ts-ignore
        error.config.headers.Authorization = access_token;
        error.config.baseURL = undefined;
        return axiosClient.request(error.config);
      }
      console.log("Refresh token not found");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export { axiosClient, axiosClientPublic };
