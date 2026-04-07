import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./Link.module.css";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
  children: ReactNode;
}

export function Link({ external, children, className, ...props }: LinkProps) {
  const externalProps = external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};

  return (
    <a
      className={`${styles.link}${className ? ` ${className}` : ""}`}
      {...externalProps}
      {...props}
    >
      {children}
      {external && (
        <>
          <svg
            className={styles.externalIcon}
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M3.5 3.5h5v5" />
            <path d="M8.5 3.5L3 9" />
          </svg>
          <span className={styles.externalIndicator}>(opens in new tab)</span>
        </>
      )}
    </a>
  );
}
