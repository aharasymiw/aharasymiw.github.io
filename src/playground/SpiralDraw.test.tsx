import { describe, it, expect, vi, beforeEach, afterEach } from "vite-plus/test";
import { render, screen, act } from "@testing-library/react";
import { SpiralDraw } from "./SpiralDraw";

function touchStart(x: number, y: number) {
  const touchObj = { clientX: x, clientY: y, identifier: 0 };
  window.dispatchEvent(
    new TouchEvent("touchstart", {
      touches: [touchObj as Touch],
      changedTouches: [touchObj as Touch],
    }),
  );
}

function touchMove(x: number, y: number) {
  const touchObj = { clientX: x, clientY: y, identifier: 0 };
  window.dispatchEvent(
    new TouchEvent("touchmove", {
      touches: [touchObj as Touch],
      changedTouches: [touchObj as Touch],
    }),
  );
}

describe("SpiralDraw", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not render before activation", () => {
    render(<SpiralDraw />);
    expect(screen.queryByText(/Shell Seeker/)).not.toBeInTheDocument();
  });

  it("renders achievement after drawing a spiral", () => {
    render(<SpiralDraw />);

    // Generate spiral points: 2 full rotations, radius expanding from 20 to 80
    const cx = 200;
    const cy = 200;
    const steps = 60;

    act(() => {
      touchStart(cx + 20, cy);

      for (let i = 1; i <= steps; i++) {
        const angle = (i / steps) * Math.PI * 4; // 2 full rotations
        const radius = 20 + (i / steps) * 60;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        touchMove(x, y);
      }
    });

    expect(screen.getByText(/Shell Seeker/)).toBeInTheDocument();
  });
});
