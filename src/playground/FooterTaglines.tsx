import { useState } from 'react'

interface FooterTaglinesProps {
  year: number
  taglines: string[]
}

export function FooterTaglines({ year, taglines }: FooterTaglinesProps) {
  const [index, setIndex] = useState(-1)

  const handleClick = () => {
    setIndex(prev => (prev + 1) % taglines.length)
  }

  return (
    <span>
      <button
        onClick={handleClick}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          font: 'inherit',
          color: 'inherit',
          padding: 0,
        }}
      >
        {year}
      </button>
      {index >= 0 && (
        <span style={{ marginLeft: '8px', fontStyle: 'italic' }}>
          {taglines[index]}
        </span>
      )}
    </span>
  )
}
