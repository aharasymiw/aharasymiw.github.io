import { useState, type ReactNode } from "react";
import styles from "./D20Tumble.module.css";

interface D20TumbleProps {
  children: ReactNode;
}

export function D20Tumble({ children }: D20TumbleProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {children}
      {hovering && (
        <span className={styles.die} aria-hidden="true">
          🎲
        </span>
      )}
    </span>
  );
}
