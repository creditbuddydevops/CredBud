'use client';

import React from 'react';
import { motion } from 'motion/react';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | number[];
  splitType?: 'chars' | 'words' | 'lines';
  variant?: 'rise' | 'blur' | 'flip';
  from?: { opacity?: number; y?: number; x?: number; rotateX?: number; scale?: number; filter?: string };
  to?: { opacity?: number; y?: number; x?: number; rotateX?: number; scale?: number; filter?: string };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  onLetterAnimationComplete?: () => void;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text = '',
  className = '',
  delay = 25,
  duration = 0.5,
  splitType = 'chars',
  variant = 'rise',
  from,
  to,
  textAlign = 'center',
  tag: Tag = 'p',
  onLetterAnimationComplete,
}) => {
  if (!text) return null;

  // NOTE: No window.innerWidth check here — that causes SSR/client hydration
  // mismatches because the server always sees a different value than the client.
  //
  // Performance on mobile is handled by:
  //  1. Always using word-split (never char-split) — callers should pass
  //     splitType="words" on mobile-heavy sections, or we default to words.
  //  2. The blur variant still works fine on modern mobile — CSS transitions
  //     are GPU-accelerated. The main perf win was removing char-split.
  //
  // We use word-split when splitType==='words' (caller's choice) or
  // when splitType==='chars' but the text is long (>40 chars) to avoid
  // creating too many motion nodes.
  const useWordSplit =
    splitType === 'words' ||
    splitType === 'lines' ||
    text.length > 40; // auto-downgrade long char-splits

  let initialStyle = from;
  let animateStyle = to;

  if (!initialStyle) {
    if (variant === 'blur') {
      initialStyle = { opacity: 0, y: 20, filter: 'blur(8px)' };
      animateStyle = { opacity: 1, y: 0, filter: 'blur(0px)' };
    } else if (variant === 'flip') {
      initialStyle = { opacity: 0, y: 30, rotateX: -60 };
      animateStyle = { opacity: 1, y: 0, rotateX: 0 };
    } else {
      initialStyle = { opacity: 0, y: 35 };
      animateStyle = { opacity: 1, y: 0 };
    }
  }
  if (!animateStyle) animateStyle = { opacity: 1, y: 0 };

  const justifyClass =
    textAlign === 'left' ? 'justify-start' :
    textAlign === 'right' ? 'justify-end' : 'justify-center';

  // ── Word split ────────────────────────────────────────────────────────────
  if (useWordSplit) {
    const words = text.split(' ');
    return (
      <Tag
        className={`inline-flex flex-wrap gap-[0.25em] ${justifyClass} ${className}`}
        style={{ textAlign, perspective: 1000 }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={initialStyle}
            whileInView={animateStyle}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration,
              delay: (index * (delay > 40 ? delay : 60)) / 1000,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            onAnimationComplete={index === words.length - 1 ? onLetterAnimationComplete : undefined}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    );
  }

  // ── Char split (short text only) ─────────────────────────────────────────
  const words = text.split(' ');
  let globalCharIndex = 0;
  const totalCharsLength = text.replace(/\s/g, '').length;

  return (
    <Tag
      className={`inline-flex flex-wrap gap-[0.25em] ${justifyClass} ${className}`}
      style={{ textAlign, perspective: 1000 }}
    >
      {words.map((word, wordIdx) => {
        const chars = word.split('');
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {chars.map((char, charIdx) => {
              const charIndex = globalCharIndex++;
              return (
                <motion.span
                  key={charIdx}
                  initial={initialStyle}
                  whileInView={animateStyle}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration,
                    delay: (charIndex * delay) / 1000,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  onAnimationComplete={
                    charIndex === totalCharsLength - 1 ? onLetterAnimationComplete : undefined
                  }
                  className="inline-block will-change-transform"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
};

export default SplitText;
