import { describe, it, expect, beforeEach } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../foundation/ThemeProvider";
import { ProjectsPage } from "./ProjectsPage";

function renderPage() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <ProjectsPage />
      </ThemeProvider>
    </MemoryRouter>,
  );
}

describe("ProjectsPage", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders the page heading", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "Recent Projects" })).toBeInTheDocument();
  });

  it("renders all three projects", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "Darkhold" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "meet.aharasymiw.com" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Less Lately" })).toBeInTheDocument();
  });

  it("marks Darkhold as private alpha with no link", () => {
    renderPage();
    expect(screen.getByText("Private alpha")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /darkhold/i })).toBeNull();
  });

  it("links to meet.aharasymiw.com optimistically", () => {
    renderPage();
    const meet = screen.getByRole("link", { name: /meet\.aharasymiw\.com/i });
    expect(meet).toHaveAttribute("href", "https://meet.aharasymiw.com");
  });

  it("links to lesslately.com", () => {
    renderPage();
    const lessLately = screen.getByRole("link", { name: /lesslately\.com/i });
    expect(lessLately).toHaveAttribute("href", "https://www.lesslately.com");
  });
});
