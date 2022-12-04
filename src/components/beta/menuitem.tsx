import Link from "next/link";
import type { PropsWithChildren } from "react";

interface MenuProps extends PropsWithChildren<{}> {
  title: string;
  disabled?: boolean;
  route: string;
}

const MenuItem = ({ title, disabled, route, children }: MenuProps) => {
  return (
    <Link href={route}>
      <div>
        <button
          className={`mb-6 flex items-center text-black ${
            disabled ? "pointer-events-none opacity-20" : "opacity-80"
          }`}
        >
          {children}
          <p className="pl-6  text-lg font-bold leading-5">{title}</p>
        </button>
      </div>
    </Link>
  );
};

export { MenuItem };
