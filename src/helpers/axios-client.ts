import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

import { apiRoutes } from "@/config/apiRoutes";
import { StatusCode } from "@/constants/statusCode";

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

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    if (status === StatusCode.Unauthorized) {
      console.log("🍹Jwt token expired, refreshing token...");

      // get new access_token from backend, and retry request
      const refresh_token = localStorage.getItem("refresh_token");

      await axios
        .post(apiRoutes.refreshToken, { refresh_token })
        .then((res) => {
          const { access_token } = res.data.data;
          // Set new access_token token in localStorage
          console.log("🍹New access_token received, retrying request...");
          localStorage.setItem("access_token", access_token);
        })
        .catch(async (err) => {
          console.log(err);

          // if (err.response?.status === 406) {
          //   const walletId = "0x3d3135EB3F26d5eBfC40CCc0C57f39B469D61641";
          //   const response = await axios.get(
          //     `${apiRoutes.getToken}?wallet_id=${walletId}`
          //   );
          //   const { access_token, refresh_token } = response.data.data;
          //   localStorage.setItem("access_token", access_token);
          //   localStorage.setItem("refresh_token", refresh_token);
          // }
        });

      error.config.baseURL = undefined;
      // Retry the request once again after updating the access_token
      return axiosClient.request(error.config);
    }
    return Promise.reject(error);
  }
);

export { axiosClient, axiosClientPublic };
