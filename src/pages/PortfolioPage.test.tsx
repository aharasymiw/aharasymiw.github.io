import { describe, it, expect, beforeEach } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../foundation/ThemeProvider";
import { PortfolioPage } from "./PortfolioPage";

function renderPage() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <PortfolioPage />
      </ThemeProvider>
    </MemoryRouter>,
  );
}

describe("PortfolioPage", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders the page heading", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "Portfolio" })).toBeInTheDocument();
  });

  it("renders projects section", () => {
    renderPage();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Web Apps")).toBeInTheDocument();
    expect(screen.getByText("Developer Education Tools")).toBeInTheDocument();
    expect(screen.getByText("Open Source")).toBeInTheDocument();
  });

  it("renders career themes", () => {
    renderPage();
    expect(screen.getByText("Career Themes")).toBeInTheDocument();
    expect(screen.getByText("Building Tools That Empower Others")).toBeInTheDocument();
    expect(screen.getByText("Leading Through Influence")).toBeInTheDocument();
  });
});
