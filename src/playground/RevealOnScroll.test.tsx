import { render, screen } from '@testing-library/react'
import { RevealOnScroll } from './RevealOnScroll'

const mockObserve = vi.fn()
const mockUnobserve = vi.fn()

beforeEach(() => {
  window.IntersectionObserver = vi.fn().mockImplementation(function (this: any, callback: any) {
    this.observe = mockObserve
    this.unobserve = mockUnobserve
    this.disconnect = vi.fn()
    this._callback = callback
  }) as any
})

describe('RevealOnScroll', () => {
  it('renders children', () => {
    render(<RevealOnScroll>Hello</RevealOnScroll>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('starts with hidden class', () => {
    render(<RevealOnScroll><div data-testid="child">Content</div></RevealOnScroll>)
    const wrapper = screen.getByTestId('child').parentElement!
    expect(wrapper.className).toContain('hidden')
  })

  it('observes the element', () => {
    render(<RevealOnScroll>Content</RevealOnScroll>)
    expect(mockObserve).toHaveBeenCalled()
  })
})
