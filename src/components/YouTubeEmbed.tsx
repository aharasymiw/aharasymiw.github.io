import { useEffect, useRef, useState } from "react";
import { Heading } from "../foundation/Heading";
import { Text } from "../foundation/Text";
import { Link } from "./Link";
import styles from "./YouTubeEmbed.module.css";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  duration?: string;
  description?: string;
  startSeconds?: number;
  className?: string;
}

export function YouTubeEmbed({
  videoId,
  title,
  duration,
  description,
  startSeconds,
  className,
}: YouTubeEmbedProps) {
  const [activated, setActivated] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (activated) {
      iframeRef.current?.focus();
    }
  }, [activated]);

  const startParam = startSeconds ? `&start=${startSeconds}` : "";
  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1${startParam}`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}${
    startSeconds ? `&t=${startSeconds}` : ""
  }`;
  const buttonLabel = duration ? `Play video: ${title} (${duration})` : `Play video: ${title}`;

  return (
    <div className={`${styles.container}${className ? ` ${className}` : ""}`}>
      <div className={styles.wrapper}>
        {activated ? (
          <iframe
            ref={iframeRef}
            className={styles.iframe}
            src={embedSrc}
            title={title}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={styles.button}
            onClick={() => setActivated(true)}
            aria-label={buttonLabel}
          >
            <img
              className={styles.thumbnail}
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              srcSet={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg 1x, https://i.ytimg.com/vi/${videoId}/sddefault.jpg 2x`}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <span className={styles.playIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <div className={styles.meta}>
        <Heading level={3} size="lg" className={styles.title}>
          {title}
        </Heading>
        <div className={styles.metaRow}>
          {duration && <span className={styles.duration}>{duration}</span>}
          <Link href={watchUrl} external className={styles.openLink}>
            Open on YouTube
          </Link>
        </div>
        {description && (
          <Text variant="muted" className={styles.description}>
            {description}
          </Text>
        )}
      </div>
    </div>
  );
}
