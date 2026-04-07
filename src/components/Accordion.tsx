import { useState, useId, useRef, useEffect, type ReactNode } from "react";
import styles from "./Accordion.module.css";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerId = `accordion-trigger-${id}`;
  const panelId = `accordion-panel-${id}`;

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (isOpen) {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    } else {
      panel.style.maxHeight = "0";
    }
  }, [isOpen]);

  return (
    <div className={styles.item}>
      <button
        id={triggerId}
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <svg
          className={`${styles.chevron}${isOpen ? ` ${styles.chevronOpen}` : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M5 7.5L10 12.5L15 7.5" />
        </svg>
      </button>
      <div
        id={panelId}
        ref={panelRef}
        role="region"
        aria-labelledby={triggerId}
        className={`${styles.panel} ${isOpen ? styles.panelVisible : styles.panelHidden}`}
      >
        <div className={styles.panelContent}>{children}</div>
      </div>
    </div>
  );
}

interface AccordionProps {
  children: ReactNode;
}

export function Accordion({ children }: AccordionProps) {
  return <div className={styles.accordion}>{children}</div>;
}
