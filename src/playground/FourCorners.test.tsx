import { describe, it, expect, vi, beforeEach, afterEach } from "vite-plus/test";
import { render, screen, act } from "@testing-library/react";
import { FourCorners } from "./FourCorners";

function touchAt(x: number, y: number) {
  const touchObj = { clientX: x, clientY: y, identifier: 0 };
  const event = new TouchEvent("touchstart", {
    touches: [touchObj as Touch],
    changedTouches: [touchObj as Touch],
  });
  window.dispatchEvent(event);
}

describe("FourCorners", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(window, "innerWidth", { value: 400, writable: true });
    Object.defineProperty(window, "innerHeight", { value: 800, writable: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not render before activation", () => {
    render(<FourCorners />);
    expect(screen.queryByText(/Boundary Breaker/)).not.toBeInTheDocument();
  });

  it("renders achievement after tapping four corners clockwise", () => {
    render(<FourCorners />);
    act(() => {
      touchAt(10, 10); // TL
      touchAt(390, 10); // TR
      touchAt(390, 790); // BR
      touchAt(10, 790); // BL
    });
    expect(screen.getByText(/Boundary Breaker/)).toBeInTheDocument();
  });
});
