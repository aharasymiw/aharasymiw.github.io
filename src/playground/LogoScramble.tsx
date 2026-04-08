import { useState, useRef, useCallback } from "react";
import styles from "./LogoScramble.module.css";

interface LogoScrambleProps {
  text: string;
}

function shuffleIndices(length: number): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

export function LogoScramble({ text }: LogoScrambleProps) {
  const [transforms, setTransforms] = useState<number[]>([]);
  const [scrambling, setScrambling] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleClick = useCallback(() => {
    if (scrambling) return;
    clickCount.current++;
    clearTimeout(clickTimer.current);

    if (clickCount.current >= 5) {
      clickCount.current = 0;
      setScrambling(true);

      const positions = letterRefs.current.map((el) => el?.offsetLeft ?? 0);
      const shuffled = shuffleIndices(text.length);

      // Calculate translateX delta for each letter: where it needs to go minus where it is
      const deltas = text.split("").map((_, i) => {
        const targetIndex = shuffled.indexOf(i);
        return positions[targetIndex] - positions[i];
      });

      // Phase 1: Scramble
      setTransforms(deltas);

      // Phase 2: Hold, then unscramble
      setTimeout(() => {
        setTransforms([]);

        // Phase 3: Wait for unscramble animation, then unlock
        setTimeout(() => {
          setScrambling(false);
        }, 400);
      }, 1000);
    } else {
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
      }, 1000);
    }
  }, [text, scrambling]);

  return (
    <span className={styles.logo} onClick={handleClick}>
      {text.split("").map((char, i) => (
        <span
          key={`${i}-${char}`}
          className={styles.letter}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          style={
            transforms[i] != null ? { transform: `translateX(${transforms[i]}px)` } : undefined
          }
        >
          {char}
        </span>
      ))}
    </span>
  );
}
