import { render, screen } from '@testing-library/react'
import { MemoryRouter, Link as RouterLink } from 'react-router-dom'
import { ThemeProvider } from './foundation/ThemeProvider'
import { Routes, Route, useLocation } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Container } from './foundation/Container'
import { HomePage } from './pages/HomePage'
import { PortfolioPage } from './pages/PortfolioPage'
import { SpeakingPage } from './pages/SpeakingPage'
import { CommunityPage } from './pages/CommunityPage'
import { ConnectPage } from './pages/ConnectPage'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'Community', href: '/community' },
  { label: 'Connect', href: '/connect' },
]

function TestApp({ initialPath = '/' }: { initialPath?: string }) {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <ThemeProvider>
        <TestLayout />
      </ThemeProvider>
    </MemoryRouter>
  )
}

function TestLayout() {
  const location = useLocation()
  return (
    <>
      <NavBar links={NAV_LINKS} currentPath={location.pathname} siteName="Andrew Harasymiw" linkComponent={RouterLink} />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/speaking" element={<SpeakingPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="*" element={<Container><p>404</p><RouterLink to="/">Go home</RouterLink></Container>} />
        </Routes>
      </main>
    </>
  )
}

describe('App routing', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders homepage at /', () => {
    render(<TestApp />)
    expect(screen.getByText("Let's build together.")).toBeInTheDocument()
  })

  it('renders portfolio at /portfolio', () => {
    render(<TestApp initialPath="/portfolio" />)
    expect(screen.getByRole('heading', { name: 'Portfolio' })).toBeInTheDocument()
  })

  it('renders speaking page at /speaking', () => {
    render(<TestApp initialPath="/speaking" />)
    expect(screen.getByRole('heading', { name: 'Speaking & Education' })).toBeInTheDocument()
  })

  it('renders community page at /community', () => {
    render(<TestApp initialPath="/community" />)
    expect(screen.getByRole('heading', { name: 'Community', level: 1 })).toBeInTheDocument()
  })

  it('renders connect page at /connect', () => {
    render(<TestApp initialPath="/connect" />)
    expect(screen.getByRole('heading', { name: "Let's Connect" })).toBeInTheDocument()
  })

  it('highlights current page in nav', () => {
    render(<TestApp initialPath="/portfolio" />)
    const portfolioLink = screen.getByRole('link', { name: 'Portfolio' })
    expect(portfolioLink).toHaveAttribute('aria-current', 'page')
  })

  it('does not highlight non-current pages', () => {
    render(<TestApp initialPath="/portfolio" />)
    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).not.toHaveAttribute('aria-current')
  })

  it('renders 404 for unknown routes', () => {
    render(<TestApp initialPath="/nonexistent" />)
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Go home')).toBeInTheDocument()
  })
})
