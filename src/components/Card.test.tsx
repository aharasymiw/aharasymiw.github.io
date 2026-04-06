import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies the card class', () => {
    render(<Card data-testid="card">Content</Card>)
    expect(screen.getByTestId('card').className).toContain('card')
  })

  it('renders background glyph when provided', () => {
    render(<Card glyph="?">Content</Card>)
    const glyph = screen.getByText('?')
    expect(glyph).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders header, body, and footer slots', () => {
    render(
      <Card
        header={<div>Header</div>}
        footer={<div>Footer</div>}
      >
        Body
      </Card>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})
