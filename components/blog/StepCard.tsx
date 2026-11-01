/**
 * @fileoverview StepCard — numbered step card for HowTo-style sequences.
 *
 * Used in the featured article's 5-step block. A brutalist card with a large
 * circled index number, a title, and rich body content.
 */

import React from 'react';

export interface StepCardProps {
  /** 1-based step index shown in the circle. */
  index: number;
  /** Short step title. */
  title: string;
  /** Rich body content. */
  children: React.ReactNode;
  /** Optional lucide icon node rendered beside the title. */
  icon?: React.ReactNode;
}

/**
 * Render a single numbered step card. Accessible: the index is an aria-label
 * on the number circle so screen readers announce "Step N".
 */
export const StepCard: React.FC<StepCardProps> = ({
  index,
  title,
  children,
  icon,
}) => {
  return (
    <article
      className="relative brutal-card bg-white rounded-2xl p-6 md:p-7 flex gap-4 md:gap-6"
      style={{ boxShadow: '6px 6px 0px #14100F' }}
    >
      {/* Circled step number */}
      <div
        className="shrink-0"
        aria-label={`Step ${index}`}
      >
        <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-accent-lime border-[1.6px] border-ink shadow-[3px_3px_0px_#14100F]">
          <span className="font-bricolage font-extrabold text-2xl md:text-3xl text-ink leading-none">
            {index}
          </span>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="font-jetbrains text-[11px] font-bold uppercase tracking-widest text-ink-muted">
            Step {String(index).padStart(2, '0')}
          </span>
          {icon ? <span className="text-accent-purple shrink-0">{icon}</span> : null}
        </div>
        <h3 className="font-bricolage text-xl md:text-2xl font-extrabold text-ink leading-tight mb-2.5">
          {title}
        </h3>
        <div className="font-jakarta text-base text-ink/85 leading-relaxed [&_strong]:font-bold [&_strong]:text-ink">
          {children}
        </div>
      </div>
    </article>
  );
};

export default StepCard;
