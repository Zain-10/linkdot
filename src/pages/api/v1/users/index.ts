import { createUser, getUsers } from "@/backend/api/handler/user";
import { MethodHandler } from "@/backend/helpers/method-handler";
import { HttpMethod } from "@/constants";

export default MethodHandler({
  [HttpMethod.GET]: getUsers,
  [HttpMethod.POST]: createUser,
});
