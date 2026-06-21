import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation, Link as RouterLink } from "react-router-dom";
import { ThemeProvider } from "./foundation/ThemeProvider";
import { SkipLink } from "./foundation/SkipLink";
import { Container } from "./foundation/Container";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { KonamiConfetti } from "./playground/KonamiConfetti";
import { SwipeKonami } from "./playground/SwipeKonami";
import { FourCorners } from "./playground/FourCorners";
import { SecretKnock } from "./playground/SecretKnock";
import { SpiralDraw } from "./playground/SpiralDraw";
import { GravySnail } from "./playground/GravySnail";
import { SpinningFavicon } from "./playground/SpinningFavicon";
import { PartyMode } from "./playground/PartyMode";
import { FooterTaglines } from "./playground/FooterTaglines";
import { HomePage } from "./pages/HomePage";
import styles from "./App.module.css";

// Home is eager (it's the landing route and LCP path); the rest are code-split
// so a first visit to "/" doesn't download every other page's JS up front.
const PortfolioPage = lazy(() =>
  import("./pages/PortfolioPage").then((m) => ({ default: m.PortfolioPage })),
);
const ProjectsPage = lazy(() =>
  import("./pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage })),
);
const SpeakingPage = lazy(() =>
  import("./pages/SpeakingPage").then((m) => ({ default: m.SpeakingPage })),
);
const CommunityPage = lazy(() =>
  import("./pages/CommunityPage").then((m) => ({ default: m.CommunityPage })),
);
const CVPage = lazy(() => import("./pages/CVPage").then((m) => ({ default: m.CVPage })));
const ConnectPage = lazy(() =>
  import("./pages/ConnectPage").then((m) => ({ default: m.ConnectPage })),
);

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Projects", href: "/projects" },
  { label: "Speaking", href: "/speaking" },
  { label: "Community", href: "/community" },
  { label: "CV", href: "/cv" },
  { label: "Connect", href: "/connect" },
];

const FOOTER_TAGLINES = [
  "Made with caffeine and natural 20s",
  "No frameworks were harmed",
  "Mass-produced by mass-producing machines",
  "Debugged by Gravy the snail",
  "Achievement unlocked: read the footer",
];

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "var(--space-9) var(--space-4)" }}>
      <h1
        style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontSize: "var(--text-3xl)" }}
      >
        404
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--color-text-muted)",
          marginTop: "var(--space-4)",
        }}
      >
        This page doesn't exist. 🐌🥬 Maybe Gravy ate it?
      </p>
      <RouterLink
        to="/"
        style={{
          color: "var(--color-accent-green)",
          fontFamily: "var(--font-ui)",
          marginTop: "var(--space-4)",
          display: "inline-block",
        }}
      >
        Go home
      </RouterLink>
    </div>
  );
}

function AppLayout() {
  const location = useLocation();
  useEffect(() => {
    // When the URL carries a hash (e.g. /portfolio#video-passkeys), scroll to
    // that element instead of the top. The target may live in a lazily-loaded
    // route that hasn't rendered yet, so poll briefly until it appears.
    if (location.hash) {
      const id = location.hash.slice(1);
      let frame = 0;
      const start = performance.now();
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          return;
        }
        if (performance.now() - start < 3000) {
          frame = requestAnimationFrame(scrollToTarget);
        }
      };
      scrollToTarget();
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <div id="app-shell" className={styles.app}>
      <SkipLink />
      <NavBar
        links={NAV_LINKS}
        currentPath={location.pathname}
        siteName="Andrew Harasymiw"
        linkComponent={RouterLink}
      />
      <main id="main" tabIndex={-1} className={styles.main}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/speaking" element={<SpeakingPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/cv" element={<CVPage />} />
            <Route path="/connect" element={<ConnectPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <div className={styles.footer}>
        <Footer />
        <Container className={styles.footerExtras}>
          <FooterTaglines year={new Date().getFullYear()} taglines={FOOTER_TAGLINES} />
          <PartyMode />
        </Container>
      </div>
      <KonamiConfetti />
      <SwipeKonami />
      <FourCorners />
      <SecretKnock />
      <SpiralDraw />
      <GravySnail />
      <SpinningFavicon />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppLayout />
      </ThemeProvider>
    </BrowserRouter>
  );
}
