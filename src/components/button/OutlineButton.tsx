import type { PropsWithChildren } from "react";

interface OutlineButtonProps extends PropsWithChildren<{}> {
  onClick?: () => void;
}

const OutlineButton = ({ children, onClick }: OutlineButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="primaryHover h-full rounded-sm border border-black px-7 py-1 text-sm font-bold"
    >
      {children}
    </div>
  );
};

export default OutlineButton;
