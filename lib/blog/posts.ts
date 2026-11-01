/**
 * @fileoverview Blog post data module for CreditBuddy.
 *
 * A pure, typed data layer (no React imports) describing the Student
 * Financial Journal articles. Each post carries a `bodyKey` that the
 * dynamic route (`app/blog/[slug]/page.tsx`) maps to a dedicated React
 * body component — keeping the server/client boundary clean and the
 * build dependency-free (no MDX / gray-matter).
 *
 * Authors are real people from the team & advisory board (see
 * `components/about/AboutTeamSection.tsx` and `AboutAdvisorsSection.tsx`).
 *
 * @see {@link file:///d:/Vibe%20projects/CredBud/app/blog/[slug]/page.tsx}
 */

// ─── Types ───────────────────────────────────────────────────────────────────

/** Author of a blog post. `initials` drive the avatar circle. */
export interface BlogAuthor {
  /** Full name, e.g. "Debasish Mallick". */
  name: string;
  /** Role / title, e.g. "Founder & CEO". */
  role: string;
  /** Two-letter initials for the avatar circle, e.g. "DM". */
  initials: string;
}

/** A single blog article. */
export interface Post {
  /** URL slug, e.g. "build-cibil-score-from-scratch-student". */
  slug: string;
  /** Article headline. */
  title: string;
  /** Short standfirst / dek used on cards and as meta description. */
  excerpt: string;
  /** Category label, e.g. "Credit 101". */
  category: string;
  /** Tailwind classes for the category pill, e.g. "bg-accent-purple text-white". */
  categoryColor: string;
  /** Post author. */
  author: BlogAuthor;
  /** Publication date in ISO 8601, e.g. "2026-08-05". */
  date: string;
  /** Human reading-time label, e.g. "7 min read". */
  readingTime: string;
  /** Cover image path under /public (empty string = CSS-gradient fallback). */
  coverImage: string;
  /** SEO / topic tags. */
  tags: string[];
  /**
   * Optional phrase within `title` to underline in the article hero for an
   * editorial accent. Omit for a plain title.
   */
  highlight?: string;
  /** Whether this post is the featured article on the index. */
  featured?: boolean;
  /**
   * Key the route uses to resolve the article body component.
   * `null` means the post renders the generic article shell.
   */
  bodyKey: string | null;
}

// ─── Authors ─────────────────────────────────────────────────────────────────
// Real people — sourced from the About team & advisory board.

const DEBASISH_MALLICK: BlogAuthor = {
  name: 'Debasish Mallick',
  role: 'Founder & CEO',
  initials: 'DM',
};

const NIDHI_AGRAWAL: BlogAuthor = {
  name: 'CA Nidhi Agrawal',
  role: 'Finance & Compliance Advisor',
  initials: 'NA',
};

const KARAN_AGRAWAL: BlogAuthor = {
  name: 'Karan Agrawal',
  role: 'Business Strategy',
  initials: 'KA',
};

const AYUSH_NANDA: BlogAuthor = {
  name: 'Ayush Nanda',
  role: 'Business Advisor',
  initials: 'AN',
};

// ─── Posts ────────────────────────────────────────────────────────────────────

/**
 * Static post catalogue. One entry is `featured: true` and carries a
 * `bodyKey` resolving to the rich article body; the others are
 * realistic brand-aligned placeholders that render the generic shell.
 */
export const POSTS: Post[] = [
  {
    slug: 'build-cibil-score-from-scratch-student',
    title: 'How to Build Your CIBIL Score from Scratch as a Student',
    excerpt:
      'Most students start adulthood with zero credit history. Here is a practical, step-by-step ' +
      'playbook to build a 700+ CIBIL score safely while still in college — no jargon, no traps.',
    category: 'Credit 101',
    categoryColor: 'bg-accent-purple text-white',
    author: DEBASISH_MALLICK,
    date: '2026-08-05',
    readingTime: '7 min read',
    coverImage: '/images/blog/build-cibil-score-cover.svg',
    tags: [
      'CIBIL score',
      'build credit',
      'student credit',
      'credit history',
      'India',
      'first credit score',
    ],
    highlight: 'CIBIL Score',
    featured: true,
    bodyKey: 'build-cibil-score',
  },
  {
    slug: 'high-paying-micro-gigs-college-students-2026',
    title: 'Top 7 High-Paying Micro Gigs for College Students in 2026',
    excerpt:
      'From brand promotions to ambassador roles, here are seven micro-gigs that can earn you ' +
      '₹5,000 to ₹15,000 a month between lectures — and how to land them.',
    category: 'Campus Gigs',
    categoryColor: 'bg-accent-gold text-ink',
    author: AYUSH_NANDA,
    date: '2026-07-28',
    readingTime: '5 min read',
    coverImage: '/images/gigs.webp',
    tags: [
      'campus gigs',
      'student side hustle',
      'earn in college',
      'micro jobs',
      'student income India',
    ],
    bodyKey: null,
  },
  {
    slug: '50-30-20-rule-student-pocket-money',
    title: 'The 50/30/20 Rule Modified for Pocket Money & Stipends',
    excerpt:
      'Classic budgeting rules assume a steady salary. Here is a practical 50/30/20 framework ' +
      'rebuilt for irregular student income — pocket money, stipends, and gig earnings.',
    category: 'Budgeting',
    categoryColor: 'bg-accent-cyan text-ink',
    author: NIDHI_AGRAWAL,
    date: '2026-07-20',
    readingTime: '4 min read',
    coverImage: '/images/internships.webp',
    tags: [
      'budgeting',
      '50/30/20 rule',
      'student money management',
      'pocket money',
      'saving tips students',
    ],
    bodyKey: null,
  },
  {
    slug: 'become-creditbuddy-campus-ambassador',
    title: 'Become a CreditBuddy Campus Ambassador: Earn While You Lead',
    excerpt:
      'Bring fair credit and financial literacy to your campus, build your resume, and earn ' +
      'rewards — a field guide to the CreditBuddy ambassador programme.',
    category: 'Ambassador Program',
    categoryColor: 'bg-accent-lime text-ink',
    author: KARAN_AGRAWAL,
    date: '2026-07-12',
    readingTime: '5 min read',
    coverImage: '/images/referrals.webp',
    tags: [
      'campus ambassador',
      'student leadership',
      'earn while you learn',
      'college ambassador program',
      'CreditBuddy ambassador',
    ],
    bodyKey: null,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Format an ISO date string as a deterministic, locale-independent label
 * (e.g. "2026-08-05" → "Aug 5, 2026"). Pure + SSR-safe — avoids hydration
 * mismatches from locale-dependent `toLocaleDateString` output.
 */
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function formatDate(iso: string): string {
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  const [y, m, d] = parts;
  const monthIdx = Number(m) - 1;
  if (monthIdx < 0 || monthIdx > 11) return iso;
  const day = Number(d);
  return `${MONTHS[monthIdx]} ${day}, ${y}`;
}

/** Look up a single post by its slug. */
export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}

/** All post slugs — used by `generateStaticParams`. */
export function getAllPostSlugs(): string[] {
  return POSTS.map((post) => post.slug);
}

/**
 * Related posts for a given slug. Prefers a different category first,
 * then fills with any remaining posts. Excludes the current slug.
 *
 * @param slug - The current post's slug.
 * @param count - How many related posts to return (default 3).
 */
export function getRelatedPosts(slug: string, count = 3): Post[] {
  const current = getPostBySlug(slug);
  const others = POSTS.filter((post) => post.slug !== slug);

  if (!current) {
    return others.slice(0, count);
  }

  const differentCategory = others.filter(
    (post) => post.category !== current.category,
  );
  const sameCategory = others.filter(
    (post) => post.category === current.category,
  );

  return [...differentCategory, ...sameCategory].slice(0, count);
}

// ─── FAQ content for the featured post (mirrors the visible FAQ) ────────────
// Defined here so both the visible FAQ block and the FAQPage JSON-LD share
// a single source of truth.

export interface QA {
  question: string;
  answer: string;
}

/** FAQ pairs for the featured CIBIL-score article. */
export const BUILD_CIBIL_FAQS: QA[] = [
  {
    question: 'Can I really build a CIBIL score as a student with no income?',
    answer:
      'Yes. A credit score is built from a repayment trail, not your income. A small, ' +
      'responsibly managed credit line — like CreditBuddy — lets you create that trail with ' +
      'tiny, on-time repayments long before you have a salary.',
  },
  {
    question: 'Does checking my own CIBIL score lower it?',
    answer:
      'No. Checking your own score is a "soft pull" and has zero impact. Only a lender ' +
      'initiating a fresh application does a "hard inquiry," so space out applications and ' +
      'self-check as often as you like.',
  },
  {
    question: 'Is zero credit history a good thing?',
    answer:
      "No — to lenders, no history is a blank slate, not a clean record. A thin or empty " +
      'file often gets you rejected or offered worse terms. Starting early with a small ' +
      'credit line turns that blank slate into a proven repayment record.',
  },
  {
    question: 'How long until I see a real CIBIL score?',
    answer:
      'Bureaus typically need around 3–6 months of active repayment history to generate a ' +
      'stable score. Start small, repay on time every cycle, and you should see a ' +
      'meaningful score inside your first two semesters.',
  },
];

/** HowTo steps for the featured article (mirrors the visible StepCards). */
export const BUILD_CIBIL_STEPS: { name: string; text: string }[] = [
  {
    name: 'Open a student micro-credit line',
    text: 'Start with a small CreditBuddy credit line built for students. Borrow a modest amount and repay on time to create your first repayment trail.',
  },
  {
    name: 'Keep credit utilization under 30%',
    text: 'Never max out even a small limit. Using less than 30% of your available credit signals that you borrow within your means.',
  },
  {
    name: 'Pay every bill on or before the due date',
    text: 'Payment history is 35% of your CIBIL score. A single missed payment can linger for years, so automate or calendar every due date.',
  },
  {
    name: 'Build a healthy credit mix over time',
    text: 'A small credit line plus, eventually, a secured or student-oriented entry creates a diversified profile that bureaus reward.',
  },
  {
    name: 'Avoid multiple hard inquiries',
    text: 'Space out new applications. Every fresh lender application is a hard inquiry, so self-check with soft pulls and apply deliberately.',
  },
];

// ─── Author bios + links (shared by the post bodies) ─────────────────────────
// Sourced from the About team & advisory board copy so author voices stay
// consistent with the rest of the site.

export const AUTHOR_BIOS: Record<string, string> = {
  [DEBASISH_MALLICK.name]:
    'A student founder building CreditBuddy to solve real financial challenges students face. ' +
    'Combining technology and insight to create a system where students can borrow, earn, and ' +
    'grow with confidence. On a mission to make financial access a right, not a privilege, for ' +
    'every college student in India.',
  [NIDHI_AGRAWAL.name]:
    'Oversees financial structuring, compliance, and regulatory alignment across CreditBuddy. ' +
    'She ensures accurate reporting, clean accounting systems, and adherence to all statutory ' +
    'and RBI guidelines — and writes plainly so students actually understand the rules that ' +
    'govern their money.',
  [KARAN_AGRAWAL.name]:
    'Drives NBFC partnerships, lending structure, and capital strategy at CreditBuddy. He ' +
    'works across the student-credit ecosystem to make borrowing safe, transparent, and ' +
    'accessible for first-time borrowers on campus.',
  [AYUSH_NANDA.name]:
    'Advises on fundraising and national expansion strategy for CreditBuddy. A close ' +
    'observer of the campus gig economy, he writes about how students can turn small, ' +
    'flexible earnings into real financial momentum.',
};

export const AUTHOR_LINKS: Record<string, string> = {
  [DEBASISH_MALLICK.name]: 'https://linkedin.com/company/creditbuddy',
  [NIDHI_AGRAWAL.name]: 'https://linkedin.com/company/creditbuddy',
  [KARAN_AGRAWAL.name]: 'https://linkedin.com/company/creditbuddy',
  [AYUSH_NANDA.name]: 'https://linkedin.com/company/creditbuddy',
};
