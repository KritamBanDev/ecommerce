import { useEffect, useRef } from "react";

function useOutsideClick<T extends HTMLElement = HTMLElement>(handler: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handler]);

  return ref;
}

export default useOutsideClick;
