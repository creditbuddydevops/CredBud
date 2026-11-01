/**
 * @fileoverview Callout — accent callout / tip / warning / note box.
 *
 * A brutalist card with a coloured left rail and a leading icon, used to
 * break up article body copy with high-signal, scannable advice.
 */

import React from 'react';
import { Lightbulb, AlertTriangle, Info } from 'lucide-react';

type Variant = 'tip' | 'warning' | 'note';

const VARIANT_STYLES: Record<
  Variant,
  { rail: string; icon: React.ElementType; label: string }
> = {
  tip: { rail: 'bg-accent-lime', icon: Lightbulb, label: 'Tip' },
  warning: { rail: 'bg-accent-coral', icon: AlertTriangle, label: 'Watch out' },
  note: { rail: 'bg-accent-cyan', icon: Info, label: 'Note' },
};

export interface CalloutProps {
  /** Short label rendered as the callout heading (e.g. "Common myths busted"). */
  title: string;
  /** Body content — supports rich markup via children. */
  children: React.ReactNode;
  /** Visual variant; controls rail colour + icon. */
  variant?: Variant;
}

/**
 * Render an accent callout box. Accessible: the icon is decorative
 * (`aria-hidden`) and the title is a real heading.
 */
export const Callout: React.FC<CalloutProps> = ({
  title,
  children,
  variant = 'tip',
}) => {
  const { rail, icon: Icon, label } = VARIANT_STYLES[variant];

  return (
    <aside
      className={`relative my-8 md:my-10 brutal-border bg-white rounded-2xl overflow-hidden ${rail}`}
      style={{ boxShadow: '6px 6px 0px #14100F' }}
    >
      {/* Coloured left rail */}
      <div className="flex">
        <div className={`w-1.5 md:w-2 shrink-0 ${rail} border-r-[1.6px] border-ink`} />
        <div className="flex-1 px-6 md:px-8 py-6 md:py-7">
          <div className="flex items-center gap-2.5 mb-3">
            <span
              aria-hidden="true"
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${rail} border-[1.6px] border-ink shrink-0`}
            >
              <Icon className="h-4 w-4 text-ink" strokeWidth={2.5} />
            </span>
            <span className="font-jetbrains text-[11px] font-bold uppercase tracking-widest text-ink-muted">
              {label}
            </span>
          </div>
          <h3 className="font-bricolage text-xl md:text-2xl font-extrabold text-ink mb-3 leading-tight">
            {title}
          </h3>
          <div className="font-jakarta text-base md:text-[1.05rem] text-ink/85 leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-1.5 [&_strong]:font-bold [&_strong]:text-ink">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Callout;
