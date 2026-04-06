import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders contentinfo landmark', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders contact links', () => {
    render(<Footer />)
    expect(screen.getByText(/aharasymiw@gmail.com/)).toBeInTheDocument()
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument()
    expect(screen.getByText(/LinkedIn/i)).toBeInTheDocument()
    expect(screen.getByText(/Mastodon/i)).toBeInTheDocument()
  })

  it('renders copyright', () => {
    render(<Footer />)
    expect(screen.getByText(/Andrew Harasymiw/)).toBeInTheDocument()
  })
})
