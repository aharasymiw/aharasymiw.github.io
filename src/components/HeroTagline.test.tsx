import { render, screen } from '@testing-library/react'
import { HeroTagline } from './HeroTagline'

const cards = [
  { label: 'Who I am', color: 'green' as const, content: 'Developer advocate' },
  { label: 'What I do', color: 'warm' as const, content: 'Teach and build' },
  { label: 'How I help', color: 'playful' as const, content: 'DevRel and talks' },
]

describe('HeroTagline', () => {
  it('renders the tagline', () => {
    render(<HeroTagline tagline="Building communities" cards={cards} />)
    expect(screen.getByText('Building communities')).toBeInTheDocument()
  })

  it('renders all three cards', () => {
    render(<HeroTagline tagline="Tagline" cards={cards} />)
    expect(screen.getByText('Who I am')).toBeInTheDocument()
    expect(screen.getByText('What I do')).toBeInTheDocument()
    expect(screen.getByText('How I help')).toBeInTheDocument()
  })

  it('renders card content', () => {
    render(<HeroTagline tagline="Tagline" cards={cards} />)
    expect(screen.getByText('Developer advocate')).toBeInTheDocument()
    expect(screen.getByText('Teach and build')).toBeInTheDocument()
    expect(screen.getByText('DevRel and talks')).toBeInTheDocument()
  })
})
