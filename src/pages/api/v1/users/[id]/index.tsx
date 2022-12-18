import { getUser, updateEmail } from "@/backend/api/handler/user";
import { MethodHandler } from "@/backend/helpers/method-handler";
import { HttpMethod } from "@/constants";

export default MethodHandler({
  [HttpMethod.GET]: getUser,
  [HttpMethod.POST]: updateEmail,
});
