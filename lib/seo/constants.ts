/**
 * @fileoverview Site-wide SEO constants for CreditBuddy.
 *
 * This module is the **single source of truth** for every piece of
 * organisation-level metadata that appears across the site:
 *   - Base URL / canonical origin
 *   - Brand identity (name, legal entity, tagline)
 *   - Company registration details (CIN, GSTIN, address)
 *   - Social media profile URLs
 *   - Brand colour tokens used in `theme-color` / OG meta
 *   - Default Open Graph image path
 *
 * Import from `@/lib/seo` (barrel) or directly from this file.
 */

// ---------------------------------------------------------------------------
// Site Origin
// ---------------------------------------------------------------------------

/**
 * Canonical base URL for the production site.
 * Used to construct absolute canonical URLs, sitemap entries, and OG URLs.
 */
export const SITE_URL = 'https://creditbuddy.org.in' as const;

// ---------------------------------------------------------------------------
// Brand Identity
// ---------------------------------------------------------------------------

/** Public-facing brand name used in `<title>` tags and structured data. */
export const SITE_NAME = 'CreditBuddy' as const;

/** Legal entity name as registered with the MCA. */
export const LEGAL_ENTITY_NAME = 'CreditBuddy Partners Private Limited' as const;

/** One-liner tagline appended to page titles and used in meta descriptions. */
export const SITE_TAGLINE = "India's Student-First Financial Ecosystem" as const;

/**
 * Full default description used when a page does not provide its own.
 * Targets primary SEO keywords:
 *   student credit, campus gigs, financial literacy, CIBIL score,
 *   college students, India, micro-loans, campus ambassador
 */
export const SITE_DESCRIPTION =
  "CreditBuddy is India's pioneering student-first financial ecosystem. Get instant micro-credit, earn through campus gigs, build your CIBIL score early, and master financial literacy — all designed exclusively for Indian college students.";

// ---------------------------------------------------------------------------
// Company Registration Details
// ---------------------------------------------------------------------------

/** Corporate Identification Number (CIN). */
export const COMPANY_CIN = 'U62090OD2026PTC053104' as const;

/** Goods and Services Tax Identification Number (GSTIN). */
export const COMPANY_GSTIN = '21AANCC6754D1ZS' as const;

/** Physical registered office address. */
export const COMPANY_ADDRESS = {
  streetAddress:
    'PLOT NO. 1380/6628 Near Gram Devi Mandir, Matru Vihar, Shanti Nagar, Budharaja',
  addressLocality: 'Sambalpur',
  addressRegion: 'Odisha',
  postalCode: '768004',
  addressCountry: 'IN',
} as const;

/** Primary contact e-mail addresses. */
export const CONTACT_EMAILS = [
  'info@creditbuddy.org.in',
  'creditbuddyofficial@gmail.com',
] as const;

// ---------------------------------------------------------------------------
// Social Media
// ---------------------------------------------------------------------------

/**
 * Social profile URLs referenced in JSON-LD `sameAs` and footer links.
 * Update these when official brand handles are finalised.
 */
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/creditbuddy',
  twitter: 'https://twitter.com/creditbuddy',
  linkedin: 'https://linkedin.com/company/creditbuddy',
} as const;

// ---------------------------------------------------------------------------
// Brand Colours (used in theme-color, OG, manifest)
// ---------------------------------------------------------------------------

/** Primary background colour (warm off-white). */
export const COLOR_BG_PRIMARY = '#FBF7EF' as const;

/** Accent lime green used for CTAs and highlights. */
export const COLOR_ACCENT_LIME = '#C8FF3D' as const;

/** Accent purple used for interactive elements. */
export const COLOR_ACCENT_PURPLE = '#7B5CFF' as const;

/** Dark ink colour used for text and borders. */
export const COLOR_INK = '#14100F' as const;

// ---------------------------------------------------------------------------
// Default OG Image
// ---------------------------------------------------------------------------

/**
 * Absolute path (relative to `public/`) for the default Open Graph share
 * image. Should be 1200 × 630 px for optimal rendering on all platforms.
 */
export const DEFAULT_OG_IMAGE = '/images/og-default.webp' as const;

// ---------------------------------------------------------------------------
// Locale
// ---------------------------------------------------------------------------

/** Default locale for `og:locale` and `<html lang>`. */
export const DEFAULT_LOCALE = 'en_IN' as const;

/** Language tag used in `<html lang>`. */
export const HTML_LANG = 'en' as const;

// ---------------------------------------------------------------------------
// Keyword Arrays (grouped by search intent)
// ---------------------------------------------------------------------------

export const KEYWORDS_BRAND = [
  'CreditBuddy',
  'creditbuddy',
  'CreditBuddy app',
  'creditbuddy.org.in',
  'CreditBuddy India',
  'CreditBuddy Partners Private Limited',
  'CreditBuddy Partners',
  'who founded CreditBuddy',
  'CreditBuddy founders',
  'CreditBuddy CEO',
  'Debasish Mallick CreditBuddy',
  'CreditBuddy Sambalpur',
  'CreditBuddy Odisha',
  'CreditBuddy CIN',
  'CreditBuddy GSTIN',
  'CreditBuddy company info',
  'CreditBuddy mission',
  'CreditBuddy values',
  'CreditBuddy team',
  'CreditBuddy review',
  'CreditBuddy safe',
  'CreditBuddy legitimate',
  'CreditBuddy trustworthy',
  'about CreditBuddy',
  'CreditBuddy founding story',
] as const;

export const KEYWORDS_PRODUCT = [
  'student credit India',
  'student micro credit',
  'student micro loan India',
  'campus micro loans',
  'instant student credit',
  'instant student loan India',
  'micro loan for college students',
  'micro loan app for college students India',
  'student credit line India',
  'no collateral student loan India',
  'student loan without CIBIL score',
  'zero hidden charges student loan',
  'earn and repay loan',
  'earn and repay student loan',
  'student gig marketplace',
  'campus gig economy',
  'campus gig marketplace',
  'campus micro gig economy',
  'student side hustle India',
  'student part-time jobs India',
  'earn money college campus',
  'student reward coins',
  'campus ambassador program India',
  'college ambassador earn rewards',
  'student ambassador program',
  'campus representative program',
  'student financial ecosystem India',
  'student-first financial platform',
  'student financial wellness platform',
  'safe student lending platform',
  'transparent student credit',
  'emergency student loan India',
  'small loan for students India',
  'instant cash for students',
  'borrow money as student India',
  'student expense management',
] as const;

export const KEYWORDS_FINTECH_INDUSTRY = [
  'student fintech India',
  'fintech for students India',
  'fintech startup India 2026',
  'student lending platform India',
  'digital lending students India',
  'NBFC student loans',
  'RBI regulated student credit',
  'education fintech India',
  'campus fintech India',
  'college fintech platform',
  'teen banking India',
  'teen finance India',
  'student banking India',
  'student finance app India',
  'student money app India',
  'student budgeting app India',
  'student investment platform India',
  'mutual funds for students India',
  'SIP for beginners India',
  'personal finance college students India',
  'financial planning students India',
] as const;

export const KEYWORDS_CREDIT_LITERACY = [
  'CIBIL score students',
  'CIBIL score building',
  'CIBIL score for college students',
  'build CIBIL score from scratch',
  'best way to build CIBIL score from scratch',
  'how to build credit score as a student in India',
  'credit score for students India',
  'first credit score India',
  'student credit history India',
  'credit building for beginners India',
  'credit score building steps',
  'credit card alternative students India',
  'first credit card alternative students',
  'financial literacy college students India',
  'financial literacy course for Indian students',
  'student financial education India',
  'money management students India',
  'student budgeting tips India',
  'student money tips',
  'college student money management',
  'student investment tips India',
  'tax filing students India',
  'ITR for students India',
  'ITR for college students',
  'student freelancing tax India',
] as const;

export const KEYWORDS_DEMOGRAPHIC = [
  'Indian college students',
  'college students India',
  'university students India',
  'undergraduate students India',
  'postgraduate students India',
  'student money India',
  'student finance India',
  'student loans India',
  'campus students India',
  'tier 2 college students India',
  'tier 3 college students India',
  'Odisha students',
  'Sambalpur students',
  'small town college students India',
  'first-generation student borrowers India',
] as const;

export const KEYWORDS_GEOGRAPHIC = [
  'Sambalpur fintech startup',
  'Odisha fintech startup',
  'Odisha startup CreditBuddy',
  'built by students for students',
  'student-built fintech India',
  'India student fintech',
  'India campus economy',
  'India student financial inclusion',
  'financial inclusion India students',
  'student financial inclusion Odisha',
] as const;

export const KEYWORDS_LONG_TAIL = [
  'how does student credit work India',
  'how to get instant loan as student India',
  'best student loan app India 2026',
  'how to earn money in college India',
  'campus gig jobs for college students India',
  'how to repay student loan through gigs',
  'how to get first credit card as student India',
  'student ambassador program earn money India',
  'student-friendly fintech platforms India',
  'student micro credit without CIBIL India',
  'how does campus gig economy work India',
  'earn to repay loan India',
  'college students earning platform India',
  'student digital wallet India',
  'student UPI loan India',
  'college fee loan India',
  'laptop loan for students India',
  'hostel expense loan students India',
  'books stationery loan college India',
  'how to manage money in college India',
  'financial literacy app for college students',
  'learn invest earn students India',
  'campus credit score building India',
  'zero credit history loan India students',
  'student loan without guarantor India',
] as const;

/** All keywords combined — use for the root layout global keywords. */
export const ALL_KEYWORDS: string[] = [
  ...KEYWORDS_BRAND,
  ...KEYWORDS_PRODUCT,
  ...KEYWORDS_FINTECH_INDUSTRY,
  ...KEYWORDS_CREDIT_LITERACY,
  ...KEYWORDS_DEMOGRAPHIC,
  ...KEYWORDS_GEOGRAPHIC,
  ...KEYWORDS_LONG_TAIL,
];
