import { render, screen } from '@testing-library/react'
import { Heading } from './Heading'

describe('Heading', () => {
  it('renders an h2 by default', () => {
    render(<Heading>Title</Heading>)
    const el = screen.getByRole('heading', { name: 'Title' })
    expect(el.tagName).toBe('H2')
  })

  it('renders the correct heading level', () => {
    render(<Heading level={3}>Subtitle</Heading>)
    const el = screen.getByRole('heading', { name: 'Subtitle' })
    expect(el.tagName).toBe('H3')
  })

  it('applies visual size class independently of level', () => {
    render(<Heading level={3} size="xl">Big H3</Heading>)
    const el = screen.getByRole('heading', { name: 'Big H3' })
    expect(el.tagName).toBe('H3')
    expect(el.className).toContain('xl')
  })

  it('defaults visual size to match level', () => {
    render(<Heading level={1}>H1</Heading>)
    const el = screen.getByRole('heading', { name: 'H1' })
    expect(el.className).toContain('threeXl')
  })
})
