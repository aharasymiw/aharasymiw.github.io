import { useSpiralDraw } from "../hooks/useSpiralDraw";
import { AchievementBanner } from "./AchievementBanner";

export function SpiralDraw() {
  const [activated, reset] = useSpiralDraw();

  return <AchievementBanner activated={activated} achievement="Shell Seeker" onComplete={reset} />;
}
