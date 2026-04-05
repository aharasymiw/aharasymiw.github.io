import { render, screen } from '@testing-library/react'
import { Text } from './Text'

describe('Text', () => {
  it('renders a paragraph by default', () => {
    render(<Text>Hello world</Text>)
    const el = screen.getByText('Hello world')
    expect(el.tagName).toBe('P')
  })

  it('renders as a custom element via as prop', () => {
    render(<Text as="span">Inline text</Text>)
    const el = screen.getByText('Inline text')
    expect(el.tagName).toBe('SPAN')
  })

  it('applies body variant by default', () => {
    render(<Text>Body text</Text>)
    const el = screen.getByText('Body text')
    expect(el.className).toContain('body')
  })

  it('applies muted variant', () => {
    render(<Text variant="muted">Muted text</Text>)
    const el = screen.getByText('Muted text')
    expect(el.className).toContain('muted')
  })

  it('applies label variant', () => {
    render(<Text variant="label">Label</Text>)
    const el = screen.getByText('Label')
    expect(el.className).toContain('label')
  })

  it('applies ui variant', () => {
    render(<Text variant="ui">UI text</Text>)
    const el = screen.getByText('UI text')
    expect(el.className).toContain('ui')
  })
})
