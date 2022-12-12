import type { NextApiRequest, NextApiResponse } from "next";

import { StatusCodes } from "@/constants";

import { handleError } from "./handle-error";

const MethodHandler = (apiHandler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    // return 405 if method is not allowed
    // @ts-ignore
    if (!apiHandler[method]) {
      return res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .json({ message: `${method} not allowed` });
    }

    try {
      // @ts-ignore
      const response = await apiHandler[method](req, res);
      return response;
    } catch (error) {
      // @ts-ignore
      return handleError(error, res);
    }
  };
};
export { MethodHandler };
