import { useState, useCallback, type ComponentType } from "react";
import { useTheme } from "../foundation/ThemeProvider";
import { LogoScramble } from "../playground/LogoScramble";
import { SunsetTransition } from "../playground/SunsetTransition";
import styles from "./NavBar.module.css";

interface NavLink {
  label: string;
  href: string;
}

interface NavBarProps {
  links: NavLink[];
  currentPath: string;
  siteName: string;
  linkComponent?: ComponentType<{
    to: string;
    className?: string;
    "aria-current"?: "page";
    onClick?: () => void;
    children: React.ReactNode;
  }>;
}

export function NavBar({ links, currentPath, siteName, linkComponent: LinkComp }: NavBarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sunsetActive, setSunsetActive] = useState(false);
  const [sunsetDir, setSunsetDir] = useState<"dark" | "light">("dark");

  const handleToggle = useCallback(() => {
    setSunsetDir(theme === "light" ? "dark" : "light");
    setSunsetActive(true);
    toggleTheme();
    setTimeout(() => setSunsetActive(false), 350);
  }, [theme, toggleTheme]);

  return (
    <header className={styles.navbar}>
      <span className={styles.siteName}>
        <LogoScramble text={siteName} />
      </span>

      <nav aria-label="Main">
        <ul className={styles.navLinks}>
          {links.map((link) => (
            <li key={link.href}>
              {LinkComp ? (
                <LinkComp
                  to={link.href}
                  className={`${styles.navLink}${currentPath === link.href ? ` ${styles.navLinkActive}` : ""}`}
                  aria-current={currentPath === link.href ? "page" : undefined}
                >
                  {link.label}
                </LinkComp>
              ) : (
                <a
                  href={link.href}
                  className={`${styles.navLink}${currentPath === link.href ? ` ${styles.navLinkActive}` : ""}`}
                  aria-current={currentPath === link.href ? "page" : undefined}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
          <li>
            <button
              className={styles.themeToggle}
              onClick={handleToggle}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            >
              {theme === "light" ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </nav>

      <button
        className={styles.hamburger}
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        aria-expanded={mobileOpen}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      <div
        className={`${styles.overlay}${!mobileOpen ? ` ${styles.overlayHidden}` : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <div className={`${styles.mobileMenu}${mobileOpen ? ` ${styles.mobileMenuOpen}` : ""}`}>
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          style={{ alignSelf: "flex-end", display: "inline-flex" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        {links.map((link) =>
          LinkComp ? (
            <LinkComp
              key={link.href}
              to={link.href}
              className={`${styles.mobileNavLink}${currentPath === link.href ? ` ${styles.mobileNavLinkActive}` : ""}`}
              aria-current={currentPath === link.href ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </LinkComp>
          ) : (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavLink}${currentPath === link.href ? ` ${styles.mobileNavLinkActive}` : ""}`}
              aria-current={currentPath === link.href ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ),
        )}
        <button
          className={styles.themeToggle}
          onClick={handleToggle}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
      <SunsetTransition active={sunsetActive} direction={sunsetDir} />
    </header>
  );
}
