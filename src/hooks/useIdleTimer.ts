import { useState, useEffect } from "react";

export function useIdleTimer(timeout: number): boolean {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setIdle(true), timeout);

    const handleActivity = () => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), timeout);
    };

    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    // These listeners never call preventDefault, so mark them passive to let the
    // browser scroll/touch without waiting on them.
    const options: AddEventListenerOptions = { passive: true };
    events.forEach((e) => window.addEventListener(e, handleActivity, options));

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, handleActivity, options));
    };
  }, [timeout]);

  return idle;
}
