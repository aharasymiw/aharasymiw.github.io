import styles from './Footer.module.css'

const contactLinks = [
  { label: 'aharasymiw@gmail.com', href: 'mailto:aharasymiw@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/aharasymiw' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aharasymiw/' },
  { label: 'Mastodon', href: 'https://hachyderm.io/@aharasymiw' },
  { label: 'YouTube', href: 'https://www.youtube.com/@grokthings' },
  { label: 'GrokThings', href: 'https://grokthings.com' },
]

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <ul className={styles.links}>
        {contactLinks.map(link => (
          <li key={link.href}>
            <a
              className={styles.link}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p className={styles.copyright}>
        <span data-footer-year>{year}</span> Andrew Harasymiw
      </p>
    </footer>
  )
}
