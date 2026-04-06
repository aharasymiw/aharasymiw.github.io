import type { ReactNode, HTMLAttributes, CSSProperties } from 'react'
import styles from './Stack.module.css'

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'column' | 'row'
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  children: ReactNode
}

export function Stack({
  direction = 'column',
  gap,
  align,
  justify,
  children,
  className,
  style,
  ...props
}: StackProps) {
  const dirClass = direction === 'row' ? styles.horizontal : styles.vertical
  return (
    <div
      className={`${styles.stack} ${dirClass}${className ? ` ${className}` : ''}`}
      style={{
        gap: gap ? `var(--space-${gap})` : undefined,
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
