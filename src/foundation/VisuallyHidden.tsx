import type { ReactNode } from 'react'

const styles: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
}

export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span style={styles}>{children}</span>
}
