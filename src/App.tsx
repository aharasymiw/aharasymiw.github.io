import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Link as RouterLink } from 'react-router-dom'
import { ThemeProvider } from './foundation/ThemeProvider'
import { SkipLink } from './foundation/SkipLink'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { KonamiConfetti } from './playground/KonamiConfetti'
import { GravySnail } from './playground/GravySnail'
import { PartyMode } from './playground/PartyMode'
import { FooterTaglines } from './playground/FooterTaglines'
import { HomePage } from './pages/HomePage'
import { PortfolioPage } from './pages/PortfolioPage'
import { SpeakingPage } from './pages/SpeakingPage'
import { CommunityPage } from './pages/CommunityPage'
import { ConnectPage } from './pages/ConnectPage'
import styles from './App.module.css'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'Community', href: '/community' },
  { label: 'Connect', href: '/connect' },
]

const FOOTER_TAGLINES = [
  'Made with caffeine and natural 20s',
  'No frameworks were harmed',
  'Mass-produced by mass-producing machines',
  'Debugged by Gravy the snail',
  'Achievement unlocked: read the footer',
]

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: 'var(--space-9) var(--space-4)' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: 'var(--text-3xl)' }}>
        404
      </h1>
      <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', marginTop: 'var(--space-4)' }}>
        This page doesn't exist. Maybe Gravy ate it.
      </p>
      <RouterLink to="/" style={{ color: 'var(--color-accent-green)', fontFamily: 'var(--font-ui)', marginTop: 'var(--space-4)', display: 'inline-block' }}>
        Go home
      </RouterLink>
    </div>
  )
}

function AppLayout() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className={styles.app}>
      <SkipLink />
      <NavBar
        links={NAV_LINKS}
        currentPath={location.pathname}
        siteName="Andrew Harasymiw"
        linkComponent={RouterLink}
      />
      <main id="main" className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/speaking" element={<SpeakingPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className={styles.footer}>
        <Footer />
        <div className={styles.footerExtras}>
          <FooterTaglines year={new Date().getFullYear()} taglines={FOOTER_TAGLINES} />
          <PartyMode />
        </div>
      </footer>
      <KonamiConfetti />
      <GravySnail />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppLayout />
      </ThemeProvider>
    </BrowserRouter>
  )
}
