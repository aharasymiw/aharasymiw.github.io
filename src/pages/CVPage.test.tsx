import { describe, it, expect, beforeEach } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../foundation/ThemeProvider";
import { CVPage } from "./CVPage";

function renderPage() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <CVPage />
      </ThemeProvider>
    </MemoryRouter>,
  );
}

describe("CVPage", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders the page heading", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "CV" })).toBeInTheDocument();
  });

  it("renders a download link to the resume PDF", () => {
    renderPage();
    const link = screen.getByRole("link", { name: /download cv/i });
    expect(link).toHaveAttribute("href", "/andrew-harasymiw-resume.pdf");
    expect(link).toHaveAttribute("download", "andrew-harasymiw-resume.pdf");
  });

  it("renders work experience section", () => {
    renderPage();
    expect(screen.getByText("Key Work Experience")).toBeInTheDocument();
  });

  it("renders all three employers", () => {
    renderPage();
    expect(screen.getByText("Prime Digital Academy")).toBeInTheDocument();
    expect(screen.getByText("Augeo Marketing")).toBeInTheDocument();
    expect(screen.getByText("SPS Commerce")).toBeInTheDocument();
  });
});
