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

  // On mobile: always word-split, disable blur filter, shorter animation.
  // Char-split = 50+ motion nodes simultaneously on mobile = jank.
  // blur variant = CSS filter:blur() = GPU repaint every frame.
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const effectiveSplit    = isMobile ? 'words' : splitType;
  const effectiveVariant  = (isMobile && variant === 'blur') ? 'rise' : variant;
  const effectiveDuration = isMobile ? Math.min(duration, 0.4) : duration;
  const effectiveDelay    = isMobile ? Math.min(delay, 40) : delay;

  let initialStyle = from;
  let animateStyle = to;

  if (!initialStyle) {
    if (effectiveVariant === 'blur') {
      initialStyle = { opacity: 0, y: 20, filter: 'blur(8px)' };
      animateStyle = { opacity: 1, y: 0, filter: 'blur(0px)' };
    } else if (effectiveVariant === 'flip') {
      initialStyle = { opacity: 0, y: 30, rotateX: -60 };
      animateStyle = { opacity: 1, y: 0, rotateX: 0 };
    } else {
      initialStyle = { opacity: 0, y: isMobile ? 15 : 35 };
      animateStyle = { opacity: 1, y: 0 };
    }
  }
  if (!animateStyle) animateStyle = { opacity: 1, y: 0 };

  const justifyClass =
    textAlign === 'left' ? 'justify-start' :
    textAlign === 'right' ? 'justify-end' : 'justify-center';

  // Word split
  if (effectiveSplit === 'words') {
    const words = text.split(' ');
    return (
      <Tag
        className={`inline-flex flex-wrap gap-[0.25em] ${justifyClass} ${className}`}
        style={{ textAlign, perspective: isMobile ? undefined : 1000 }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={initialStyle}
            whileInView={animateStyle}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: effectiveDuration,
              delay: (index * (effectiveDelay > 40 ? effectiveDelay : 60)) / 1000,
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

  // Char split (desktop only path)
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
                    duration: effectiveDuration,
                    delay: (charIndex * effectiveDelay) / 1000,
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
