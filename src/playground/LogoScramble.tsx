import { useState, useRef, useCallback } from "react";
import styles from "./LogoScramble.module.css";

interface LogoScrambleProps {
  text: string;
}

function shuffleString(str: string): string {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

export function LogoScramble({ text }: LogoScrambleProps) {
  const [display, setDisplay] = useState(text);
  const [scrambling, setScrambling] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleClick = useCallback(() => {
    if (scrambling) return;
    clickCount.current++;
    clearTimeout(clickTimer.current);

    if (clickCount.current >= 5) {
      clickCount.current = 0;
      setScrambling(true);
      setDisplay(shuffleString(text));

      setTimeout(() => {
        setDisplay(text);
        setScrambling(false);
      }, 500);
    } else {
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
      }, 1000);
    }
  }, [text, scrambling]);

  return (
    <span
      className={`${styles.logo}${scrambling ? ` ${styles.scrambling}` : ""}`}
      onClick={handleClick}
    >
      {display.split("").map((char, i) => (
        <span key={`${i}-${char}`} className={styles.letter}>
          {char}
        </span>
      ))}
    </span>
  );
}
