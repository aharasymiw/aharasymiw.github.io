import { describe, it, expect, vi, beforeEach, afterEach } from "vite-plus/test";
import { render, screen, act } from "@testing-library/react";
import { KonamiConfetti } from "./KonamiConfetti";

describe("KonamiConfetti", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not render confetti before activation", () => {
    render(<KonamiConfetti />);
    expect(screen.queryByText(/Caught Red Handed/)).not.toBeInTheDocument();
  });

  it("renders confetti and announcement after Konami code", () => {
    render(<KonamiConfetti />);
    const keys = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    act(() => {
      keys.forEach((key) => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key }));
      });
    });
    expect(screen.getByText(/Caught Red Handed/)).toBeInTheDocument();
  });
});
