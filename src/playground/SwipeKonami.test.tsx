import { describe, it, expect, vi, beforeEach, afterEach } from "vite-plus/test";
import { render, screen, act } from "@testing-library/react";
import { SwipeKonami } from "./SwipeKonami";

function touch(type: "touchstart" | "touchend", x: number, y: number) {
  const touchObj = { clientX: x, clientY: y, identifier: 0 };
  const event = new TouchEvent(type, {
    touches: type === "touchstart" ? [touchObj as Touch] : [],
    changedTouches: [touchObj as Touch],
  });
  window.dispatchEvent(event);
}

function swipe(dir: "up" | "down" | "left" | "right") {
  const start = { x: 200, y: 200 };
  const delta = 60;
  const end = { ...start };

  if (dir === "up") end.y -= delta;
  else if (dir === "down") end.y += delta;
  else if (dir === "left") end.x -= delta;
  else if (dir === "right") end.x += delta;

  touch("touchstart", start.x, start.y);
  touch("touchend", end.x, end.y);
}

function tap() {
  touch("touchstart", 200, 200);
  touch("touchend", 200, 200);
}

describe("SwipeKonami", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not render before activation", () => {
    render(<SwipeKonami />);
    expect(screen.queryByText(/Caught Red Thumbed/)).not.toBeInTheDocument();
  });

  it("renders achievement after swipe konami code", () => {
    render(<SwipeKonami />);
    act(() => {
      swipe("up");
      swipe("up");
      swipe("down");
      swipe("down");
      swipe("left");
      swipe("right");
      swipe("left");
      swipe("right");
      tap();
      tap();
    });
    expect(screen.getByText(/Caught Red Thumbed/)).toBeInTheDocument();
  });
});
