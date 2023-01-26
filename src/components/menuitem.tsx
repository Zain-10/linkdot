import Link from "next/link";
import type { PropsWithChildren } from "react";

interface MenuProps extends PropsWithChildren<{}> {
  title: string;
  disabled?: boolean;
  route: string;
  isActive?: boolean;
}

const MenuItem = ({
  title,
  disabled,
  route,
  children,
  isActive,
}: MenuProps) => {
  const style = `mb-6 flex items-center text-black opacity-20  ${
    isActive && "opacity-100"
  } ${disabled && "opacity-20 pointer-events-none"}`;
  return (
    <Link href={route}>
      <div>
        <button className={style}>
          {children}
          <p className="pl-6  text-lg font-bold leading-5">{title}</p>
        </button>
      </div>
    </Link>
  );
};

export { MenuItem };
