import { describe, it, expect, vi, beforeEach, afterEach } from "vite-plus/test";
import { render, screen, act } from "@testing-library/react";
import { SecretKnock } from "./SecretKnock";

function dispatchTouch(type: "touchstart" | "touchend") {
  const touchObj = { clientX: 200, clientY: 200, identifier: 0 };
  const event = new TouchEvent(type, {
    touches: type === "touchstart" ? [touchObj as Touch] : [],
    changedTouches: [touchObj as Touch],
  });
  window.dispatchEvent(event);
}

function shortTap() {
  dispatchTouch("touchstart");
  vi.advanceTimersByTime(100);
  dispatchTouch("touchend");
  vi.advanceTimersByTime(100);
}

function longTap() {
  dispatchTouch("touchstart");
  vi.advanceTimersByTime(400);
  dispatchTouch("touchend");
  vi.advanceTimersByTime(100);
}

describe("SecretKnock", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not render before activation", () => {
    render(<SecretKnock />);
    expect(screen.queryByText(/Secret Handshake/)).not.toBeInTheDocument();
  });

  it("renders achievement after correct knock pattern", () => {
    render(<SecretKnock />);
    act(() => {
      shortTap(); // short
      shortTap(); // short
      longTap(); // long
      shortTap(); // short
      longTap(); // long
    });
    expect(screen.getByText(/Secret Handshake/)).toBeInTheDocument();
  });
});
