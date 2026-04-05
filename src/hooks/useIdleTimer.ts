import { useState, useEffect, useCallback } from 'react'

export function useIdleTimer(timeout: number): boolean {
  const [idle, setIdle] = useState(false)

  const reset = useCallback(() => {
    setIdle(false)
  }, [])

  useEffect(() => {
    let timer = setTimeout(() => setIdle(true), timeout)

    const handleActivity = () => {
      setIdle(false)
      clearTimeout(timer)
      timer = setTimeout(() => setIdle(true), timeout)
    }

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
    events.forEach(e => window.addEventListener(e, handleActivity))

    return () => {
      clearTimeout(timer)
      events.forEach(e => window.removeEventListener(e, handleActivity))
    }
  }, [timeout])

  return idle
}
