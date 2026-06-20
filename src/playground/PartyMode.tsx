import { useState, useEffect, useCallback } from "react";
import styles from "./PartyMode.module.css";

export function PartyMode() {
  const [active, setActive] = useState(false);

  const toggle = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  // Flag the app shell so a CSS keyframe animation owns the hue-rotate + bounce
  // (the compositor animates it) instead of writing inline styles every rAF
  // frame. The global prefers-reduced-motion rule neutralizes the animation for
  // users who opt out of motion.
  useEffect(() => {
    if (!active) return;
    const app = document.getElementById("app-shell");
    if (!app) return;
    app.dataset.party = "on";
    return () => {
      delete app.dataset.party;
    };
  }, [active]);

  return (
    <button
      className={`${styles.toggle}${active ? ` ${styles.active}` : ""}`}
      onClick={toggle}
      aria-label="Party mode"
      aria-pressed={active}
    >
      🧙
    </button>
  );
}
