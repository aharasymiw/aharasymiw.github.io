import { describe, it, expect } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import { SunsetTransition } from "./SunsetTransition";

describe("SunsetTransition", () => {
  it("renders nothing when not transitioning", () => {
    render(<SunsetTransition active={false} direction="dark" />);
    expect(screen.queryByTestId("sunset-overlay")).not.toBeInTheDocument();
  });

  it("renders overlay when active", () => {
    render(<SunsetTransition active={true} direction="dark" />);
    expect(screen.getByTestId("sunset-overlay")).toBeInTheDocument();
  });

  it("overlay is aria-hidden", () => {
    render(<SunsetTransition active={true} direction="dark" />);
    expect(screen.getByTestId("sunset-overlay")).toHaveAttribute("aria-hidden", "true");
  });
});
