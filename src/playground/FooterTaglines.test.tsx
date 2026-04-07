import { describe, it, expect } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FooterTaglines } from "./FooterTaglines";

const taglines = [
  "Made with caffeine and natural 20s",
  "No frameworks were harmed",
  "Rolled a nat 20 on web development",
];

describe("FooterTaglines", () => {
  it("renders the year", () => {
    render(<FooterTaglines year={2026} taglines={taglines} />);
    expect(screen.getByText("2026")).toBeInTheDocument();
  });

  it("cycles to next tagline on year click", async () => {
    const user = userEvent.setup();
    render(<FooterTaglines year={2026} taglines={taglines} />);
    await user.click(screen.getByText("2026"));
    expect(screen.getByText(taglines[0])).toBeInTheDocument();
  });

  it("cycles through all taglines", async () => {
    const user = userEvent.setup();
    render(<FooterTaglines year={2026} taglines={taglines} />);
    await user.click(screen.getByText("2026"));
    expect(screen.getByText(taglines[0])).toBeInTheDocument();
    await user.click(screen.getByText("2026"));
    expect(screen.getByText(taglines[1])).toBeInTheDocument();
    await user.click(screen.getByText("2026"));
    expect(screen.getByText(taglines[2])).toBeInTheDocument();
  });
});
