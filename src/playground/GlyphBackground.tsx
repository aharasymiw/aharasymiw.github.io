import type { CSSProperties } from "react";
import styles from "./GlyphBackground.module.css";

interface GlyphBackgroundProps {
  glyph: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export function GlyphBackground({ glyph, top, right, bottom, left }: GlyphBackgroundProps) {
  const style: CSSProperties = {
    top: top ?? "-20px",
    right: right ?? "-10px",
    bottom,
    left,
    pointerEvents: "none",
  };

  return (
    <span className={styles.glyph} style={style} aria-hidden="true">
      {glyph}
    </span>
  );
}
