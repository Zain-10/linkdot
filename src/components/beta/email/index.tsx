import Image from "next/image";

import LetterSVG from "@/public/assets/svg/letter.svg";

interface Props {
  showModal: boolean;
}

const EmailModal = ({ showModal }: Props) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-sm">
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white px-12 pt-20 pb-12 shadow-lg outline-none focus:outline-none">
                <div className="mb-6 flex flex-col items-center">
                  <Image src={LetterSVG} alt="letter-image" />
                  <h2 className="mt-6 text-center text-base font-bold leading-6 text-black">
                    Enter Your Email Address to complete your registration
                  </h2>
                </div>
                <div className="flex flex-col items-center">
                  <input
                    type="email"
                    placeholder="Enter Your Mail ID"
                    className="border-gray-1800 mb-4 w-full border border-solid p-4 text-xs text-black"
                  />
                  {/* OTP INPUT */}
                  {/* <input type="text" placeholder="Enter your 5 digit OTP" className="w-full p-4 border border-solid border-gray-1800  text-xs text-black mb-4"/> */}

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

                  {/* OTP MESSAGE */}
                  {/* <p className="text-xs font-xs text-black text-center mt-5">OTP sent to your registed mail</p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};

export { EmailModal };
