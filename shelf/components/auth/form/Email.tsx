import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import { LocalRoutes } from "@/config/localRoutes";
import { Action } from "@/constants";
import { useGlobalDispatch } from "@/context/global.context";
import { authService } from "@/helpers/service/auth";
import { validateEmail } from "@/helpers/utils/validateEmail";
import Check from "@/public/assets/svg/check.svg";
import { SubmitButton } from "shelf/components/auth/form/SubmitButton";

const EmailForm = ({ wallet_id }: Pick<User, "wallet_id">) => {
  const [email, setEmail] = useState<User["email"]>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const dispatch = useGlobalDispatch();
  const router = useRouter();

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setEmail(event.currentTarget.value);

    if (validateEmail(email)) setDisabled(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await authService
      .setEmail({ wallet_id, email })
      .then(() => {
        dispatch({ type: Action.SetUser, payload: { email } });
        router.push(LocalRoutes.dashboard);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-auto flex w-full justify-between border-0 border-b border-solid border-gray-400 py-4">
        <input
          className="tracking-longer w-full appearance-none border-none bg-transparent text-base font-medium leading-8 focus:outline-none"
          type="email"
          placeholder="Enter your Email ID"
          value={email}
          onChange={handleChange}
        />
        <span className={disabled ? "opacity-50" : "opacity-100"}>
          <Image src={Check} />
        </span>
      </div>
      <div className="tracking-longer mt-2 flex justify-between py-1 text-xs leading-7 text-gray-500">
        <label
          className="text-base font-light text-gray-400 opacity-50"
          htmlFor="username"
        >
          Enter your Email ID
        </label>
        <SubmitButton disabled={disabled} />
      </div>
    </form>
  );
};
export { EmailForm };
