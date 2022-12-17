import moment from "moment";
import Image from "next/image";

import logo from "@/public/assets/svg/logo.svg";

import styles from "./badge.module.css";

interface BadgeProps {
  _id?: string;
  name: string;
  type: string;
  description: string;
  image: string;
  createdDate: string;
}
const Badge = ({ name, type, description, image, createdDate }: BadgeProps) => (
  <div className={`${styles.border} p-0.25`}>
    <div className={`${styles.badge} flex flex-col justify-between p-3`}>
      {/* Badge Header */}
      {name ? (
        <p className="py-3 text-center text-base font-bold">{name}</p>
      ) : (
        <div className="mb-4 h-5 w-full rounded-full bg-gray-200 opacity-50 dark:bg-gray-700"></div>
      )}
      <div className="mask mask-hexagon mb-5 flex w-full justify-center">
        {image ? (
          <img src={image} className="h-28 w-32" />
        ) : (
          <div className="h-28 w-32 bg-gray-200 opacity-50"></div>
        )}
      </div>
      {type && createdDate ? (
        <div className="mb-4 rounded-md bg-white py-2 px-1 text-center">
          <p className={`${styles.gradient_text} text-xs font-semibold`}>
            {`${type}#${moment(createdDate).format("MMMYYYY")}`}
          </p>
        </div>
      ) : (
        <div className="mb-4 h-8 w-full rounded-md bg-gray-200 opacity-50 dark:bg-gray-700"></div>
      )}

      <p className="mb-4 h-16 overflow-hidden text-ellipsis text-center font-poppins-regular text-xs font-normal">
        {description ? (
          `${description}`
        ) : (
          <>
            <div className="mb-4 h-1 w-full rounded-full bg-gray-200 opacity-50"></div>
            <div className="mb-4 h-1 w-full rounded-full bg-gray-200 opacity-50"></div>
            <div className="mb-4 h-1 w-full rounded-full bg-gray-200 opacity-50"></div>

            <div className="h-1 w-full rounded-full bg-gray-200 opacity-50"></div>
          </>
        )}
      </p>
      <div className="text-center">
        <Image src={logo} height={12} />
      </div>
    </div>
  </div>
);

export { Badge };
