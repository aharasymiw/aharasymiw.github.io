import { useEffect, useState } from "react";
import styles from "./SunsetTransition.module.css";

interface SunsetTransitionProps {
  active: boolean;
  direction: "dark" | "light";
}

export function SunsetTransition({ active, direction }: SunsetTransitionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 300);
    return () => clearTimeout(timer);
  }, [active]);

  if (!visible) return null;

  return (
    <div
      data-testid="sunset-overlay"
      className={`${styles.overlay} ${direction === "dark" ? styles.sunset : styles.sunrise}`}
      aria-hidden="true"
    />
  );
}
