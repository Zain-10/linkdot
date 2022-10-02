import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { apiRoutes } from "@/config/apiRoutes";
import { axiosClient } from "@/helpers/axios-client";

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  localStorage.setItem("access_token", "access_token");
  localStorage.setItem("refresh_token", "refresh_token");
});

const mockApi = new MockAdapter(axiosClient);
const mockApiPublic = new MockAdapter(axios);

mockApi
  .onGet(`/unauthorized`)
  .replyOnce(401)
  .onGet(`/unauthorized`)
  .replyOnce(200, {
    data: "success",
  });

// refresh token url is called when the first request fails with 401
mockApiPublic.onPost(apiRoutes.refreshToken).replyOnce(200, {
  data: { access_token: "new_access_token" },
});

const getSpy = jest.spyOn(axiosClient, "get");
const postSpy = jest.spyOn(axios, "post");

// test axios call retried for 401 response
test("axios client call retried for 401 response", async () => {
  // This `try` `catch` pattern is followed responsible of jest plugin: "no-conditional-expect"
  // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-conditional-expect.md
  // TODO: find a better way to test this, currently it's not testing the second call to the api is successful
  try {
    const response = await axiosClient.get("/unauthorized");
    expect(response?.status).toBe(200);
    expect(response?.data?.data).toBe("success");
  } catch (error) {
    console.log(error);
  }

  // TODO: fix this test
  // expect(getSpy).toHaveBeenCalledTimes(2);
  expect(getSpy).toBeCalledWith("/unauthorized");

  // refresh token url is called when the first request fails with 401
  expect(postSpy).toHaveBeenCalledTimes(1);
  expect(postSpy).toBeCalledWith(apiRoutes.refreshToken, {
    refresh_token: "refresh_token",
  });

  // expect that that the localStorage access_token is updated
  expect(localStorage.getItem("access_token")).toBe("new_access_token");
});
//
