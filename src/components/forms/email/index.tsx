import axios from "axios";
import Image from "next/image";
import { useState } from "react";

import { ApiRoutes } from "@/config/betaApis";
import { Action } from "@/constants";
import { useGlobalDispatch } from "@/context/global.context";
import LetterSVG from "@/public/assets/svg/letter.svg";

interface Props {
  email?: string;
  userId: string;
}

const Email = ({ email, userId }: Props) => {
  const [formData, setFormData] = useState({
    email,
    otp: "",
  });

  const [showOtpInput, setShowOtpInput] = useState(false);

  const dispatch = useGlobalDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, email: value });
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, otp: value });
  };

  const handleUpdateEmail = async (id: User["id"], email: User["email"]) => {
    const url = ApiRoutes.UPDATE_EMAIL.replace(":id", id);
    await axios.post(url, { email }).then(() => {
      dispatch({
        type: Action.SetUser,
        payload: { email, emailVerified: false },
      });
    });
  };

  const verifyEmail = async (
    id: User["id"],
    email: User["email"],
    otp: string
  ) => {
    const url = ApiRoutes.VERIFY_EMAIL.replace(":id", id);
    await axios.post(url, { email, otp }).then((res) => {
      dispatch({
        type: Action.SetUser,
        payload: res.data,
      });
    });
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowOtpInput(true);
    if (formData.otp === "") {
      // Send OTP
      // @ts-ignore
      await handleUpdateEmail(userId, formData.email);
    } else {
      // Verify OTP
      // @ts-ignore
      await verifyEmail(userId, formData.email, formData.otp);
    }
  };

  return (
    <div className="relative flex w-full flex-col rounded-lg border-0 bg-white px-12 pt-20 pb-12 shadow-lg outline-none focus:outline-none">
      <div className="mb-6 flex flex-col items-center">
        <Image src={LetterSVG} alt="letter-image" />
        <h2 className="mt-6 text-center text-base font-bold leading-6 text-black">
          Enter Your Email Address to complete your registration
        </h2>
      </div>
      <form onSubmit={handleSumbit}>
        <div className="flex flex-col items-center">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Mail ID"
            className="mb-4 w-full border-solid p-4 text-xs text-black"
            style={{
              border: "1px solid #581ED7",
            }}
            value={formData.email}
            onChange={handleEmailChange}
            required
          />
          {showOtpInput && (
            <>
              <input
                type="text"
                placeholder="Enter your 6 digit OTP"
                className="border-gray-1800 mb-4 w-full border border-solid  p-4 text-xs text-black"
                value={formData.otp}
                onChange={handleOtpChange}
                required
                style={{
                  border: "1px solid #581ED7",
                }}
              />
              <button
                className="shadow-4xl p-4 text-sm font-normal"
                style={{
                  width: "100%",
                  border: "1px solid rgb(88 30 215)",
                  boxShadow:
                    "rgb(88 30 215) 0px 0px 0px 0px, rgb(88 30 215) 3px 3px",
                  backgroundColor: "rgba(88, 30, 215, 0.1)",
                }}
              >
                Go to Profile
              </button>
              <p className="font-xs mt-5 text-center text-xs text-black">
                OTP sent to your mail
              </p>
            </>
          )}
          {!showOtpInput && (
            <button
              className="shadow-4xl p-4 text-sm font-normal"
              style={{
                width: "100%",
                border: "1px solid rgb(88 30 215)",
                boxShadow:
                  "rgb(88 30 215) 0px 0px 0px 0px, rgb(88 30 215) 3px 3px",
                backgroundColor: "rgba(88, 30, 215, 0.1)",
              }}
            >
              Send OTP
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export { Email };
