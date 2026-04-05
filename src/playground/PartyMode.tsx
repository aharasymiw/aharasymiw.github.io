import { useState } from 'react'
import styles from './PartyMode.module.css'

export function PartyMode() {
  const [active, setActive] = useState(false)

  const toggle = () => {
    const next = !active
    setActive(next)
    document.documentElement.setAttribute('data-party', String(next))
  }

  return (
    <button
      className={`${styles.toggle}${active ? ` ${styles.active}` : ''}`}
      onClick={toggle}
      aria-label="Party mode"
      aria-pressed={active}
    >
      🧙
    </button>
  )
}
