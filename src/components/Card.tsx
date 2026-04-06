import type { ReactNode, HTMLAttributes } from 'react'
import styles from './Card.module.css'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glyph?: string
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
}

export function Card({ glyph, header, footer, children, className, ...props }: CardProps) {
  return (
    <div className={`${styles.card}${className ? ` ${className}` : ''}`} {...props}>
      {glyph && (
        <span className={styles.glyph} aria-hidden="true">
          {glyph}
        </span>
      )}
      {header && <div className={styles.header}>{header}</div>}
      <div>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}
