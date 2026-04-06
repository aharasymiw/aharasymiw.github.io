import { useState, useEffect, type ReactNode } from 'react'

type Trigger =
  | { type: 'clickCount'; count: number; targetSelector: string }
  | { type: 'idle'; duration: number }
  | { type: 'keySequence'; keys: string[] }

interface EasterEggProps {
  trigger: Trigger
  announcement?: string
  children: ReactNode
}

export function EasterEgg({ trigger, announcement, children }: EasterEggProps) {
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (triggered) return

    if (trigger.type === 'idle') {
      let timeoutId: ReturnType<typeof setTimeout>
      const reset = () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => setTriggered(true), trigger.duration)
      }
      const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
      events.forEach(e => window.addEventListener(e, reset))
      timeoutId = setTimeout(() => setTriggered(true), trigger.duration)
      return () => {
        clearTimeout(timeoutId)
        events.forEach(e => window.removeEventListener(e, reset))
      }
    }

    if (trigger.type === 'clickCount') {
      let clicks = 0
      let timer: ReturnType<typeof setTimeout>
      const handler = () => {
        clicks++
        clearTimeout(timer)
        if (clicks >= trigger.count) {
          setTriggered(true)
        } else {
          timer = setTimeout(() => { clicks = 0 }, 1000)
        }
      }
      const target = document.querySelector(trigger.targetSelector)
      target?.addEventListener('click', handler)
      return () => {
        target?.removeEventListener('click', handler)
        clearTimeout(timer)
      }
    }

    if (trigger.type === 'keySequence') {
      const buffer: string[] = []
      const handler = (e: KeyboardEvent) => {
        buffer.push(e.key)
        if (buffer.length > trigger.keys.length) buffer.shift()
        if (buffer.length === trigger.keys.length && buffer.every((k, i) => k === trigger.keys[i])) {
          setTriggered(true)
        }
      }
      window.addEventListener('keydown', handler)
      return () => window.removeEventListener('keydown', handler)
    }
  }, [trigger, triggered])

  if (!triggered) return null

  return (
    <>
      {children}
      {announcement && (
        <div aria-live="polite" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
          {announcement}
        </div>
      )}
    </>
  )
}
