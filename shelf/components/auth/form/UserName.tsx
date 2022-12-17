import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import { LocalRoutes } from "@/config/localRoutes";
import { Action } from "@/constants";
import { useGlobalDispatch } from "@/context/global.context";
import { authService } from "@/helpers/service/auth";
import Check from "@/public/assets/svg/check.svg";

import { SubmitButton } from "./SubmitButton";

const UserNameForm = ({ wallet_id }: Pick<User, "wallet_id">) => {
  const [username, setUsername] = useState<string>("");
  const isDisabled = username.length < 3;
  const router = useRouter();
  const dispatch = useGlobalDispatch();

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setUsername(`${event.currentTarget.value}`);
  };

  const updateUserName = async (
    user_name: User["user_name"],
    wallet_id: User["wallet_id"]
  ) => {
    await authService
      .setUserName({ user_name, wallet_id })
      .then(async () => {
        await dispatch({ type: Action.SetUser, payload: { user_name } });
        return router.push(LocalRoutes.auth.setEmail);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    updateUserName(username, wallet_id);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="my-auto flex w-full justify-between border-0 border-b border-solid border-gray-400 py-4">
        <input
          className="tracking-longer w-full appearance-none border-none bg-transparent text-base font-medium leading-8 focus:outline-none"
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={handleChange}
        />
        <span className={isDisabled ? "opacity-50" : "opacity-100"}>
          <Image src={Check} />
        </span>
      </div>
      <div className="tracking-longer mt-2 flex justify-between py-1 text-xs leading-7">
        {/* <span className="tracking-longer">Enter your twitter handle</span> */}
        <label
          className="text-grey-400 text-base font-light opacity-50"
          htmlFor="username"
        >
          username
        </label>
        <SubmitButton disabled={isDisabled} />
      </div>
    </form>
  );
};

export { UserNameForm };
