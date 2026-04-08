import { useState, useEffect, useCallback } from "react";

const MIN_ANGLE = Math.PI * 3; // 1.5 full rotations
const SAMPLE_DISTANCE = 10; // min px between samples

export function useSpiralDraw(): [boolean, () => void] {
  const [activated, setActivated] = useState(false);
  const reset = useCallback(() => setActivated(false), []);

  useEffect(() => {
    let points: { x: number; y: number }[] = [];
    let cumulativeAngle = 0;
    let lastAngle: number | null = null;
    let tracking = false;

    function handleStart(e: TouchEvent) {
      const touch = e.touches[0];
      points = [{ x: touch.clientX, y: touch.clientY }];
      cumulativeAngle = 0;
      lastAngle = null;
      tracking = true;
    }

    function handleMove(e: TouchEvent) {
      if (!tracking) return;

      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;

      const last = points[points.length - 1];
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < SAMPLE_DISTANCE) return;

      points.push({ x, y });

      if (points.length < 5) return;

      // Compute centroid of all points so far
      let cx = 0;
      let cy = 0;
      for (const p of points) {
        cx += p.x;
        cy += p.y;
      }
      cx /= points.length;
      cy /= points.length;

      // Angle from centroid to current point
      const angle = Math.atan2(y - cy, x - cx);

      if (lastAngle !== null) {
        let delta = angle - lastAngle;

        // Normalize to [-PI, PI]
        while (delta > Math.PI) delta -= 2 * Math.PI;
        while (delta < -Math.PI) delta += 2 * Math.PI;

        cumulativeAngle += delta;
      }

      lastAngle = angle;

      if (Math.abs(cumulativeAngle) >= MIN_ANGLE) {
        setActivated(true);
        tracking = false;
      }
    }

    function handleEnd() {
      tracking = false;
      points = [];
      cumulativeAngle = 0;
      lastAngle = null;
    }

    window.addEventListener("touchstart", handleStart, { passive: true });
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("touchend", handleEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleStart);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, []);

  return [activated, reset];
}
