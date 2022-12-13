import nock from "nock";
import nodeMocks from "node-mocks-http";

import handler from "@/pages/api/users";

describe("GET /api/user", () => {
  const BASE_URL = `${process.env.BASE_API_URL}`;

  // We create req and res mocks
  // const req = nodeMocks.createRequest();
  const res = nodeMocks.createResponse();

  // We're using the same headers and we're mocking .status and .end function,
  // because we're going to see how many times they've called
  // and what they've called with
  beforeEach(() => {
    res.status = jest.fn(function () {
      // @ts-ignore
      return this;
    });
    res.end = jest.fn();
  });

  // We need to reset mocks after every test so that we could reuse them in another
  afterEach(() => {
    jest.resetAllMocks();
    nock.restore();
  });

  it("should return 405 and error message", async () => {
    // We mock the request to the backend
    nock(BASE_URL).put("/user/").reply(405, {
      message: " not allowed",
    });

    const putReq = nodeMocks.createRequest({
      method: "PUT",
    });

    // We call the handler
    await handler(putReq, res);

    console.log("res: ", res._getJSONData());

    // We check that the response is correct
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res._getJSONData()).toEqual({ message: "Method not allowed" });
  });

  // it("should return 200 and user data", async () => {
  //   // We mock the request to the backend
  //   const user = {
  //     name: "John",
  //     email: "john@gmail",
  //   };
  //   nock(BASE_URL).get("/user").reply(200, user);

  //   // We call the handler
  //   await handler(req, res);

  //   // We check that the response is correct
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res._getJSONData()).toEqual(user);
  // });
});

describe("POST /api/user", () => {
  test("should return 201 and user data", async () => {
    const { req, res } = nodeMocks.createMocks({
      method: "POST",
      body: {
        name: "John",
        email: "john@gmail",
      },
    });
    await handler(req, res);

    console.log("res: ", res._getJSONData());
  });

  it("should return 405 and error message", async () => {
    const { req, res } = nodeMocks.createMocks({
      method: "PUT",
    });
    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getJSONData()).toEqual({ message: "Method not allowed" });
  });
});
