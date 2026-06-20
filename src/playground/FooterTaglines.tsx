import { useState } from "react";

interface FooterTaglinesProps {
  year: number;
  taglines: string[];
}

export function FooterTaglines({ year, taglines }: FooterTaglinesProps) {
  const [index, setIndex] = useState(-1);

  const handleClick = () => {
    setIndex((prev) => (prev + 1) % taglines.length);
  };

  return (
    <span>
      <button
        onClick={handleClick}
        aria-label="Reveal a footer tagline"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          font: "inherit",
          color: "inherit",
          padding: 0,
        }}
      >
        {year}
      </button>
      <span aria-live="polite" style={{ marginLeft: index >= 0 ? "8px" : 0, fontStyle: "italic" }}>
        {index >= 0 ? taglines[index] : ""}
      </span>
    </span>
  );
}
