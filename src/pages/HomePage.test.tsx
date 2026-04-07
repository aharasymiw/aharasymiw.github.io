import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../foundation/ThemeProvider'
import { HomePage } from './HomePage'

function renderHomePage() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    </MemoryRouter>
  )
}

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders the hero tagline', () => {
    renderHomePage()
    expect(screen.getByText("Let's build together.")).toBeInTheDocument()
  })

  it('renders the three hero cards', () => {
    renderHomePage()
    expect(screen.getByText('Who')).toBeInTheDocument()
    expect(screen.getByText('What')).toBeInTheDocument()
    expect(screen.getByText('How')).toBeInTheDocument()
  })

  it('renders the introduction section', () => {
    renderHomePage()
    expect(screen.getByText("Hello! I'm Andrew.")).toBeInTheDocument()
  })

  it('renders the highlights accordion', () => {
    renderHomePage()
    expect(screen.getByText('Featured Highlights')).toBeInTheDocument()
    expect(screen.getByText('Bootcamp Instructor & Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Conference Speaker & Presenter')).toBeInTheDocument()
    expect(screen.getByText('Content Creator & Educator')).toBeInTheDocument()
    expect(screen.getByText('Community Builder')).toBeInTheDocument()
  })

  it('renders the DevRel value propositions', () => {
    renderHomePage()
    expect(screen.getByText('What I Bring to Developer Relations')).toBeInTheDocument()
    expect(screen.getByText(/Technical Credibility/)).toBeInTheDocument()
  })

  it('renders the CTA section', () => {
    renderHomePage()
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    expect(screen.getByText('View My Work')).toBeInTheDocument()
  })
})
