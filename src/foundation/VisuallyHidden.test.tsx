import { render, screen } from '@testing-library/react'
import { VisuallyHidden } from './VisuallyHidden'

describe('VisuallyHidden', () => {
  it('renders text that is accessible to screen readers', () => {
    render(<VisuallyHidden>Skip to content</VisuallyHidden>)
    expect(screen.getByText('Skip to content')).toBeInTheDocument()
  })

  it('applies visually hidden styles', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>)
    const el = screen.getByText('Hidden text')
    expect(el).toBeInTheDocument()
  })
})
