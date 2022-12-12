import { Prisma } from "@prisma/client";
import type { NextApiResponse } from "next";

import type { StatusCodes } from "@/constants";

export class ApiError extends Error {
  code: StatusCodes;

  constructor(code: StatusCodes, message: string) {
    super(message);
    this.code = code;
  }
}

const handleError = (error: Error | ApiError, res: NextApiResponse) => {
  if (error instanceof ApiError) {
    console.error(error.message);
    return res.status(error.code).json({
      message: error.message,
    });
  }
  // log the error initially
  // Check for prima specific error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      if (error.meta?.target) {
        // @ts-ignore
        const key = error.meta.target.split("_")[1];
        return res.status(400).json({
          message: `${key} already exists`,
        });
      }
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      message: "Validation Error",
    });
  }

  // Log any un handled error
  console.error(error);
  // For non prisma errors
  return res.status(500).json({
    message: "Internal Server Error",
  });
};

export { handleError };
