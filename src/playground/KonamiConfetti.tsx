import { useState, useEffect } from 'react'
import { useKonamiCode } from '../hooks/useKonamiCode'
import styles from './KonamiConfetti.module.css'

const COLORS = ['#4a6741', '#7c9a92', '#c17f59', '#f0c27a', '#7c6fad', '#b89adb']

function generatePieces(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: `${Math.random() * 0.5}s`,
    size: `${6 + Math.random() * 8}px`,
  }))
}

export function KonamiConfetti() {
  const activated = useKonamiCode()
  const [visible, setVisible] = useState(false)
  const [pieces] = useState(() => generatePieces(50))

  useEffect(() => {
    if (!activated) return
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [activated])

  if (!activated) return null

  return (
    <>
      {visible && (
        <div className={styles.confettiContainer} aria-hidden="true">
          {pieces.map(p => (
            <div
              key={p.id}
              className={styles.confettiPiece}
              style={{
                left: p.left,
                backgroundColor: p.color,
                animationDelay: p.delay,
                width: p.size,
                height: p.size,
              }}
            />
          ))}
        </div>
      )}
      <div aria-live="polite" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        New Achievement!: 'Caught Red Handed'
      </div>
    </>
  )
}
