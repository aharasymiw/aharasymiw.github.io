import { describe, it, expect } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("renders children in a vertical stack by default", () => {
    render(
      <Stack data-testid="stack">
        <div>A</div>
        <div>B</div>
      </Stack>,
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toBeInTheDocument();
    expect(stack.className).toContain("vertical");
  });

  it("renders horizontal when direction is row", () => {
    render(
      <Stack direction="row" data-testid="stack">
        <div>A</div>
      </Stack>,
    );
    expect(screen.getByTestId("stack").className).toContain("horizontal");
  });

  it("applies gap via inline style", () => {
    render(
      <Stack gap={4} data-testid="stack">
        <div>A</div>
      </Stack>,
    );
    const stack = screen.getByTestId("stack");
    expect(stack.style.gap).toBe("var(--space-4)");
  });
});
