import { useEffect } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

// Gravy the chaos snail, spinning in the tab bar. Browsers render a static
// frame for animated SVG favicons, so the only way to actually spin him is to
// redraw a rotated frame to a canvas and swap the favicon each tick. We replace
// the whole <link rel="icon"> element (rather than mutate its href) because that
// is the pattern most likely to be picked up across browsers. Respects
// prefers-reduced-motion via the hook; when reduced, we leave the static SVG
// favicon (public/favicon.svg) in place. The redraw loop also pauses while the
// tab is hidden so it does no work (PNG encode + DOM swap) in background tabs.
//
// Reliability note: this animates in Chrome and Firefox. Safari has long been
// inconsistent about honouring JS-driven favicon changes, so it may keep showing
// the static snail — that's a Safari limitation, not a bug here.

const GRAVY = "🐌";
const SIZE = 64;
const FPS = 20;
const DEGREES_PER_FRAME = 7.2; // ~2.5s per full rotation at 20fps

function removeIconLinks() {
  document.head.querySelectorAll('link[rel~="icon"]').forEach((l) => l.remove());
}

function addIconLink(href: string, type: string | null) {
  const link = document.createElement("link");
  link.rel = "icon";
  if (type) link.type = type;
  link.href = href;
  document.head.appendChild(link);
}

export function SpinningFavicon() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // unsupported environment (e.g. jsdom)

    // Remember the static favicon so we can restore it on cleanup.
    const original = document.head.querySelector<HTMLLinkElement>('link[rel~="icon"]');
    const originalHref = original?.getAttribute("href") ?? null;
    const originalType = original?.getAttribute("type") ?? null;

    ctx.font = `${SIZE * 0.8}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let angle = 0;
    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.save();
      ctx.translate(SIZE / 2, SIZE / 2);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.fillText(GRAVY, 0, 0);
      ctx.restore();
      const href = canvas.toDataURL("image/png");
      removeIconLinks();
      addIconLink(href, "image/png");
      angle = (angle + DEGREES_PER_FRAME) % 360;
    };

    let id = 0;
    const startSpinning = () => {
      if (id) return;
      draw();
      id = window.setInterval(draw, 1000 / FPS);
    };
    const stopSpinning = () => {
      if (!id) return;
      window.clearInterval(id);
      id = 0;
    };
    // Don't burn CPU/battery redrawing a favicon nobody can see.
    const handleVisibility = () => {
      if (document.hidden) stopSpinning();
      else startSpinning();
    };

    if (!document.hidden) startSpinning();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      stopSpinning();
      removeIconLinks();
      if (originalHref) addIconLink(originalHref, originalType);
    };
  }, [reducedMotion]);

  return null;
}
