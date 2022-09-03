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
      <p className="py-3 text-center text-base font-bold">{name}</p>
      <div className="mask mask-hexagon mb-5  flex w-full justify-center">
        <img src={image} className="h-28 w-32" />
      </div>
      <div className="mb-4 rounded-md bg-white py-2 px-1 text-center">
        <p className={`${styles.gradient_text} text-xs font-semibold`}>
          {`${type}#${moment(createdDate).format("MMMYYYY")}`}
        </p>
      </div>
      <p className="mb-8 h-10 overflow-hidden text-ellipsis text-center font-poppins-regular text-xs font-normal">
        {description}
      </p>
      <div className="text-center">
        <Image src={logo} height={12} />
      </div>
    </div>
  </div>
);

export { Badge };
