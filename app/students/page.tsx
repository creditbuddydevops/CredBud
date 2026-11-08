/**
 * @fileoverview Students page for CreditBuddy.
 *
 * This page is the primary product page targeting student users.
 * It covers:
 *   1. Student-specific value proposition (StudentsHero)
 *   2. Borrowing features (StudentsBorrowSection)
 *   3. "What We Never Do" trust list (StudentsNeverList)
 *   4. Earning via campus gigs (StudentsEarnSection)
 *   5. Financial literacy coins (StudentsLearnCoinsSection)
 *   6. Trust metrics (StudentsTrustMetrics)
 *
 * SEO priority: 0.9 — core product/audience page.
 *
 * @see {@link file:///d:/Vibe%20projects/CredBud/app/sitemap.ts} — Sitemap entry
 */

import { SmoothScroll } from '@/components/landing/shared/SmoothScroll';
import { GrainOverlay } from '@/components/landing/shared/GrainOverlay';
import { StudentsHero } from '@/components/students/StudentsHero';
import { StudentsBorrowSection } from '@/components/students/StudentsBorrowSection';
import { StudentsNeverList } from '@/components/students/StudentsNeverList';
import { StudentsEarnSection } from '@/components/students/StudentsEarnSection';
import { StudentsLearnCoinsSection } from '@/components/students/StudentsLearnCoinsSection';
import { StudentsTrustMetrics } from '@/components/students/StudentsTrustMetrics';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { FooterShutter } from '@/components/landing/Footer/FooterShutter';
import { buildMetadata, generateWebPage, generateFinancialProduct } from '@/lib/seo';

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata = buildMetadata({
  title: 'Students — Micro-Credit, Campus Gigs & Financial Literacy for College Students',
  description:
    'CreditBuddy is built from scratch for Indian college students. Get instant micro-credit, ' +
    'earn through campus gigs, learn financial literacy in 5-minute modules, and build your ' +
    'CIBIL score before graduation. Zero hidden charges, no collateral required.',
  path: '/students',
  keywords: [
    'student credit CreditBuddy',
    'college student loans India',
    'micro loans for students',
    'instant student credit line',
    'no collateral student loan India',
    'student micro credit India',
    'campus gig jobs for students',
    'student side hustle India',
    'earn money college campus',
    'financial literacy for college students India',
    'student budgeting tips',
    'CIBIL score for college students',
    'build credit score student India',
    'student trust metrics',
    'safe student lending platform',
    'zero hidden charges student loan',
    'student financial wellness platform',
    'get started CreditBuddy students',
    'borrow repay earn learn students',
    'student-first fintech India',
    'college student money management',
    'first credit card alternative students',
    'student loan without CIBIL score',
    'campus micro job marketplace',
    'student reward coins',
    'financial education India students',
    'teen banking India',
    'student bank account alternative India',
    'student money management app',
    'college fee micro loan India',
    'hostel expense micro loan',
    'campus digital credit India',
    'zero collateral student credit India',
    'NBFC student micro loan India',
    'RBI compliant student loan India',
    'earn gigs repay loan India',
    'student-first lending India',
    'college micro credit India 2026',
    'financial wellness college India',
    'student loan without guarantor India',
    'no income proof student loan India',
  ],
});

// ─── Structured Data ─────────────────────────────────────────────────────────

const webPageJsonLd = JSON.stringify(
  generateWebPage({
    title: 'Students — CreditBuddy',
    description:
      'Micro-credit, campus gigs, and financial literacy designed exclusively for Indian college students.',
    path: '/students',
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Students', href: '/students' },
    ],
  }),
);

const financialProductJsonLd = JSON.stringify(generateFinancialProduct());

// ─── Page Component ──────────────────────────────────────────────────────────

/**
 * Students page component.
 *
 * The core audience-facing page targeting college students with
 * product features, trust signals, and earning opportunities.
 */
export default function StudentsPage() {
  return (
    <SmoothScroll>
      <GrainOverlay />

      {/* Page-level structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webPageJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: financialProductJsonLd }}
      />

      <main className="relative w-full block bg-[#FAF7F2]">
        <StudentsHero />
        <StudentsBorrowSection />
        <StudentsNeverList />
        <StudentsEarnSection />
        <StudentsLearnCoinsSection />
        <StudentsTrustMetrics />

        {/* Shutter setup for FinalCTA and Footer */}
        <div className="relative w-full h-[200vh]">
          <div className="sticky top-0 h-screen w-full">
            <FinalCTA />
          </div>
          <div className="absolute bottom-0 w-full z-20">
            <FooterShutter />
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
