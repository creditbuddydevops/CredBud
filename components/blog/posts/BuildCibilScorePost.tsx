'use client';

/**
 * @fileoverview BuildCibilScorePost — the featured article body.
 *
 * "How to Build Your CIBIL Score from Scratch as a Student" — a rich,
 * magazine-style article body composed of designed blocks: drop-cap intro,
 * pull quote, a factor-breakdown callout with percentage bars, five numbered
 * step cards, a good-vs-bad comparison table, a CIBIL-score growth timeline
 * diagram, a myth-busting warning callout, key takeaways, and an author bio.
 *
 * Motion: GSAP + ScrollTrigger reveals on section blocks only (readability
 * first — body paragraphs are never animated).
 */

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Post } from '@/lib/blog/posts';
import { AUTHOR_BIOS, AUTHOR_LINKS, BUILD_CIBIL_FAQS } from '@/lib/blog/posts';
import { PullQuote } from '../PullQuote';
import { Callout } from '../Callout';
import { StepCard } from '../StepCard';
import { KeyTakeaways } from '../KeyTakeaways';
import { AuthorBio } from '../AuthorBio';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Small inline section heading ────────────────────────────────────────────

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-5 md:mb-6">
      <span className="font-jetbrains text-xs font-bold text-ink-muted block mb-2">
        {eyebrow}
      </span>
      <h2 className="font-bricolage text-3xl md:text-4xl font-extrabold tracking-tight text-ink leading-[1.05]">
        {title}
      </h2>
    </div>
  );
}

// ─── The five CIBIL factors (with percentage bars) ───────────────────────────

const CIBIL_FACTORS: { label: string; pct: number; color: string }[] = [
  { label: 'Payment history', pct: 35, color: 'bg-accent-purple' },
  { label: 'Credit utilization', pct: 30, color: 'bg-accent-cyan' },
  { label: 'Length of credit history', pct: 15, color: 'bg-accent-lime' },
  { label: 'Credit mix', pct: 10, color: 'bg-accent-gold' },
  { label: 'New credit inquiries', pct: 10, color: 'bg-accent-coral' },
];

// ─── Good vs bad habits (comparison table) ───────────────────────────────────

const HABITS: { good: string; bad: string }[] = [
  { good: 'Pay every bill on or before the due date', bad: 'Miss due dates and rack up late marks' },
  { good: 'Keep utilization under 30% of your limit', bad: 'Max out even a small credit line' },
  { good: 'Self-check your score with soft pulls', bad: 'Trigger many hard inquiries at once' },
  { good: 'Hold one credit line at a time', bad: 'Apply for many products simultaneously' },
  { good: 'Keep older accounts open for history', bad: 'Close cards impulsively' },
  { good: 'Budget and borrow with CreditBuddy', bad: 'Borrow new money to repay old money' },
];

// ─── Score-growth timeline (inline SVG) ──────────────────────────────────────
// Months 1 → 12, score climbing 0 → ~750, with milestone markers.

function ScoreGrowthTimeline() {
  // Chart geometry (viewBox 0 0 640 280). x: 40..600 (months 1..12), y: 240..30 (score 0..800).
  const xFor = (m: number) => 40 + ((m - 1) / 11) * 560;
  const yFor = (s: number) => 240 - (s / 800) * 210;

  const milestones = [
    { month: 1, score: 0, label: 'First on-time repayment' },
    { month: 3, score: 320, label: '3-month utilization target hit' },
    { month: 6, score: 560, label: 'Stable 6-month history' },
    { month: 12, score: 750, label: '700+ established' },
  ];

  const pathD = [
    `M ${xFor(1)} ${yFor(0)}`,
    `L ${xFor(3)} ${yFor(320)}`,
    `L ${xFor(6)} ${yFor(560)}`,
    `L ${xFor(12)} ${yFor(750)}`,
  ].join(' ');

  return (
    <figure className="my-2">
      <svg
        viewBox="0 0 640 300"
        className="w-full h-auto"
        role="img"
        aria-label="CIBIL score growth timeline from month 1 to 12, rising from 0 to about 750 with milestone markers at months 1, 3, 6 and 12."
      >
        {/* Grid baseline */}
        <line x1="40" y1="240" x2="600" y2="240" stroke="#14100F" strokeWidth="2.5" />
        <line x1="40" y1="30" x2="40" y2="240" stroke="#14100F" strokeWidth="2.5" />

        {/* Y-axis score labels */}
        <text x="30" y="244" textAnchor="end" fontFamily="monospace" fontSize="13" fill="#6B6259">0</text>
        <text x="30" y="34" textAnchor="end" fontFamily="monospace" fontSize="13" fill="#6B6259">800</text>
        <text x="18" y="140" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#6B6259" transform="rotate(-90 18 140)">Score</text>

        {/* Growth path */}
        <path d={pathD} fill="none" stroke="#7B5CFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Area under curve */}
        <path d={`${pathD} L ${xFor(12)} 240 L ${xFor(1)} 240 Z`} fill="#7B5CFF" opacity="0.1" />

        {/* Milestones */}
        {milestones.map((m, i) => (
          <g key={i}>
            <circle cx={xFor(m.month)} cy={yFor(m.score)} r="9" fill="#C8FF3D" stroke="#14100F" strokeWidth="3" />
            <text x={xFor(m.month)} y={yFor(m.score) - 18} textAnchor="middle" fontFamily="'Bricolage Grotesque', sans-serif" fontWeight="800" fontSize="20" fill="#14100F">
              {m.score}
            </text>
            <text x={xFor(m.month)} y="262" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="#14100F">M{m.month}</text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-4 space-y-1.5">
        {milestones.map((m, i) => (
          <div key={i} className="flex items-center gap-2 font-jetbrains text-xs text-ink-muted">
            <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-lime border border-ink text-[9px] font-bold text-ink">
              M{m.month}
            </span>
            <span>
              <strong className="text-ink">~{m.score}</strong> — {m.label}
            </span>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface BuildCibilScorePostProps {
  /** The featured post (provides the author for the bio card). */
  post: Post;
}

/**
 * Render the featured CIBIL-score article body. GSAP reveals are scoped to
 * `cibil-reveal` section blocks; paragraph text is never animated.
 */
export const BuildCibilScorePost: React.FC<BuildCibilScorePostProps> = ({
  post,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.cibil-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%' },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const bio = AUTHOR_BIOS[post.author.name] ?? '';
  const linkedin = AUTHOR_LINKS[post.author.name];

  return (
    <div ref={containerRef} className="space-y-10 md:space-y-14">
      {/* 1 — Drop-cap intro */}
      <div className="space-y-5">
        <p className="font-jakarta text-lg leading-relaxed text-ink/85 first-letter:font-bricolage first-letter:font-extrabold first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-accent-purple first-letter:float-left first-letter:mr-3 first-letter:mt-1">
          Here is the uncomfortable truth nobody tells you in college: most students start
          adulthood with a blank financial record. No salary slip, no credit card, no history —
          which sounds safe until the day you actually need credit and a lender sees a stranger
          with zero proof. Building a CIBIL score from scratch as a student is the single highest-ROI
          financial move you can make before you graduate, and it is far more doable than the
          jargon suggests.
        </p>
        <p className="font-jakarta text-lg leading-relaxed text-ink/85">
          The good news: a credit score is not about how much you earn — it is about how reliably you
          repay. That means a student with a small, well-managed credit line can build a 700+ score
          long before their first full-time job. This guide breaks the whole thing into plain
          English and five concrete steps.
        </p>
      </div>

      {/* 2 — Why it matters + pull quote */}
      <section className="cibil-reveal space-y-5">
        <SectionHeading eyebrow="// why it matters" title="Why your CIBIL score matters" />
        <p className="font-jakarta text-lg leading-relaxed text-ink/85">
          Your CIBIL score is a three-digit summary (300–900) of how trustworthy you are as a
          borrower. Landlords, lenders, even some employers treat it as a proxy for
          responsibility. A higher score unlocks cheaper loans, faster approvals, and better
          terms — and the only way to get one is to start a repayment trail early.
        </p>
        <p className="font-jakarta text-lg leading-relaxed text-ink/85">
          The catch for students is the classic chicken-and-egg: you need history to get credit,
          and credit to build history. That is exactly the gap a small student-oriented credit
          line is designed to close.
        </p>
        <PullQuote
          quote="Your CIBIL score is your financial fingerprint — start building it before you need it."
          attribution="Debasish Mallick, Founder & CEO"
          accent="purple"
        />
      </section>

      {/* 3 — Five factors callout with percentage bars */}
      <section className="cibil-reveal">
        <Callout title="The 5 factors that decide your CIBIL score" variant="tip">
          <p className="mb-5">
            Your score is not a mystery — it is a weighted blend of five behaviours. Here is how
            much each one counts, and why:
          </p>
          <ul className="space-y-3.5">
            {CIBIL_FACTORS.map((f) => (
              <li key={f.label} className="flex items-center gap-3">
                <span className="w-36 md:w-44 shrink-0 font-jetbrains text-xs font-bold text-ink">
                  {f.label}
                </span>
                <div className="flex-1 h-5 rounded-full bg-bg-secondary border-[1.6px] border-ink overflow-hidden">
                  <div
                    className={`h-full ${f.color} border-r-[1.6px] border-ink`}
                    style={{ width: `${f.pct * 2}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right font-jetbrains text-xs font-bold text-ink">
                  {f.pct}%
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-ink-muted">
            Notice that <strong className="text-ink">payment history</strong> and{' '}
            <strong className="text-ink">utilization</strong> together make up{' '}
            <strong className="text-ink">65%</strong> of your score. Master those two and the rest
            follows.
          </p>
        </Callout>
      </section>

      {/* 4 — Five numbered step cards */}
      <section className="cibil-reveal space-y-5">
        <SectionHeading eyebrow="// the playbook" title="5 steps to build your score from scratch" />
        <div className="space-y-5">
          <StepCard index={1} title="Open a student micro-credit line">
            Start with a small CreditBuddy credit line built for students — no existing CIBIL
            history needed. Borrow a modest amount you can comfortably repay, and repay it on
            time. That single recurring action is what creates your first repayment trail.
          </StepCard>
          <StepCard index={2} title="Keep credit utilization under 30%">
            Utilization is how much of your limit you actually use. Even with a tiny limit, never
            max it out — staying under 30% tells bureaus you borrow within your means. A small
            limit used lightly beats a big limit run right to the top.
          </StepCard>
          <StepCard index={3} title="Pay every bill on or before the due date">
            This is the big one: payment history is 35% of your score. A single missed payment can
            sit on your report for years. Automate it or calendar every due date, and treat the
            due date as a hard ceiling, not a suggestion.
          </StepCard>
          <StepCard index={4} title="Build a healthy credit mix over time">
            Bureaus like to see you handle different types of credit responsibly. A small credit
            line today, plus eventually a secured or student-oriented entry later, shows you can
            manage more than one kind of obligation.
          </StepCard>
          <StepCard index={5} title="Avoid multiple hard inquiries">
            Every fresh lender application triggers a hard inquiry, and several in a short window
            signals desperation. Space applications out, and self-check your score with soft pulls
            — those cost nothing and never dent your score.
          </StepCard>
        </div>
      </section>

      {/* 5 — Good vs bad comparison table */}
      <section className="cibil-reveal space-y-5">
        <SectionHeading eyebrow="// habits, not hacks" title="Good vs bad credit habits" />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse brutal-border rounded-2xl overflow-hidden bg-white" style={{ boxShadow: '6px 6px 0px #14100F' }}>
            <thead>
              <tr className="bg-accent-lime">
                <th scope="col" className="text-left font-jetbrains text-xs font-bold uppercase tracking-widest text-ink px-5 py-4 border-b-[1.6px] border-ink w-1/2">
                  Good habit
                </th>
                <th scope="col" className="text-left font-jetbrains text-xs font-bold uppercase tracking-widest text-ink px-5 py-4 border-b-[1.6px] border-ink border-l-[1.6px] border-ink w-1/2">
                  Bad habit
                </th>
              </tr>
            </thead>
            <tbody>
              {HABITS.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-bg-primary' : 'bg-white'}>
                  <td className="font-jakarta text-sm md:text-base text-ink px-5 py-3.5 border-b border-ink/10 align-top">
                    {row.good}
                  </td>
                  <td className="font-jakarta text-sm md:text-base text-ink-muted px-5 py-3.5 border-b border-ink/10 border-l-[1.6px] border-ink/10 align-top">
                    {row.bad}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6 — Score growth timeline diagram */}
      <section className="cibil-reveal space-y-5">
        <SectionHeading eyebrow="// the payoff" title="What your score growth looks like" />
        <div className="brutal-card bg-white rounded-2xl p-5 md:p-7" style={{ boxShadow: '6px 6px 0px #14100F' }}>
          <p className="font-jakarta text-base text-ink/85 leading-relaxed mb-5">
            Bureaus generally need 3–6 months of active repayment to generate a stable score.
            Here is a realistic trajectory when you follow the five steps — slow at first, then a
            clear climb as your history and habits compound.
          </p>
          <ScoreGrowthTimeline />
        </div>
      </section>

      {/* 7 — Myths busted (warning callout) */}
      <section className="cibil-reveal">
        <Callout title="Common myths busted" variant="warning">
          <ul className="space-y-2.5">
            <li>
              <strong>“Checking my own score lowers it.”</strong> No — that is a soft pull and has
              zero impact. Only a lender’s fresh application is a hard inquiry.
            </li>
            <li>
              <strong>“Zero credit history is a good thing.”</strong> No — to a lender, no history
              is a blank slate, not a clean record. It often means rejection or worse terms.
            </li>
            <li>
              <strong>“Closing old cards is smart.”</strong> Often the opposite — closing your
              oldest account shortens your average history length and can lower your score.
            </li>
          </ul>
        </Callout>
      </section>

      {/* 8 — Key takeaways */}
      <section className="cibil-reveal">
        <KeyTakeaways
          items={[
            'A credit score is built from a repayment trail, not your income — start small with a student credit line.',
            'Payment history (35%) and utilization (30%) are 65% of your score; master paying on time and staying under 30%.',
            'Keep utilization under 30% of your limit, even when the limit is tiny.',
            'Space out applications to avoid multiple hard inquiries; self-check with soft pulls.',
            'It takes roughly 3–6 months to generate a stable score — start before you need it.',
          ]}
        />
      </section>

      {/* 9 — FAQ */}
      <section className="cibil-reveal space-y-5" aria-labelledby="faq-heading">
        <SectionHeading eyebrow="// common questions" title="Frequently asked questions" />
        <div className="space-y-3">
          {BUILD_CIBIL_FAQS.map((faq, i) => (
            <details
              key={i}
              className="brutal-card bg-white rounded-2xl overflow-hidden group"
              style={{ boxShadow: '4px 4px 0px #14100F' }}
            >
              <summary className="flex cursor-pointer select-none items-center justify-between px-5 py-4 font-bricolage font-extrabold text-lg text-ink list-none gap-3 hover:bg-accent-lime/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-purple">
                {faq.question}
                <span className="shrink-0 w-7 h-7 rounded-full bg-accent-lime border-[1.6px] border-ink flex items-center justify-center font-jetbrains text-sm font-bold text-ink transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 pt-1 border-t border-ink/10">
                <p className="font-jakarta text-base leading-relaxed text-ink/80">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 10 — Author bio */}
      <section className="cibil-reveal">
        <AuthorBio author={post.author} bio={bio} linkedin={linkedin} />
      </section>
    </div>
  );
};

export default BuildCibilScorePost;
