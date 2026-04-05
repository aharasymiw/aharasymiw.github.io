import type { ReactNode, HTMLAttributes } from 'react'
import styles from './Section.module.css'

type Zone = 'calm' | 'warm' | 'playful'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  zone?: Zone
  children: ReactNode
}

export function Section({ zone, children, className, ...props }: SectionProps) {
  const classes = [styles.section, zone ? styles[zone] : '', className].filter(Boolean).join(' ')
  return (
    <section className={classes} {...props}>
      {children}
    </section>
  )
}
