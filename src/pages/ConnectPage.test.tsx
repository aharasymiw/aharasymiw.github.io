import { describe, it, expect, beforeEach } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../foundation/ThemeProvider";
import { ConnectPage } from "./ConnectPage";

function renderPage() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <ConnectPage />
      </ThemeProvider>
    </MemoryRouter>,
  );
}

describe("ConnectPage", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders the page heading", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "Let's Connect" })).toBeInTheDocument();
  });

  it("renders what I'm looking for section", () => {
    renderPage();
    expect(screen.getByText("What I'm Looking For")).toBeInTheDocument();
    expect(screen.getByText(/Create educational content/)).toBeInTheDocument();
  });

  it("renders contact methods", () => {
    renderPage();
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
    expect(screen.getByText("aharasymiw@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("meet.aharasymiw.com")).toBeInTheDocument();
    expect(screen.getByText("github.com/aharasymiw")).toBeInTheDocument();
    expect(screen.getByText("linkedin.com/in/aharasymiw")).toBeInTheDocument();
  });

  it("renders services section", () => {
    renderPage();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Speaking")).toBeInTheDocument();
    expect(screen.getByText("Workshops")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("DevRel")).toBeInTheDocument();
  });
});
