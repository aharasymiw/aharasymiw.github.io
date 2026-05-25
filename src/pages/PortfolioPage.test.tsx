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
    expect(
      screen.getByRole("heading", { name: "Developer Advocate Portfolio" }),
    ).toBeInTheDocument();
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

  it("renders the Selected Recordings section with all 7 videos", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "Selected Recordings" })).toBeInTheDocument();
    const expectedSlugs = [
      "passkeys",
      "api-keys",
      "toastmasters",
      "neon",
      "mac",
      "demo-forms",
      "saga-garden",
    ];
    for (const slug of expectedSlugs) {
      expect(document.getElementById(`video-${slug}`)).not.toBeNull();
    }
    expect(screen.getAllByRole("button", { name: /play video/i })).toHaveLength(7);
  });
});
