'use client';

/**
 * @fileoverview ShareBar — share buttons for a blog article.
 *
 * Provides Copy-link (with copied confirmation) plus share links for X/Twitter,
 * LinkedIn, and WhatsApp. Reused inline inside the article hero and as a block
 * at the end of the article. All interactive controls have accessible labels
 * and visible focus rings.
 */

import React, { useCallback, useState } from 'react';
import { Link2, Check } from 'lucide-react';
import { SITE_URL } from '@/lib/seo';

export interface ShareBarProps {
  /** Post slug (path is built as `/blog/<slug>`). */
  slug: string;
  /** Article title — used as the share text. */
  title: string;
  /** `inline` sits in the hero meta row; `block` is the end-of-article row. */
  variant?: 'inline' | 'block';
}

const FOCUS_RING = 'outline outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 outline-accent-purple';

/**
 * Render the share bar. The Copy-link button is a real `<button>` (clipboard
 * action); the social links are `<a target="_blank">` anchor links.
 */
export const ShareBar: React.FC<ShareBarProps> = ({
  slug,
  title,
  variant = 'block',
}) => {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — fail silently.
      setCopied(false);
    }
  }, [url]);

  const btnBase =
    `inline-flex items-center justify-center gap-2 rounded-full brutal-border bg-white text-ink transition-transform hover:-translate-y-0.5 hover:bg-accent-lime ${FOCUS_RING}`;

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Link copied to clipboard' : 'Copy article link'}
          className={`${btnBase} px-3.5 py-2`}
        >
          {copied ? (
            <Check className="h-4 w-4 text-accent-purple" strokeWidth={2.5} />
          ) : (
            <Link2 className="h-4 w-4" strokeWidth={2.5} />
          )}
          <span className="font-jetbrains text-xs font-bold">
            {copied ? 'Copied!' : 'Copy link'}
          </span>
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share “${title}” on X / Twitter`}
          className={`${btnBase} h-9 w-9 p-0`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.985l4.26 5.633 4.749-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
          </svg>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share “${title}” on LinkedIn`}
          className={`${btnBase} h-9 w-9 p-0`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M7 10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="7" cy="7.5" r="1" fill="currentColor" />
            <path d="M11 17v-4a2 2 0 0 1 4 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M11 10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </a>
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share “${title}” on WhatsApp`}
          className={`${btnBase} h-9 w-9 p-0`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01c-1.52 0-3.01-.41-4.3-1.18l-.31-.18-3.12.82.83-3.04-.2-.32a8.21 8.21 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.83c0 4.54-3.7 8.24-8.25 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.68-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42-.14 0-.31-.02-.47-.02-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
          </svg>
        </a>
      </div>
    );
  }

  // ── block variant (end of article) ───────────────────────────────────────
  return (
    <section aria-label="Share this article" className="my-10 md:my-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between brutal-border bg-white rounded-2xl px-6 py-5 md:px-8 md:py-6" style={{ boxShadow: '6px 6px 0px #14100F' }}>
        <div className="flex items-center gap-2.5">
          <span className="font-jetbrains text-[11px] font-bold uppercase tracking-widest text-ink-muted">
            {'// share this'}
          </span>
          <span className="font-bricolage text-lg md:text-xl font-extrabold text-ink">
            Found this useful?
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Link copied to clipboard' : 'Copy article link'}
            className={`${btnBase} px-4 py-2.5`}
          >
            {copied ? (
              <Check className="h-4 w-4 text-accent-purple" strokeWidth={2.5} />
            ) : (
              <Link2 className="h-4 w-4" strokeWidth={2.5} />
            )}
            <span className="font-jetbrains text-xs font-bold">
              {copied ? 'Copied!' : 'Copy link'}
            </span>
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share “${title}” on X / Twitter`}
            className={`${btnBase} h-11 w-11 p-0`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.985l4.26 5.633 4.749-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share “${title}” on LinkedIn`}
            className={`${btnBase} h-11 w-11 p-0`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.8" />
              <path d="M7 10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="7" cy="7.5" r="1" fill="currentColor" />
              <path d="M11 17v-4a2 2 0 0 1 4 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M11 10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </a>
          <a
            href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share “${title}” on WhatsApp`}
            className={`${btnBase} h-11 w-11 p-0`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01c-1.52 0-3.01-.41-4.3-1.18l-.31-.18-3.12.82.83-3.04-.2-.32a8.21 8.21 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.83c0 4.54-3.7 8.24-8.25 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.68-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42-.14 0-.31-.02-.47-.02-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShareBar;
