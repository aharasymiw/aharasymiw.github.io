import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PartyMode } from './PartyMode'

describe('PartyMode', () => {
  it('renders a toggle button', () => {
    render(<PartyMode />)
    expect(screen.getByRole('button', { name: /party mode/i })).toBeInTheDocument()
  })

  it('toggles party mode on click', async () => {
    const user = userEvent.setup()
    render(<PartyMode />)
    const btn = screen.getByRole('button', { name: /party mode/i })
    await user.click(btn)
    expect(document.documentElement.getAttribute('data-party')).toBe('true')
  })

  it('toggles party mode off on second click', async () => {
    const user = userEvent.setup()
    render(<PartyMode />)
    const btn = screen.getByRole('button', { name: /party mode/i })
    await user.click(btn)
    await user.click(btn)
    expect(document.documentElement.getAttribute('data-party')).toBe('false')
  })
})
