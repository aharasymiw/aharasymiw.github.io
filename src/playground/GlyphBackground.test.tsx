import { render, screen } from '@testing-library/react'
import { GlyphBackground } from './GlyphBackground'

describe('GlyphBackground', () => {
  it('renders the glyph character', () => {
    render(<GlyphBackground glyph="?" />)
    expect(screen.getByText('?')).toBeInTheDocument()
  })

  it('is aria-hidden', () => {
    render(<GlyphBackground glyph="&" />)
    expect(screen.getByText('&')).toHaveAttribute('aria-hidden', 'true')
  })

  it('is not selectable or clickable', () => {
    render(<GlyphBackground glyph="→" data-testid="glyph" />)
    const el = screen.getByText('→')
    expect(el.style.pointerEvents).toBe('none')
  })
})
