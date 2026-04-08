import { describe, it, expect } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PartyMode } from "./PartyMode";

describe("PartyMode", () => {
  it("renders a toggle button", () => {
    render(<PartyMode />);
    expect(screen.getByRole("button", { name: /party mode/i })).toBeInTheDocument();
  });

  it("toggles aria-pressed on click", async () => {
    const user = userEvent.setup();
    render(<PartyMode />);
    const btn = screen.getByRole("button", { name: /party mode/i });
    expect(btn).toHaveAttribute("aria-pressed", "false");
    await user.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
  });

  it("toggles aria-pressed off on second click", async () => {
    const user = userEvent.setup();
    render(<PartyMode />);
    const btn = screen.getByRole("button", { name: /party mode/i });
    await user.click(btn);
    await user.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "false");
  });
});
