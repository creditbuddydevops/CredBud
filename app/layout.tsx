/**
 * @fileoverview Root layout for CreditBuddy.
 *
 * This is the top-level layout that wraps every page in the application.
 * It is responsible for:
 *
 *   1. **Global Metadata** — Exports the base `Metadata` object built by
 *      the centralised `buildMetadata()` factory.  Per-page metadata is
 *      merged on top of this via Next.js's metadata merging behaviour.
 *
 *   2. **Global Structured Data** — Injects JSON-LD `Organization` and
 *      `WebSite` schemas into every page's `<head>` via `<script>` tags.
 *      These power Google's Knowledge Panel and Sitelinks Searchbox.
 *
 *   3. **Font Loading** — Preconnects to Google Fonts and loads:
 *        - Bricolage Grotesque (display / headlines)
 *        - Plus Jakarta Sans (body)
 *        - JetBrains Mono (code / labels)
 *
 *   4. **Global Chrome** — Renders the persistent `<NavSidebar />` above
 *      every page.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates
 */

import type { Metadata, Viewport } from 'next';
import './globals.css';
import { NavSidebar } from '@/components/landing/NavSidebar';
import { CustomCursor } from '@/components/landing/shared/CustomCursor';
import {
  buildMetadata,
  generateOrganization,
  generateWebSite,
  generateFinancialProduct,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  COLOR_BG_PRIMARY,
  COLOR_ACCENT_PURPLE,
} from '@/lib/seo';

// ─── Viewport Configuration ──────────────────────────────────────────────────

/**
 * Viewport export — controls the `<meta name="viewport">` and
 * `<meta name="theme-color">` tags.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: COLOR_BG_PRIMARY },
    { media: '(prefers-color-scheme: dark)', color: '#14100F' },
  ],
  colorScheme: 'light',
};

// ─── Global Metadata ─────────────────────────────────────────────────────────

/**
 * Base metadata applied to every page.
 *
 * Individual pages override or extend this by exporting their own
 * `metadata` or `generateMetadata()` using the `buildMetadata()` helper.
 */
export const metadata: Metadata = buildMetadata({
  title: `${SITE_NAME} | India's Student-First Financial Ecosystem`,
  description: SITE_DESCRIPTION,
  path: '/',
  keywords: [
    // ── Primary Keywords ──────────────────────────────────────────
    'CreditBuddy',
    'student credit India',
    'student loans India',
    'college micro loans',
    'instant student credit',
    'student micro credit',
    'campus micro loans',
    'student financial ecosystem',

    // ── Product Keywords ──────────────────────────────────────────
    'campus gigs',
    'campus gig economy',
    'student gig marketplace',
    'earn and repay loans',
    'student side hustle',
    'student part-time jobs',
    'campus ambassador program',
    'campus ambassador India',
    'college ambassador program',

    // ── Financial Literacy ────────────────────────────────────────
    'financial literacy students',
    'financial literacy college',
    'student financial education',
    'money management students',
    'student budgeting app',
    'personal finance college students',
    'student money tips',

    // ── Credit Score Keywords ─────────────────────────────────────
    'CIBIL score students',
    'build credit score college',
    'credit score for students',
    'first credit score India',
    'student credit history',
    'credit building for beginners',
    'CIBIL score building',

    // ── Fintech / Industry ────────────────────────────────────────
    'student fintech India',
    'fintech for students',
    'NBFC student loans',
    'RBI regulated student credit',
    'digital lending students',
    'student lending platform',
    'education fintech',

    // ── Geographic / Demographic ──────────────────────────────────
    'Indian college students',
    'student finance India',
    'college students India',
    'university students credit',
    'student money India',

    // ── Use-Case Keywords ─────────────────────────────────────────
    'borrow money as student',
    'emergency student loan',
    'small loan for students',
    'instant cash for students',
    'no collateral student loan',
    'student expense management',
    'campus reward cashback',
    'student referral program',
    'student investment tips',
    'mutual funds for students',
    'SIP for beginners',
    'tax filing students India',
    'ITR for students',

    // ── Brand / Trust Signals ─────────────────────────────────────
    'CreditBuddy Partners Private Limited',
    'CreditBuddy app',
    'creditbuddy.org.in',
    'student first financial platform',
    'safe student lending',
    'transparent student credit',
    'zero hidden charges student loan',

    // ── Long-Tail / Conversational ────────────────────────────────
    'how to build credit score as a student in India',
    'best student loan app India 2026',
    'how to earn money in college India',
    'campus gig jobs for college students',
    'financial literacy course for Indian students',
    'how to get first credit card as student',
    'micro loan app for college students India',
    'student ambassador program earn money',
    'best way to build CIBIL score from scratch',
    'student friendly fintech platforms India',
  ],
});

// ─── Structured Data (JSON-LD) ───────────────────────────────────────────────

/**
 * Pre-serialised JSON-LD payloads injected into every page.
 * These are generated once at build time (or per request in dev).
 */
const organizationJsonLd = JSON.stringify(generateOrganization());
const webSiteJsonLd = JSON.stringify(generateWebSite());
const financialProductJsonLd = JSON.stringify(generateFinancialProduct());

// ─── Layout Component ────────────────────────────────────────────────────────

/**
 * Root layout — wraps all pages with global `<head>` content and navigation.
 *
 * @param props.children - The active page component rendered by Next.js.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-clip max-w-full">
      <head>
        {/* ── Font Preconnect ───────────────────────────────────── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />

        {/* ── DNS Prefetch for External Services ────────────────── */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* ── Structured Data: Organization ─────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
        />

        {/* ── Structured Data: WebSite ──────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: webSiteJsonLd }}
        />

        {/* ── Structured Data: FinancialProduct ─────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: financialProductJsonLd }}
        />
      </head>

      <body
        suppressHydrationWarning
        className="antialiased overflow-x-clip max-w-full selection:bg-accent-purple selection:text-white"
      >
        <NavSidebar />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
