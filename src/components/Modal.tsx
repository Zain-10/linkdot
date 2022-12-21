import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

interface Props extends PropsWithChildren<{}> {
  show: boolean;
  showClose?: boolean;
}

const Modal = ({ show, children, showClose }: Props) => {
  const [showModal, setShowModal] = useState(show);

  const setClosedFor24Hrs = () => {
    setShowModal(false);
    // save to local storage to show modal again after 24 hours
    const expires = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem("emailSkipValidity", expires.toString());
  };
  useEffect(() => {
    // TODO: `showModal` not updating without useEffect
    setShowModal(show);
  }, [show]);

  return (
    <>
      {showModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-sm">
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white px-12 pt-20 pb-12 shadow-lg outline-none focus:outline-none">
                {children}
                {showClose && (
                  <div className="mt-8 flex items-center justify-end">
                    <button
                      className="background-transparent rounded p-1 text-sm font-normal outline-none transition-all duration-150 ease-linear hover:bg-purple-200 focus:outline-none"
                      type="button"
                      onClick={() => setClosedFor24Hrs()}
                    >
                      Skip
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      )}
    </>
  );
};

export { Modal };
