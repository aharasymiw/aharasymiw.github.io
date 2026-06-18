import { describe, it, expect, vi, beforeEach, afterEach } from "vite-plus/test";
import { render } from "@testing-library/react";
import { SpinningFavicon } from "./SpinningFavicon";

function setReducedMotion(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

function currentIcon() {
  return document.head.querySelector<HTMLLinkElement>('link[rel~="icon"]');
}

function addStaticFavicon() {
  const link = document.createElement("link");
  link.rel = "icon";
  link.setAttribute("type", "image/svg+xml");
  link.setAttribute("href", "/favicon.svg");
  document.head.appendChild(link);
}

describe("SpinningFavicon", () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    vi.useFakeTimers();
    document.head.querySelectorAll('link[rel~="icon"]').forEach((l) => l.remove());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    window.matchMedia = originalMatchMedia;
    document.head.querySelectorAll('link[rel~="icon"]').forEach((l) => l.remove());
  });

  it("renders nothing in the DOM", () => {
    setReducedMotion(true);
    const { container } = render(<SpinningFavicon />);
    expect(container).toBeEmptyDOMElement();
  });

  it("leaves the favicon untouched when reduced motion is preferred", () => {
    setReducedMotion(true);
    addStaticFavicon();

    render(<SpinningFavicon />);
    vi.advanceTimersByTime(1000);

    expect(currentIcon()?.getAttribute("href")).toBe("/favicon.svg");
  });

  it("swaps the favicon to rotated canvas frames, then restores on unmount", () => {
    setReducedMotion(false);

    // Stub canvas APIs jsdom doesn't implement.
    const ctxStub = {
      clearRect: vi.fn(),
      save: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      fillText: vi.fn(),
      restore: vi.fn(),
      font: "",
      textAlign: "",
      textBaseline: "",
    };
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
      ctxStub as unknown as ReturnType<HTMLCanvasElement["getContext"]>,
    );
    vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockReturnValue(
      "data:image/png;base64,STUB",
    );

    addStaticFavicon();
    const { unmount } = render(<SpinningFavicon />);

    // First frame drawn immediately on mount; static link replaced with a PNG one.
    expect(ctxStub.rotate).toHaveBeenCalled();
    expect(document.head.querySelectorAll('link[rel~="icon"]')).toHaveLength(1);
    expect(currentIcon()?.getAttribute("href")).toBe("data:image/png;base64,STUB");
    expect(currentIcon()?.getAttribute("type")).toBe("image/png");

    // Subsequent ticks keep redrawing.
    const callsAfterMount = ctxStub.rotate.mock.calls.length;
    vi.advanceTimersByTime(200);
    expect(ctxStub.rotate.mock.calls.length).toBeGreaterThan(callsAfterMount);

    // Cleanup restores the static SVG favicon.
    unmount();
    expect(currentIcon()?.getAttribute("href")).toBe("/favicon.svg");
    expect(currentIcon()?.getAttribute("type")).toBe("image/svg+xml");
  });
});
