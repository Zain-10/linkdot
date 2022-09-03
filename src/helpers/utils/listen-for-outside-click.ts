import type { Ref } from "react";

export default function listenForOutsideClicks(
  listening: boolean,
  setListening: Function,
  // @ts-ignore
  menuRef: Ref,
  setIsOpen: Function
) {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach(() => {
      document.addEventListener(`click`, (evt) => {
        const cur = menuRef.current;
        const node = evt.target;
        if (cur && cur.contains(node)) return;
        setIsOpen(false);
      });
    });
  };
}
