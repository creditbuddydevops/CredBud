'use client';

/**
 * @fileoverview GenericPost — the article body for non-featured posts.
 *
 * A clean, on-brand article shell: a drop-cap intro, 3–4 short brand-aligned
 * paragraphs, one tip Callout, and a KeyTakeaways block. The featured post
 * uses a dedicated body (`BuildCibilScorePost`); the others render this so
 * their `/blog/<slug>` routes build and look intentional, not like stubs.
 */

import React from 'react';
import type { Post } from '@/lib/blog/posts';
import { AUTHOR_BIOS, AUTHOR_LINKS } from '@/lib/blog/posts';
import { Callout } from '../Callout';
import { KeyTakeaways } from '../KeyTakeaways';
import { AuthorBio } from '../AuthorBio';

/** Per-post authored content for the generic articles. */
interface PostContent {
  /** Opening + body paragraphs (the first gets a drop-cap). */
  paragraphs: string[];
  /** The tip callout. */
  callout: { title: string; body: React.ReactNode };
  /** Key takeaways (3 items). */
  takeaways: string[];
}

const CONTENT: Record<string, PostContent> = {
  'high-paying-micro-gigs-college-students-2026': {
    paragraphs: [
      'Your stipend stretches further when you stop trading time for ₹0 and start trading it for something. The campus economy is full of small, flexible gigs that fit between lectures and actually pay — the trick is knowing which ones are worth your hours.',
      'Brand promotions and on-campus event support are the most common starter gigs: a few hours on a weekend can net ₹500 to ₹2,000, paid quickly, often in cash or UPI. They build the soft skills recruiters love — communication, hustle, showing up on time — while your bank balance quietly grows.',
      'The higher-paying tier is skill-based: content creation, short video editing, design thumbnails, running social media for a local business, or tutoring juniors. These compound: once you deliver good work for one client, referrals do the selling for you, and your hourly rate climbs.',
      'The CreditBuddy gig marketplace exists exactly so students can stack these micro-jobs against loan repayments. Earn from a gig, apply it straight to your balance, and you are simultaneously building income, a repayment trail, and your CIBIL score — three wins from one Saturday.',
    ],
    callout: {
      title: 'Price for your hours, not your nerves',
      body: (
        <>
          <p>
            Never quote a flat fee without estimating the hours. A ₹1,000 gig that eats 12
            hours is <strong>₹83/hour</strong>; a ₹600 gig done in 3 hours is <strong>₹200/hour</strong>.
            The second one wins. Track your real time for two weeks, then quote per-hour or
            per-deliverable so you stop subsidising badly scoped work.
          </p>
        </>
      ),
    },
    takeaways: [
      'Start with low-friction gigs (promotions, events) and graduate to skill-based work that compounds via referrals.',
      'Always estimate hours before agreeing to a flat fee — your hourly rate is what actually matters.',
      'Route gig earnings straight into repayments to build income, a repayment trail, and your CIBIL score at once.',
    ],
  },
  '50-30-20-rule-student-pocket-money': {
    paragraphs: [
      'The classic 50/30/20 rule splits income into needs, wants, and savings — but it was written for a steady salary, and student income is anything but. Pocket money arrives in lumps, stipends come monthly, and gig earnings are gloriously irregular. The framework still works, it just needs a student-friendly remix.',
      'The fix is to budget on a conservative monthly floor, not your best month. Add up your guaranteed income (pocket money + any fixed stipend) and apply 50/30/20 to that. Anything you earn above the floor — gigs, one-off bonuses — gets split too, but with a heavier weight toward savings so an irregular month never sinks you.',
      'Track for one full month before you allocate a rupee. Most students are shocked at how fast ₹200 UPI spends here and there add up. Once you see the real numbers, 50% for genuine needs, 30% for guilt-free wants, and 20% straight to savings stops feeling restrictive and starts feeling like breathing room.',
      'The 20% is where students usually skip — and it is the whole point. Even ₹500 a month, saved automatically the day money lands, builds a cushion that keeps you from borrowing for the next phone repair, and quietly funds your first investment.',
    ],
    callout: {
      title: 'Automate the 20% on the day money lands',
      body: (
        <>
          <p>
            If you wait until the end of the month to &ldquo;save what is left,&rdquo; nothing is
            ever left. Move your 20% into a separate account the moment income arrives — a
            standing UPI instruction or an auto-debit does this without willpower. You cannot
            spend what you have already moved out of sight.
          </p>
        </>
      ),
    },
    takeaways: [
      'Budget on your guaranteed monthly floor, not your best month — irregular income needs a cushion.',
      'Track one full month of real spending before you set any split; the numbers always surprise you.',
      'Automate the 20% savings the day money lands so willpower is never the bottleneck.',
    ],
  },
  'become-creditbuddy-campus-ambassador': {
    paragraphs: [
      'A campus ambassador is the bridge between a brand and a campus — the person who knows both worlds and connects them. At CreditBuddy, that means bringing fair, transparent credit and real financial literacy to your classmates, many of whom are about to make their first money mistakes.',
      'The role is deliberately flexible. You run small on-campus campaigns, host a money-skills session, or spread the word through channels you already use — Instagram, class groups, society events. There is no rigid shift; you build the work around your timetable, which is exactly why it fits student life.',
      'What you earn is real but secondary to what you build. Ambassador rewards compound into a portfolio of evidence — campaign metrics, leadership, public speaking — that recruiters read as experience, not volunteering. It is the rare student role that pays you while it sharpens your CV.',
      'The deeper payoff is the network. You meet other ambassadors across colleges, founders who guest-mentor, and peers who later become co-founders, clients, and recommenders. A well-run ambassador stint quietly becomes one of the highest-ROI things you can do in college.',
    ],
    callout: {
      title: 'Treat it like a real role, because it is',
      body: (
        <>
          <p>
            The ambassadors who stand out are not the loudest — they are the ones who treat it
            like a job: show up on time, follow up, track what worked, and report it. Keep a
            simple log of every action and its result. That log becomes your case studies, your
            CV bullets, and your leverage when you ask for bigger opportunities.
          </p>
        </>
      ),
    },
    takeaways: [
      'Ambassador work fits student life because it is flexible and built around your timetable.',
      'The real value compounds: campaign metrics and leadership become CV evidence that reads as experience.',
      'Track every action and result in a log — it becomes your case studies and your leverage later.',
    ],
  },
};

/** Fallback content for any future post without authored copy. */
const FALLBACK: PostContent = {
  paragraphs: [
    'This article is part of the CreditBuddy Student Financial Journal — practical, jargon-free money guidance for Indian college students.',
    'We are still polishing the full version. In the meantime, the key takeaways below capture the essentials.',
  ],
  callout: {
    title: 'More on the way',
    body: <p>New, fully-written articles land here regularly. Check back soon for the complete guide.</p>,
  },
  takeaways: [
    'Practical, student-first money advice — no jargon.',
    'Brand-aligned with CreditBuddy’s borrow, earn, learn, and build-credit mission.',
    'New articles are added regularly; check back for the full version.',
  ],
};

export interface GenericPostProps {
  /** The post to render. */
  post: Post;
}

/**
 * Render a generic (non-featured) article body. The first paragraph receives
 * a drop-cap; the rest flow as comfortable reading copy.
 */
export const GenericPost: React.FC<GenericPostProps> = ({ post }) => {
  const content = CONTENT[post.slug] ?? FALLBACK;
  const bio = AUTHOR_BIOS[post.author.name] ?? '';
  const linkedin = AUTHOR_LINKS[post.author.name];

  return (
    <div className="space-y-5">
      {content.paragraphs.map((para, i) => (
        <p
          key={i}
          className={`font-jakarta text-lg leading-relaxed text-ink/85 ${
            i === 0 ? 'first-letter:font-bricolage first-letter:font-extrabold first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-accent-purple first-letter:float-left first-letter:mr-2 first-letter:mt-1' : ''
          }`}
        >
          {para}
        </p>
      ))}

      <Callout title={content.callout.title} variant="tip">
        {content.callout.body}
      </Callout>

      <KeyTakeaways items={content.takeaways} />

      <AuthorBio author={post.author} bio={bio} linkedin={linkedin} />
    </div>
  );
};

export default GenericPost;
