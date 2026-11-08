/**
 * @fileoverview Centralized metadata factory for CreditBuddy.
 *
 * Provides `buildMetadata()` — a single, type-safe function that every
 * page uses to generate its `Metadata` export.  It enforces:
 *
 *   - Canonical URL generation
 *   - Consistent `og:` and `twitter:` tags
 *   - Title template (`Page Title | CreditBuddy`)
 *   - Default fallback description & OG image
 *   - Proper `robots` directives per page
 *
 * Usage:
 * ```ts
 * import { buildMetadata } from '@/lib/seo';
 *
 * export const metadata = buildMetadata({
 *   title: 'About Us',
 *   description: 'Learn about CreditBuddy…',
 *   path: '/about',
 * });
 * ```
 */

import type { Metadata } from 'next';
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_LOCALE,
  COLOR_BG_PRIMARY,
  COLOR_ACCENT_PURPLE,
} from './constants';

// ─── Types ────────────────────────────────────────────────────────────────────

/** Options accepted by `buildMetadata`. */
export interface MetadataOptions {
  /** Page title (will be suffixed with ` | CreditBuddy`). */
  title: string;
  /** Meta description for the page. */
  description: string;
  /** URL path relative to the site root, e.g. `/about`. Use `/` for home. */
  path: string;
  /**
   * Optional OG image path (relative to `public/`).
   * Falls back to `DEFAULT_OG_IMAGE`.
   */
  ogImage?: string;
  /** Override the `og:type` (defaults to `website`). */
  ogType?: 'website' | 'article';
  /** If `true`, tells search engines not to index this page. */
  noIndex?: boolean;
  /**
   * SEO keywords relevant to this page.
   * Rendered as `<meta name="keywords">` for supplementary signal.
   */
  keywords?: string[];
  /** Published date (ISO 8601) for article-type pages. */
  publishedTime?: string;
  /** Modified date (ISO 8601) for article-type pages. */
  modifiedTime?: string;
  /** Article author name. */
  author?: string;
  /** Article section / category. */
  section?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Build an absolute URL from a relative path.
 * @param path - URL path starting with `/`.
 */
const absoluteUrl = (path: string): string =>
  `${SITE_URL}${path === '/' ? '' : path}`;

// ─── Builder ──────────────────────────────────────────────────────────────────

/**
 * Build a fully-populated Next.js `Metadata` object for a given page.
 *
 * @param opts - Page-level metadata options.
 * @returns A `Metadata` object ready to be exported from a page/layout.
 *
 * @example
 * ```ts
 * export const metadata = buildMetadata({
 *   title: 'How It Works',
 *   description: 'Discover how CreditBuddy helps Indian students…',
 *   path: '/how-it-works',
 *   keywords: ['student credit', 'micro loans', 'campus gigs'],
 * });
 * ```
 */
export function buildMetadata(opts: MetadataOptions): Metadata {
  const canonicalUrl = absoluteUrl(opts.path);
  const ogImageUrl = absoluteUrl(opts.ogImage ?? DEFAULT_OG_IMAGE);
  const fullTitle =
    opts.path === '/'
      ? `${SITE_NAME} | ${SITE_TAGLINE}`
      : `${opts.title} | ${SITE_NAME}`;

  const metadata: Metadata = {
    // ── Core ────────────────────────────────────────────────────────
    title: fullTitle,
    description: opts.description,
    applicationName: SITE_NAME,
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',

    // ── Keywords ────────────────────────────────────────────────────
    keywords: opts.keywords ?? [
      'CreditBuddy',
      'student credit India',
      'college micro loans',
      'campus gigs',
      'financial literacy students',
      'CIBIL score students',
      'student financial ecosystem',
      'campus ambassador program',
      'earn and repay',
      'student fintech India',
    ],

    // ── Authors ─────────────────────────────────────────────────────
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,

    // ── Canonical & Alternates ──────────────────────────────────────
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },

    // ── Robots ──────────────────────────────────────────────────────
    robots: opts.noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large' as const,
            'max-snippet': -1,
          },
        },

    // ── Open Graph ──────────────────────────────────────────────────
    openGraph: {
      type: (opts.ogType ?? 'website') as 'website',
      locale: DEFAULT_LOCALE,
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: fullTitle,
      description: opts.description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${opts.title}`,
          type: 'image/png',
        },
      ],
      ...(opts.publishedTime && {
        publishedTime: opts.publishedTime,
      }),
      ...(opts.modifiedTime && {
        modifiedTime: opts.modifiedTime,
      }),
      ...(opts.author && {
        authors: [opts.author],
      }),
      ...(opts.section && {
        section: opts.section,
      }),
    },

    // ── Twitter Card ────────────────────────────────────────────────
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: opts.description,
      images: [ogImageUrl],
      creator: '@creditbuddy',
      site: '@creditbuddy',
    },

    // ── Icons ───────────────────────────────────────────────────────
    icons: {
      icon: [
        { url: '/images/favicon-square.png', sizes: '32x32',  type: 'image/png' },
        { url: '/images/favicon-square.png', sizes: '16x16',  type: 'image/png' },
        { url: '/images/favicon-square.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: [
        { url: '/images/favicon-square.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/images/favicon-square.png',
    },

    // ── Manifest ────────────────────────────────────────────────────
    manifest: '/manifest.json',

    // ── Theme ───────────────────────────────────────────────────────
    other: {
      'theme-color': COLOR_BG_PRIMARY,
      'msapplication-TileColor': COLOR_ACCENT_PURPLE,
      'msapplication-config': 'none',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': SITE_NAME,
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
    },

    // ── Verification (placeholders — fill when accounts are set up) ─
    // verification: {
    //   google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE',
    //   yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
    // },

    // ── Category ────────────────────────────────────────────────────
    category: 'Finance',

    // ── Classification ──────────────────────────────────────────────
    classification: 'Finance, Education, Student Services',
  };

  return metadata;
}

// ─── Re-exports ───────────────────────────────────────────────────────────────

export { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_LOCALE };
