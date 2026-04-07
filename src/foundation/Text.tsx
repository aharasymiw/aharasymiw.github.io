import type { ElementType, ReactNode, HTMLAttributes } from "react";
import styles from "./Text.module.css";

type TextVariant = "body" | "muted" | "label" | "ui";

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TextVariant;
  children: ReactNode;
}

export function Text({
  as: Tag = "p",
  variant = "body",
  children,
  className,
  ...props
}: TextProps) {
  return (
    <Tag className={`${styles[variant]}${className ? ` ${className}` : ""}`} {...props}>
      {children}
    </Tag>
  );
}
