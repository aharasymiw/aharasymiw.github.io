import { describe, it, expect, vi, beforeEach, afterEach } from "vite-plus/test";
import { render, screen, act } from "@testing-library/react";
import { GravySnail } from "./GravySnail";

describe("GravySnail", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("does not render when not idle", () => {
    render(<GravySnail />);
    expect(screen.queryByLabelText("Gravy the snail", { selector: "*" })).not.toBeInTheDocument();
  });

  it("appears after idle timeout", () => {
    const { container } = render(<GravySnail idleTimeout={1000} />);
    act(() => {
      vi.advanceTimersByTime(1001);
    });
    const snail = container.querySelector('[aria-label="Gravy the snail"]');
    expect(snail).toBeInTheDocument();
  });

  it("is aria-hidden", () => {
    const { container } = render(<GravySnail idleTimeout={1000} />);
    act(() => {
      vi.advanceTimersByTime(1001);
    });
    const snail = container.querySelector('[aria-label="Gravy the snail"]');
    expect(snail!.closest("[aria-hidden]")).toHaveAttribute("aria-hidden", "true");
  });
});
