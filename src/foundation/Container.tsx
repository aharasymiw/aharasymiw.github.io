import type { ReactNode, HTMLAttributes } from 'react'
import styles from './Container.module.css'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={`${styles.container}${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </div>
  )
}
