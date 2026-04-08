import { useKonamiCode } from "../hooks/useKonamiCode";
import { AchievementBanner } from "./AchievementBanner";

export function KonamiConfetti() {
  const [activated, reset] = useKonamiCode();

  return (
    <AchievementBanner activated={activated} achievement="Caught Red Handed" onComplete={reset} />
  );
}
