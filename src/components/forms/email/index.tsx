import Image from "next/image";
import { useState } from "react";

import { Action } from "@/constants";
import { useGlobalDispatch } from "@/context/global.context";
import LetterSVG from "@/public/assets/svg/letter.svg";

interface Props {
  email?: string;
}

const Email = ({ email }: Props) => {
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

  const handleUpdateEmail = async (email: User["email"]) => {
    dispatch({
      type: Action.SetUser,
      payload: { email, emailVerified: false },
    });
  };

  const verifyEmail = async (email: User["email"], otp: string) => {
    console.log("otp", otp);

    dispatch({
      type: Action.SetUser,
      payload: { email, emailVerified: true },
    });
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowOtpInput(true);
    if (formData.otp === "") {
      // Send OTP
      // @ts-ignore
      await handleUpdateEmail(formData.email);
    } else {
      // Verify OTP
      // @ts-ignore
      await verifyEmail(formData.email, formData.otp);
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
          />
          {showOtpInput && (
            <>
              <input
                type="text"
                placeholder="Enter your 5 digit OTP"
                className="border-gray-1800 mb-4 w-full border border-solid  p-4 text-xs text-black"
                value={formData.otp}
                onChange={handleOtpChange}
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
                Verify
              </button>
              <p className="font-xs mt-5 text-center text-xs text-black">
                OTP sent to your registed mail
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
