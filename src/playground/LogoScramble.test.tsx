import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LogoScramble } from './LogoScramble'

describe('LogoScramble', () => {
  it('renders the text', () => {
    render(<LogoScramble text="Andrew" />)
    expect(screen.getByText((_content, element) => {
      return element?.textContent === 'Andrew'  && element?.classList.toString().includes('logo')
    })).toBeInTheDocument()
  })

  it('scrambles after 5 rapid clicks', async () => {
    const user = userEvent.setup()
    render(<LogoScramble text="Andrew" />)
    const el = screen.getByText((_content, element) => {
      return element?.textContent === 'Andrew' && element?.classList.toString().includes('logo')
    })
    for (let i = 0; i < 5; i++) {
      await user.click(el)
    }
    expect(el).toBeInTheDocument()
  })
})
