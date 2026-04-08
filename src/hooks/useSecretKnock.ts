import { useState, useEffect, useCallback } from "react";

type TapType = "short" | "long";

const PATTERN: TapType[] = ["short", "short", "long", "short", "long"];
const SHORT_MAX = 200;
const LONG_MIN = 300;
const LONG_MAX = 800;
const GAP_MAX = 600;

export function useSecretKnock(): [boolean, () => void] {
  const [activated, setActivated] = useState(false);
  const reset = useCallback(() => setActivated(false), []);

  useEffect(() => {
    const buffer: TapType[] = [];
    let touchStartTime = 0;
    let lastTapEnd = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    function resetBuffer() {
      buffer.length = 0;
      touchStartTime = 0;
      lastTapEnd = 0;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }

    function handleStart() {
      const now = Date.now();

      if (lastTapEnd > 0 && now - lastTapEnd > GAP_MAX) {
        resetBuffer();
      }

      touchStartTime = now;
    }

    function handleEnd() {
      if (touchStartTime === 0) return;

      const duration = Date.now() - touchStartTime;
      let tapType: TapType | null = null;

      if (duration <= SHORT_MAX) {
        tapType = "short";
      } else if (duration >= LONG_MIN && duration <= LONG_MAX) {
        tapType = "long";
      }

      if (!tapType) {
        resetBuffer();
        return;
      }

      const expected = PATTERN[buffer.length];
      if (tapType !== expected) {
        resetBuffer();
        return;
      }

      buffer.push(tapType);
      lastTapEnd = Date.now();

      if (timer) clearTimeout(timer);
      timer = setTimeout(resetBuffer, GAP_MAX);

      if (buffer.length === PATTERN.length) {
        setActivated(true);
        resetBuffer();
      }
    }

    window.addEventListener("touchstart", handleStart, { passive: true });
    window.addEventListener("touchend", handleEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleStart);
      window.removeEventListener("touchend", handleEnd);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return [activated, reset];
}
