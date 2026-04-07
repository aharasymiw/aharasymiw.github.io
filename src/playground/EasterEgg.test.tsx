import { describe, it, expect, vi } from "vite-plus/test";
import { render, screen, act } from "@testing-library/react";
import { EasterEgg } from "./EasterEgg";

describe("EasterEgg", () => {
  it("does not render children when not triggered", () => {
    render(
      <EasterEgg trigger={{ type: "clickCount", count: 5, targetSelector: "#logo" }}>
        <div>Secret!</div>
      </EasterEgg>,
    );
    expect(screen.queryByText("Secret!")).not.toBeInTheDocument();
  });

  it("renders children when triggered via idle", async () => {
    vi.useFakeTimers();
    render(
      <EasterEgg trigger={{ type: "idle", duration: 1000 }}>
        <div>Secret!</div>
      </EasterEgg>,
    );
    act(() => {
      vi.advanceTimersByTime(1001);
    });
    expect(screen.getByText("Secret!")).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("announces via aria-live when triggered", () => {
    vi.useFakeTimers();
    render(
      <EasterEgg trigger={{ type: "idle", duration: 1000 }} announcement="Easter egg found!">
        <div>Secret!</div>
      </EasterEgg>,
    );
    act(() => {
      vi.advanceTimersByTime(1001);
    });
    expect(screen.getByText("Easter egg found!")).toBeInTheDocument();
    vi.useRealTimers();
  });
});
