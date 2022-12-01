import "./loader.module.css";

import Image from "next/image";
import { useEffect, useState } from "react";

import linkdotSVG from "@/public/assets/svg/linkdot-small.svg";

const LinkDotLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalId);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="loader-screen h-screen w-full bg-white ">
      <div className="loader-screen-text relative flex h-full w-full flex-col items-center justify-center">
        <Image src={linkdotSVG} alt="loader image" />
        <div className="absolute bottom-20 flex flex-col">
          <label
            htmlFor="progressBar"
            className="mb-1 text-center text-xs font-light leading-[0.875rem] text-black"
          >
            linkDOT looking for your badges...
          </label>
          <progress id="progressBar" value={progress} max="100">
            {progress}%
          </progress>
        </div>
      </div>
    </div>
  );
};

export { LinkDotLoader };
