import { describe, it, expect } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PartyMode } from "./PartyMode";

describe("PartyMode", () => {
  it("renders a toggle button", () => {
    render(<PartyMode />);
    expect(screen.getByRole("button", { name: /party mode/i })).toBeInTheDocument();
  });

  it("toggles party mode on click", async () => {
    const user = userEvent.setup();
    const app = document.createElement("div");
    app.id = "app";
    document.body.appendChild(app);
    render(<PartyMode />, { container: app });
    const btn = screen.getByRole("button", { name: /party mode/i });
    await user.click(btn);
    expect(app.getAttribute("data-party")).toBe("true");
    document.body.removeChild(app);
  });

  it("toggles party mode off on second click", async () => {
    const user = userEvent.setup();
    const app = document.createElement("div");
    app.id = "app";
    document.body.appendChild(app);
    render(<PartyMode />, { container: app });
    const btn = screen.getByRole("button", { name: /party mode/i });
    await user.click(btn);
    await user.click(btn);
    expect(app.getAttribute("data-party")).toBe("false");
    document.body.removeChild(app);
  });
});
