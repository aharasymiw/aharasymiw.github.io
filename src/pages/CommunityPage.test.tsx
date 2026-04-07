import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../foundation/ThemeProvider'
import { CommunityPage } from './CommunityPage'

function renderPage() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <CommunityPage />
      </ThemeProvider>
    </MemoryRouter>
  )
}

describe('CommunityPage', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders the page heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'Community', level: 1 })).toBeInTheDocument()
  })

  it('renders Toastmasters section', () => {
    renderPage()
    expect(screen.getByText('Toastmasters')).toBeInTheDocument()
    expect(screen.getByText('Area Director (2021–2022)')).toBeInTheDocument()
    expect(screen.getByText('Club President (2020–2021)')).toBeInTheDocument()
  })

  it('renders TTRPGs section', () => {
    renderPage()
    expect(screen.getByText(/Tabletop RPGs/)).toBeInTheDocument()
    expect(screen.getByText('Dungeon Master (2014–Present)')).toBeInTheDocument()
  })

  it('renders D20Tumble elements for D&D references', () => {
    renderPage()
    expect(screen.getByText('Dungeons & Dragons')).toBeInTheDocument()
  })

  it('renders the professional overlap section', () => {
    renderPage()
    expect(screen.getByText('Where It All Connects')).toBeInTheDocument()
  })

  it('renders skills grid cards', () => {
    renderPage()
    expect(screen.getByText('Facilitation')).toBeInTheDocument()
    expect(screen.getByText('Improvisation')).toBeInTheDocument()
  })
})
