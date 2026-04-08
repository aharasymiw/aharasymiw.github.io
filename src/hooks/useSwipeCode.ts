import { useState, useEffect, useCallback } from "react";

type Direction = "up" | "down" | "left" | "right" | "tap";

const SWIPE_KONAMI: Direction[] = [
  "up",
  "up",
  "down",
  "down",
  "left",
  "right",
  "left",
  "right",
  "tap",
  "tap",
];

const MIN_SWIPE = 50;
const MAX_CROSS = 30;
const MAX_TAP_MOVE = 20;
const TAP_WINDOW = 300;

export function useSwipeCode(): [boolean, () => void] {
  const [activated, setActivated] = useState(false);
  const reset = useCallback(() => setActivated(false), []);

  useEffect(() => {
    const buffer: Direction[] = [];
    let startX = 0;
    let startY = 0;
    let startTime = 0;

    function getDirection(dx: number, dy: number, elapsed: number): Direction | null {
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDx < MAX_TAP_MOVE && absDy < MAX_TAP_MOVE && elapsed < TAP_WINDOW) {
        return "tap";
      }

      if (absDy >= MIN_SWIPE && absDx < MAX_CROSS) {
        return dy < 0 ? "up" : "down";
      }
      if (absDx >= MIN_SWIPE && absDy < MAX_CROSS) {
        return dx < 0 ? "left" : "right";
      }

      return null;
    }

    function handleStart(e: TouchEvent) {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startTime = Date.now();
    }

    function handleEnd(e: TouchEvent) {
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      const elapsed = Date.now() - startTime;

      const dir = getDirection(dx, dy, elapsed);
      if (!dir) return;

      buffer.push(dir);
      if (buffer.length > SWIPE_KONAMI.length) buffer.shift();

      if (buffer.length === SWIPE_KONAMI.length && buffer.every((d, i) => d === SWIPE_KONAMI[i])) {
        setActivated(true);
        buffer.length = 0;
      }
    }

    window.addEventListener("touchstart", handleStart, { passive: true });
    window.addEventListener("touchend", handleEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleStart);
      window.removeEventListener("touchend", handleEnd);
    };
  }, []);

  return [activated, reset];
}
