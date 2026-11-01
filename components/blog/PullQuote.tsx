/**
 * @fileoverview PullQuote — brutalist pull-quote block for the blog article body.
 *
 * A large editorial-italic statement with a thick accent left rail and a hard
 * offset shadow. Plain (no animation) for readability — matches the brief's
 * "don't over-animate body text" rule.
 */

import React from 'react';

type Accent = 'purple' | 'lime' | 'coral';

const ACCENT_BORDER: Record<Accent, string> = {
  purple: 'border-accent-purple',
  lime: 'border-accent-lime',
  coral: 'border-accent-coral',
};

const ACCENT_TEXT: Record<Accent, string> = {
  purple: 'text-accent-purple',
  lime: 'text-accent-lime',
  coral: 'text-accent-coral',
};

export interface PullQuoteProps {
  /** The quote text. */
  quote: string;
  /** Optional attribution line shown beneath the quote. */
  attribution?: string;
  /** Accent colour for the left rail + the quotation glyph. */
  accent?: Accent;
}

/**
 * Render a brutalist pull-quote. Semantic: a blockquote with an accessible
 * cite when an attribution is supplied.
 */
export const PullQuote: React.FC<PullQuoteProps> = ({
  quote,
  attribution,
  accent = 'purple',
}) => {
  return (
    <blockquote
      className={`relative my-10 md:my-12 brutal-border bg-white rounded-2xl border-l-[6px] ${ACCENT_BORDER[accent]} py-7 px-6 md:px-9 md:py-9 ${ACCENT_TEXT[accent]}`}
      style={{ boxShadow: '6px 6px 0px #14100F' }}
    >
      {/* Oversized opening quote glyph */}
      <span
        aria-hidden="true"
        className={`absolute -top-5 left-5 font-bricolage font-extrabold text-6xl leading-none ${ACCENT_TEXT[accent]}`}
      >
        &ldquo;
      </span>
      <p className="editorial-italic text-2xl md:text-3xl leading-[1.15] text-ink">
        {quote}
      </p>
      {attribution ? (
        <cite className="block mt-5 font-jetbrains text-xs font-bold uppercase tracking-widest text-ink-muted not-italic">
          — {attribution}
        </cite>
      ) : null}
    </blockquote>
  );
};

export default PullQuote;
