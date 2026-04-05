import { renderHook, act } from '@testing-library/react'
import { useIdleTimer } from './useIdleTimer'

describe('useIdleTimer', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('returns false initially', () => {
    const { result } = renderHook(() => useIdleTimer(5000))
    expect(result.current).toBe(false)
  })

  it('returns true after timeout', () => {
    const { result } = renderHook(() => useIdleTimer(5000))
    act(() => { vi.advanceTimersByTime(5001) })
    expect(result.current).toBe(true)
  })

  it('resets on user activity', () => {
    const { result } = renderHook(() => useIdleTimer(5000))
    act(() => { vi.advanceTimersByTime(4000) })
    act(() => { window.dispatchEvent(new Event('mousemove')) })
    act(() => { vi.advanceTimersByTime(4000) })
    expect(result.current).toBe(false)
  })
})
