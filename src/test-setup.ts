import { afterEach, expect, vi } from "vite-plus/test";
import { cleanup } from "@testing-library/react";

// jest-dom calls expect.extend() at module init time, so we must set globalThis.expect
// before it loads. Since ESM imports are hoisted, we set the global here and use a
// dynamic import below to ensure ordering.
(globalThis as Record<string, unknown>).expect = expect;

// @testing-library/react auto-cleanup relies on afterEach being a global.
// Since globals: false, we wire it up explicitly.
afterEach(() => {
  cleanup();
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore – jest-dom types are ambient-only; dynamic import is needed to ensure
// globalThis.expect is set before the module's expect.extend() call runs.
await import("@testing-library/jest-dom");

// Mock IntersectionObserver for jsdom
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor() {}
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock window.matchMedia for jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
