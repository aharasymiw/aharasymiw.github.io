export interface DevAdvocateVideo {
  slug: string;
  videoId: string;
  title: string;
  duration: string;
  category: string;
  description: string;
}

export const devAdvocateVideos: readonly DevAdvocateVideo[] = [
  {
    slug: "passkeys",
    videoId: "p47zKC0wscg",
    title: "From Passwords to Passkeys",
    duration: "52:05",
    category: "Mainstage Talk",
    description:
      "Minnebar 18 mainstage — accessible technical depth on WebAuthn and FIDO2 for a mixed audience of engineers and product folks. Sustained energy across 50 minutes.",
  },
  {
    slug: "api-keys",
    videoId: "gUaltRxPNwA",
    title: "Working With Third Party API Keys",
    duration: "14:45",
    category: "Tutorial",
    description:
      "A focused security tutorial covering how (and how not) to manage third-party credentials. Practical patterns developers can apply immediately.",
  },
  {
    slug: "toastmasters",
    videoId: "vT3H_4xBrY0",
    title: "Why Toastmasters?",
    duration: "6:57",
    category: "Community",
    description:
      "A concise pitch to fellow developers on why deliberate communication practice compounds. Quick, warm, and personal.",
  },
  {
    slug: "neon",
    videoId: "eQRwTWktDfo",
    title: "Intro to working with neon.tech",
    duration: "5:32",
    category: "Tool Walkthrough",
    description:
      "First-touch developer experience with Neon's serverless Postgres — the kind of getting-started narrative a DevRel team ships every week.",
  },
  {
    slug: "mac",
    videoId: "zc9U-mFudCY",
    title: "Mac Orientation",
    duration: "17:23",
    category: "Onboarding",
    description:
      "An onboarding walkthrough crafted for total newcomers — meeting learners where they are. The same patience and pacing I bring to docs and developer relations content.",
  },
  {
    slug: "demo-forms",
    videoId: "VIeCFFTnB5E",
    title: "How to fill in forms for a demo",
    duration: "6:36",
    category: "Demo Craft",
    description:
      "Behind-the-scenes craft from teaching: how to set up demo data that lands the point without derailing the narrative. The unglamorous skill that separates polished demos from rough ones.",
  },
  {
    slug: "saga-garden",
    videoId: "8fFDT3HjbTk",
    title: "Saga Garden Live Solve",
    duration: "60:39",
    category: "Live Coding",
    description:
      "Hour-long live problem-solving — thinking out loud, debugging in real time, recovering gracefully from wrong turns. The format conference attendees actually remember.",
  },
] as const;
