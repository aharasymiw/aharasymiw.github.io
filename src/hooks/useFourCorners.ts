import { useState, useEffect, useCallback } from "react";

type Corner = "TL" | "TR" | "BR" | "BL";

const SEQUENCE: Corner[] = ["TL", "TR", "BR", "BL"];
const CORNER_ZONE = 80;
const TIMEOUT = 3000;

export function useFourCorners(): [boolean, () => void] {
  const [activated, setActivated] = useState(false);
  const reset = useCallback(() => setActivated(false), []);

  useEffect(() => {
    const buffer: Corner[] = [];
    let timer: ReturnType<typeof setTimeout> | null = null;

    function getCorner(x: number, y: number): Corner | null {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const isLeft = x < CORNER_ZONE;
      const isRight = x > w - CORNER_ZONE;
      const isTop = y < CORNER_ZONE;
      const isBottom = y > h - CORNER_ZONE;

      if (isTop && isLeft) return "TL";
      if (isTop && isRight) return "TR";
      if (isBottom && isRight) return "BR";
      if (isBottom && isLeft) return "BL";
      return null;
    }

    function resetBuffer() {
      buffer.length = 0;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }

    function handleTouch(e: TouchEvent) {
      const touch = e.touches[0];
      const corner = getCorner(touch.clientX, touch.clientY);

      if (!corner) {
        resetBuffer();
        return;
      }

      const expected = SEQUENCE[buffer.length];
      if (corner !== expected) {
        resetBuffer();
        if (corner === SEQUENCE[0]) {
          buffer.push(corner);
          timer = setTimeout(resetBuffer, TIMEOUT);
        }
        return;
      }

      buffer.push(corner);

      if (buffer.length === 1) {
        timer = setTimeout(resetBuffer, TIMEOUT);
      }

      if (buffer.length === SEQUENCE.length) {
        setActivated(true);
        resetBuffer();
      }
    }

    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouch);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return [activated, reset];
}
