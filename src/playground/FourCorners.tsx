import { useFourCorners } from "../hooks/useFourCorners";
import { AchievementBanner } from "./AchievementBanner";

export function FourCorners() {
  const [activated, reset] = useFourCorners();

  return (
    <AchievementBanner activated={activated} achievement="Boundary Breaker" onComplete={reset} />
  );
}
