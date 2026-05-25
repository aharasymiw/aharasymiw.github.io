import { describe, it, expect } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { YouTubeEmbed } from "./YouTubeEmbed";

describe("YouTubeEmbed", () => {
  const baseProps = {
    videoId: "dQw4w9WgXcQ",
    title: "Sample Talk",
    duration: "12:34",
  };

  it("renders a thumbnail and play button by default (no iframe)", () => {
    render(<YouTubeEmbed {...baseProps} />);
    const button = screen.getByRole("button", {
      name: /play video: sample talk \(12:34\)/i,
    });
    expect(button).toBeInTheDocument();
    const img = button.querySelector("img");
    expect(img?.getAttribute("src")).toContain("dQw4w9WgXcQ");
    expect(img?.getAttribute("src")).toContain("hqdefault.jpg");
    expect(document.querySelector("iframe")).toBeNull();
  });

  it("renders title heading and duration badge", () => {
    render(<YouTubeEmbed {...baseProps} />);
    expect(screen.getByRole("heading", { name: "Sample Talk" })).toBeInTheDocument();
    expect(screen.getByText("12:34")).toBeInTheDocument();
  });

  it("renders the 'Open on YouTube' fallback link", () => {
    render(<YouTubeEmbed {...baseProps} />);
    const link = screen.getByRole("link", { name: /open on youtube/i });
    expect(link).toHaveAttribute("href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
  });

  it("swaps to an autoplay iframe on click", async () => {
    const user = userEvent.setup();
    render(<YouTubeEmbed {...baseProps} />);
    await user.click(screen.getByRole("button", { name: /play video/i }));
    const iframe = document.querySelector("iframe");
    expect(iframe).not.toBeNull();
    expect(iframe!.getAttribute("src")).toContain("youtube-nocookie.com/embed/dQw4w9WgXcQ");
    expect(iframe!.getAttribute("src")).toContain("autoplay=1");
    expect(iframe!.getAttribute("title")).toBe("Sample Talk");
    expect(screen.queryByRole("button", { name: /play video/i })).not.toBeInTheDocument();
  });

  it("activates via keyboard (Enter)", async () => {
    const user = userEvent.setup();
    render(<YouTubeEmbed {...baseProps} />);
    const button = screen.getByRole("button", { name: /play video/i });
    button.focus();
    await user.keyboard("{Enter}");
    expect(document.querySelector("iframe")).not.toBeNull();
  });

  it("activates via keyboard (Space)", async () => {
    const user = userEvent.setup();
    render(<YouTubeEmbed {...baseProps} />);
    const button = screen.getByRole("button", { name: /play video/i });
    button.focus();
    await user.keyboard(" ");
    expect(document.querySelector("iframe")).not.toBeNull();
  });

  it("keeps multiple embeds independent", async () => {
    const user = userEvent.setup();
    render(
      <>
        <YouTubeEmbed videoId="aaaaaaaaaaa" title="First" duration="1:00" />
        <YouTubeEmbed videoId="bbbbbbbbbbb" title="Second" duration="2:00" />
      </>,
    );
    await user.click(screen.getByRole("button", { name: /play video: first/i }));
    const iframes = document.querySelectorAll("iframe");
    expect(iframes.length).toBe(1);
    expect(iframes[0].getAttribute("src")).toContain("aaaaaaaaaaa");
    expect(screen.getByRole("button", { name: /play video: second/i })).toBeInTheDocument();
  });

  it("includes start parameter when startSeconds is provided", async () => {
    const user = userEvent.setup();
    render(<YouTubeEmbed {...baseProps} startSeconds={42} />);
    await user.click(screen.getByRole("button", { name: /play video/i }));
    const iframe = document.querySelector("iframe")!;
    expect(iframe.getAttribute("src")).toContain("start=42");
  });
});
