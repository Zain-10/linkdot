import type { AxiosError, AxiosResponse } from "axios";

import { axiosClient } from "./axios-client";

type GetRequest = {
  url: string;
};

type PostRequest = GetRequest & { payload: object };

function handleResponse(response: AxiosResponse): object {
  return response.data.data;
}

function handleError(error: AxiosError | unknown) {
  console.log("handleError");

  console.log(error);
}
async function get({ url }: GetRequest) {
  try {
    const response = await axiosClient.get(url);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

async function post({ url, payload }: PostRequest) {
  try {
    console.log("payload:", payload);

    const response = await axiosClient.post(url, payload);

    if (response) handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export const axiosWrapper = { get, post };
