import type { ReactNode, HTMLAttributes } from 'react'
import styles from './Heading.module.css'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type HeadingSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
  size?: HeadingSize
  children: ReactNode
}

const levelToSize: Record<HeadingLevel, string> = {
  1: 'threeXl',
  2: 'twoXl',
  3: 'xl',
  4: 'lg',
  5: 'base_size',
  6: 'sm',
}

const sizeToClass: Record<HeadingSize, string> = {
  'xs': 'xs',
  'sm': 'sm',
  'base': 'base_size',
  'lg': 'lg',
  'xl': 'xl',
  '2xl': 'twoXl',
  '3xl': 'threeXl',
}

export function Heading({ level = 2, size, children, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const
  const sizeClass = size ? sizeToClass[size] : levelToSize[level]
  return (
    <Tag
      className={`${styles.base} ${styles[sizeClass]}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
