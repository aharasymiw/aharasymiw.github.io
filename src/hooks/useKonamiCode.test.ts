import { describe, it, expect } from "vite-plus/test";
import { renderHook, act } from "@testing-library/react";
import { useKonamiCode } from "./useKonamiCode";

describe("useKonamiCode", () => {
  it("returns false initially", () => {
    const { result } = renderHook(() => useKonamiCode());
    expect(result.current).toBe(false);
  });

  it("returns true after Konami sequence", () => {
    const { result } = renderHook(() => useKonamiCode());
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
    expect(result.current).toBe(true);
  });
});
