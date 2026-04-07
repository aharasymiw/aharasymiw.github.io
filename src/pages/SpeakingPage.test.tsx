import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../foundation/ThemeProvider'
import { SpeakingPage } from './SpeakingPage'

function renderPage() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <SpeakingPage />
      </ThemeProvider>
    </MemoryRouter>
  )
}

describe('SpeakingPage', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders the page heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'Speaking & Education' })).toBeInTheDocument()
  })

  it('renders featured presentations', () => {
    renderPage()
    expect(screen.getByText('Featured Presentations')).toBeInTheDocument()
    expect(screen.getByText('From Passwords to Passkeys')).toBeInTheDocument()
    expect(screen.getByText('The World is More Complex Than We Think')).toBeInTheDocument()
    expect(screen.getByText('Reflecting on My Path')).toBeInTheDocument()
  })

  it('renders all talks accordion', () => {
    renderPage()
    expect(screen.getByText('All Talks')).toBeInTheDocument()
    expect(screen.getByText('Professional Development')).toBeInTheDocument()
    expect(screen.getByText('Technical Deep Dives')).toBeInTheDocument()
    expect(screen.getByText('Community & Culture')).toBeInTheDocument()
  })

  it('renders teaching section', () => {
    renderPage()
    expect(screen.getByText('Teaching')).toBeInTheDocument()
    expect(screen.getByText('Prime Digital Academy')).toBeInTheDocument()
  })

  it('renders booking section with topic tags', () => {
    renderPage()
    expect(screen.getByText('Book Me to Speak')).toBeInTheDocument()
    expect(screen.getByText('Modern Web Dev')).toBeInTheDocument()
    expect(screen.getByText('Authentication & Security')).toBeInTheDocument()
  })
})
