import { useState, useEffect } from 'react'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export function useKonamiCode(): boolean {
  const [activated, setActivated] = useState(false)

  useEffect(() => {
    if (activated) return
    const buffer: string[] = []

    const handler = (e: KeyboardEvent) => {
      buffer.push(e.key)
      if (buffer.length > KONAMI.length) buffer.shift()
      if (buffer.length === KONAMI.length && buffer.every((k, i) => k === KONAMI[i])) {
        setActivated(true)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activated])

  return activated
}
