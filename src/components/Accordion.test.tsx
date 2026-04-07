import { describe, it, expect } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion, AccordionItem } from "./Accordion";

describe("Accordion", () => {
  const items = (
    <Accordion>
      <AccordionItem title="Item 1">Content 1</AccordionItem>
      <AccordionItem title="Item 2">Content 2</AccordionItem>
    </Accordion>
  );

  it("renders all item titles", () => {
    render(items);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("hides content by default", () => {
    render(items);
    expect(screen.queryByText("Content 1")).not.toBeVisible();
  });

  it("expands content on click", async () => {
    const user = userEvent.setup();
    render(items);
    await user.click(screen.getByText("Item 1"));
    expect(screen.getByText("Content 1")).toBeVisible();
  });

  it("collapses content on second click", async () => {
    const user = userEvent.setup();
    render(items);
    await user.click(screen.getByText("Item 1"));
    await user.click(screen.getByText("Item 1"));
    expect(screen.queryByText("Content 1")).not.toBeVisible();
  });

  it("sets aria-expanded correctly", async () => {
    const user = userEvent.setup();
    render(items);
    const trigger = screen.getByText("Item 1").closest("button")!;
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("supports keyboard navigation with Enter", async () => {
    const user = userEvent.setup();
    render(items);
    const trigger = screen.getByText("Item 1").closest("button")!;
    trigger.focus();
    await user.keyboard("{Enter}");
    expect(screen.getByText("Content 1")).toBeVisible();
  });

  it("supports keyboard navigation with Space", async () => {
    const user = userEvent.setup();
    render(items);
    const trigger = screen.getByText("Item 1").closest("button")!;
    trigger.focus();
    await user.keyboard(" ");
    expect(screen.getByText("Content 1")).toBeVisible();
  });
});
