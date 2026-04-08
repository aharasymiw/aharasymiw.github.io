import { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./PartyMode.module.css";

export function PartyMode() {
  const [active, setActive] = useState(false);
  const reducedMotion = useReducedMotion();
  const rafRef = useRef<number>(0);

  const toggle = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!active) {
      const app = document.getElementById("app");
      if (app) {
        app.style.filter = "";
        app.style.transform = "";
      }
      return;
    }

    const app = document.getElementById("app");
    if (!app) return;

    const hueSpeed = reducedMotion ? 90 : 180;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = (timestamp - start) / 1000;

      const hue = (elapsed * hueSpeed) % 360;
      app.style.filter = `hue-rotate(${hue}deg)`;

      if (!reducedMotion) {
        const bounce = Math.sin(elapsed * Math.PI * 2) * -2;
        app.style.transform = `translateY(${bounce}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (app) {
        app.style.filter = "";
        app.style.transform = "";
      }
    };
  }, [active, reducedMotion]);

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
