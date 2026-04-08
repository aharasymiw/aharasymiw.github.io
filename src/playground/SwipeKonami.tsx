import { useSwipeCode } from "../hooks/useSwipeCode";
import { AchievementBanner } from "./AchievementBanner";

export function SwipeKonami() {
  const [activated, reset] = useSwipeCode();

  return (
    <AchievementBanner activated={activated} achievement="Caught Red Thumbed" onComplete={reset} />
  );
}
