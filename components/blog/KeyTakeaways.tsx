/**
 * @fileoverview KeyTakeaways — summary checklist block.
 *
 * A brutalist card listing the article's key takeaways with check icons.
 * Reused on the featured post and the generic article shell.
 */

import React from 'react';
import { Check } from 'lucide-react';

export interface KeyTakeawaysProps {
  /** The takeaway lines (rendered in order). */
  items: string[];
  /** Optional block heading (defaults to "Key takeaways"). */
  title?: string;
}

/**
 * Render a key-takeaways summary block. Accessible: an unordered list with
 * each item as a list item; the check icon is decorative.
 */
export const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({
  items,
  title = 'Key takeaways',
}) => {
  return (
    <section
      className="my-10 md:my-12 brutal-card bg-accent-lime rounded-2xl p-6 md:p-8"
      style={{ boxShadow: '6px 6px 0px #14100F' }}
      aria-label={title}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span
          aria-hidden="true"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white border-[1.6px] border-ink shrink-0"
        >
          <Check className="h-4.5 w-4.5 text-ink" strokeWidth={3} />
        </span>
        <h3 className="font-bricolage text-xl md:text-2xl font-extrabold text-ink leading-tight">
          {title}
        </h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink"
            >
              <Check className="h-3 w-3 text-accent-lime" strokeWidth={4} />
            </span>
            <span className="font-jakarta text-base md:text-[1.05rem] text-ink leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default KeyTakeaways;
