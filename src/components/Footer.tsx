import { Container } from "../foundation/Container";
import styles from "./Footer.module.css";

const contactLinks = [
  { label: "aharasymiw@gmail.com", href: "mailto:aharasymiw@gmail.com" },
  { label: "GitHub", href: "https://github.com/aharasymiw" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aharasymiw/" },
  { label: "Mastodon", href: "https://hachyderm.io/@aharasymiw" },
  { label: "YouTube", href: "https://www.youtube.com/@grokthings" },
  { label: "GrokThings", href: "https://grokthings.com" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <Container>
        <ul className={styles.links}>
          {contactLinks.map((link) => {
            // Only http(s) links open in a new tab; mailto opens in place so it
            // doesn't leave an orphan blank tab behind.
            const isExternal = link.href.startsWith("http");
            return (
              <li key={link.href}>
                <a
                  className={styles.link}
                  href={link.href}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
        <p className={styles.copyright}>
          <span data-footer-year>{year}</span> Andrew Harasymiw
        </p>
      </Container>
    </footer>
  );
}
