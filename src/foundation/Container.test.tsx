import { describe, it, expect } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import { Container } from "./Container";

describe("Container", () => {
  it("renders children within a max-width wrapper", () => {
    render(<Container data-testid="container">Content</Container>);
    const el = screen.getByTestId("container");
    expect(el).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies the container class", () => {
    render(<Container data-testid="container">Content</Container>);
    expect(screen.getByTestId("container").className).toContain("container");
  });
});
