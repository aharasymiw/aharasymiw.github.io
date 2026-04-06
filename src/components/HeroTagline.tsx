import styles from './HeroTagline.module.css'

type AccentColor = 'green' | 'warm' | 'playful'

interface HeroCard {
  label: string
  color: AccentColor
  content: string
}

interface HeroTaglineProps {
  tagline: string
  cards: [HeroCard, HeroCard, HeroCard]
}

const colorToClass: Record<AccentColor, string> = {
  green: styles.labelGreen,
  warm: styles.labelWarm,
  playful: styles.labelPlayful,
}

export function HeroTagline({ tagline, cards }: HeroTaglineProps) {
  return (
    <div className={styles.hero}>
      <h1 className={styles.tagline}>{tagline}</h1>
      <div className={styles.cards}>
        {cards.map(card => (
          <div key={card.label} className={styles.card}>
            <div className={`${styles.cardLabel} ${colorToClass[card.color]}`}>
              {card.label}
            </div>
            <div className={styles.cardContent}>{card.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
