import axios from "axios";
import Image from "next/image";
import { useState } from "react";

import { ApiRoutes } from "@/config/betaApis";
import { Action } from "@/constants";
import { useGlobalDispatch } from "@/context/global.context";
import LetterSVG from "@/public/assets/svg/letter.svg";

interface Props {
  userId: string;
}

const Email = ({ userId }: Props) => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const [error, setError] = useState({
    email: "",
    otp: "",
  });

  const { email, otp } = formData;

  const [showOtpInput, setShowOtpInput] = useState(false);

  const dispatch = useGlobalDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, email: value });
    error.email = "";
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, otp: value });
    error.otp = "";
  };

  const handleUpdateEmail = async (id: User["id"], email: User["email"]) => {
    const url = ApiRoutes.UPDATE_EMAIL.replace(":id", id);
    await axios
      .post(url, { email })
      .then(() => {
        dispatch({
          type: Action.SetUser,
          payload: { email, emailVerified: false },
        });
        setShowOtpInput(true);
      })
      .catch((err) => {
        setError({ ...error, email: err.response.data.message });
      });
  };

  const verifyEmail = async (
    id: User["id"],
    email: User["email"],
    otp: string
  ) => {
    const url = ApiRoutes.VERIFY_EMAIL.replace(":id", id);
    await axios
      .post(url, { email, otp })
      .then((res) => {
        dispatch({
          type: Action.SetUser,
          payload: res.data,
        });
      })
      .catch((err) => {
        setError({ ...error, otp: err.response.data.message });
      });
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp === "") {
      // Send OTP
      // @ts-ignore
      await handleUpdateEmail(userId, email);
    } else {
      // Verify OTP
      // @ts-ignore
      await verifyEmail(userId, email, otp);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col items-center">
        <Image src={LetterSVG} alt="letter-image" />
        <h2 className="mt-6 text-center text-base font-bold leading-6 text-black">
          Enter Your Email Address to complete your registration
        </h2>
      </div>
      <form onSubmit={handleSumbit} className="flex flex-col items-center">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Mail ID"
            className="mb-4 w-full border-solid p-4 text-xs text-black"
            style={{
              border: "1px solid #581ED7",
            }}
            value={email}
            onChange={handleEmailChange}
            required
          />
          {email && email?.length > 0 && error.email && (
            <p
              className="text-xs font-normal text-purple-500"
              style={{ textAlign: "left" }}
            >
              {error.email}
            </p>
          )}
          {showOtpInput && (
            <>
              <input
                type="text"
                placeholder="Enter your 6 digit OTP"
                className="border-gray-1800 mb-4 w-full border border-solid  p-4 text-xs text-black"
                value={otp}
                onChange={handleOtpChange}
                required
                style={{
                  border: "1px solid #581ED7",
                }}
              />
              {otp.length > 0 && error.otp && (
                <p
                  className="text-xs font-normal text-purple-500"
                  style={{ textAlign: "left" }}
                >
                  {error.otp}
                </p>
              )}
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
    </>
  );
};

export { Email };
