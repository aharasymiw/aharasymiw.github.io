import { useState, useEffect, useRef } from 'react'
import { useIdleTimer } from '../hooks/useIdleTimer'
import styles from './GravySnail.module.css'

interface GravySnailProps {
  idleTimeout?: number
}

const CHAOS_GLYPHS = ['~', '*', '!', '?', '#', '&', '%', '@', '§', '†', '‡', '∞', '≈', '∆']

export function GravySnail({ idleTimeout = 60000 }: GravySnailProps) {
  const idle = useIdleTimer(idleTimeout)
  const [active, setActive] = useState(false)
  const [melting, setMelting] = useState(false)
  const [trailFading, setTrailFading] = useState(false)
  const [chaosItems, setChaosItems] = useState<Array<{ id: number; glyph: string; left: string; bottom: string; rotate: string }>>([])
  const chaosId = useRef(0)
  const snailRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (idle && !active && !melting) {
      setActive(true)
      setChaosItems([])
      setTrailFading(false)
    }
    if (!idle && active && !melting) {
      setMelting(true)
      setTrailFading(true)
      setTimeout(() => {
        setActive(false)
        setMelting(false)
        setChaosItems([])
      }, 1000)
    }
  }, [idle, active, melting])

  useEffect(() => {
    if (!active || melting) {
      clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      const snail = snailRef.current
      if (!snail) return
      const rect = snail.getBoundingClientRect()
      setChaosItems(prev => [
        ...prev.slice(-30),
        {
          id: chaosId.current++,
          glyph: CHAOS_GLYPHS[Math.floor(Math.random() * CHAOS_GLYPHS.length)],
          left: `${rect.left + Math.random() * 20 - 10}px`,
          bottom: `${10 + Math.random() * 40}px`,
          rotate: `${Math.random() * 360}deg`,
        },
      ])
    }, 800)
    return () => clearInterval(intervalRef.current)
  }, [active, melting])

  useEffect(() => {
    if (!active || melting) return
    const checkPosition = () => {
      const snail = snailRef.current
      if (!snail) return
      const rect = snail.getBoundingClientRect()
      if (rect.left > window.innerWidth) {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    }
    const timer = setInterval(checkPosition, 1000)
    return () => clearInterval(timer)
  }, [active, melting])

  if (!active) return null

  return (
    <div aria-hidden="true">
      <div className={styles.container}>
        <div
          ref={snailRef}
          className={`${styles.snail}${melting ? ` ${styles.melting}` : ''}`}
          aria-label="Gravy the snail"
        >
          🐌
        </div>
      </div>
      <div className={`${styles.trail}${trailFading ? ` ${styles.trailFading}` : ''}`}>
        {chaosItems.map(item => (
          <span
            key={item.id}
            className={styles.chaosGlyph}
            style={{
              left: item.left,
              bottom: item.bottom,
              transform: `rotate(${item.rotate})`,
            }}
          >
            {item.glyph}
          </span>
        ))}
      </div>
    </div>
  )
}
