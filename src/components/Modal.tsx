import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren<{}> {
  show: boolean;
}

const Modal = ({ show, children }: Props) => {
  return (
    <>
      {show && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-sm">
              {children}
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      )}
    </>
  );
};

export { Modal };
