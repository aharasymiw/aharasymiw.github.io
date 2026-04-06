import { render, screen } from '@testing-library/react'
import { Section } from './Section'

describe('Section', () => {
  it('renders a semantic section element', () => {
    render(<Section aria-label="Test">Content</Section>)
    expect(screen.getByRole('region', { name: 'Test' })).toBeInTheDocument()
  })

  it('applies zone class when provided', () => {
    render(<Section zone="calm" data-testid="section">Content</Section>)
    expect(screen.getByTestId('section').className).toContain('calm')
  })

  it('applies warm zone', () => {
    render(<Section zone="warm" data-testid="section">Content</Section>)
    expect(screen.getByTestId('section').className).toContain('warm')
  })

  it('applies playful zone', () => {
    render(<Section zone="playful" data-testid="section">Content</Section>)
    expect(screen.getByTestId('section').className).toContain('playful')
  })
})
