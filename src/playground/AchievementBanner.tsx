import { useState, useEffect } from "react";
import styles from "./AchievementBanner.module.css";

const COLORS = ["#4a6741", "#7c9a92", "#c17f59", "#f0c27a", "#7c6fad", "#b89adb"];

function generatePieces(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: `${Math.random() * 0.5}s`,
    size: `${6 + Math.random() * 8}px`,
  }));
}

interface AchievementBannerProps {
  activated: boolean;
  achievement: string;
  onComplete: () => void;
}

export function AchievementBanner({ activated, achievement, onComplete }: AchievementBannerProps) {
  const [visible, setVisible] = useState(false);
  const [pieces, setPieces] = useState(() => generatePieces(50));

  useEffect(() => {
    if (!activated) return;
    setPieces(generatePieces(50));
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [activated, onComplete]);

  if (!visible) return null;

  return (
    <>
      <div className={styles.confettiContainer} aria-hidden="true">
        {pieces.map((p) => (
          <div
            key={p.id}
            className={styles.confettiPiece}
            style={{
              left: p.left,
              backgroundColor: p.color,
              animationDelay: p.delay,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>
      <div className={styles.achievementBanner} aria-live="polite">
        <div className={styles.achievementStars}>&#10024; &#127881; &#127882; &#10024;</div>
        <div className={styles.achievementTitle}>&#127942; NEW ACHIEVEMENT! &#127942;</div>
        <div className={styles.achievementName}>&lsquo;{achievement}&rsquo;</div>
        <div className={styles.achievementStars}>&#10024; &#127882; &#127881; &#10024;</div>
      </div>
    </>
  );
}
