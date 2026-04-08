import { describe, it, expect, beforeEach } from "vite-plus/test";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NavBar } from "./NavBar";
import { ThemeProvider } from "../foundation/ThemeProvider";

const links = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Speaking", href: "/speaking" },
];

function renderNavBar(currentPath = "/") {
  return render(
    <ThemeProvider>
      <NavBar links={links} currentPath={currentPath} siteName="Andrew Harasymiw" />
    </ThemeProvider>,
  );
}

describe("NavBar", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders site name", () => {
    renderNavBar();
    const header = screen.getByRole("banner");
    expect(header).toHaveTextContent("Andrew Harasymiw");
  });

  it("renders navigation links", () => {
    renderNavBar();
    const nav = within(screen.getByRole("navigation", { name: "Main" }));
    expect(nav.getByText("Home")).toBeInTheDocument();
    expect(nav.getByText("Portfolio")).toBeInTheDocument();
    expect(nav.getByText("Speaking")).toBeInTheDocument();
  });

  it("marks current page with aria-current", () => {
    renderNavBar("/");
    const nav = screen.getByRole("navigation", { name: "Main" });
    const homeLink = within(nav).getByText("Home").closest("a")!;
    expect(homeLink).toHaveAttribute("aria-current", "page");
  });

  it("renders theme toggle button", () => {
    renderNavBar();
    expect(screen.getByRole("button", { name: /theme/i })).toBeInTheDocument();
  });

  it("toggles theme when toggle is clicked", async () => {
    const user = userEvent.setup();
    renderNavBar();
    const toggle = screen.getByRole("button", { name: /theme/i });
    await user.click(toggle);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
