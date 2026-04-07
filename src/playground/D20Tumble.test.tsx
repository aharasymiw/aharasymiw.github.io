import { describe, it, expect } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { D20Tumble } from "./D20Tumble";

describe("D20Tumble", () => {
  it("renders children", () => {
    render(<D20Tumble>D&D reference</D20Tumble>);
    expect(screen.getByText("D&D reference")).toBeInTheDocument();
  });

  it("shows d20 on hover", async () => {
    const user = userEvent.setup();
    render(<D20Tumble>Hover me</D20Tumble>);
    await user.hover(screen.getByText("Hover me"));
    expect(screen.getByText("🎲")).toBeInTheDocument();
  });

  it("d20 is aria-hidden", async () => {
    const user = userEvent.setup();
    render(<D20Tumble>Hover me</D20Tumble>);
    await user.hover(screen.getByText("Hover me"));
    expect(screen.getByText("🎲")).toHaveAttribute("aria-hidden", "true");
  });
});
