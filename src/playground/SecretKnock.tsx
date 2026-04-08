import { useSecretKnock } from "../hooks/useSecretKnock";
import { AchievementBanner } from "./AchievementBanner";

export function SecretKnock() {
  const [activated, reset] = useSecretKnock();

  return (
    <AchievementBanner activated={activated} achievement="Secret Handshake" onComplete={reset} />
  );
}
