/**
 * @fileoverview Terms & Conditions page for CreditBuddy Partners Pvt Ltd.
 *
 * Legal page covering acceptance of terms, eligibility, financial services,
 * user responsibilities, and grievance redressal.
 *
 * SEO priority: 0.3 — required legal page, low crawl priority.
 *
 * @see {@link file:///d:/Vibe%20projects/CredBud/app/sitemap.ts} — Sitemap entry
 */

import { SmoothScroll } from '@/components/landing/shared/SmoothScroll';
import { GrainOverlay } from '@/components/landing/shared/GrainOverlay';
import { FooterShutter } from '@/components/landing/Footer/FooterShutter';
import { buildMetadata, generateWebPage } from '@/lib/seo';

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata = buildMetadata({
  title: 'Terms & Conditions — User Agreement & Service Terms',
  description:
    'Terms of service and user agreements for CreditBuddy Partners Private Limited. ' +
    'Covers eligibility, student verification, lending partner compliance with RBI guidelines, ' +
    'user responsibilities, repayment terms, and grievance redressal.',
  path: '/terms',
  noIndex: true,
  keywords: [
    'CreditBuddy terms and conditions',
    'CreditBuddy user agreement',
    'student loan terms India',
    'CreditBuddy service terms',
    'CreditBuddy Partners Private Limited terms',
    'student lending terms India',
    'micro loan terms and conditions',
    'CreditBuddy eligibility criteria',
    'student verification requirements',
    'RBI compliance student lending',
  ],
});

// ─── Structured Data ─────────────────────────────────────────────────────────

const webPageJsonLd = JSON.stringify(
  generateWebPage({
    title: 'Terms & Conditions — CreditBuddy',
    description: 'Terms of service and user agreements for CreditBuddy Partners Private Limited.',
    path: '/terms',
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Terms & Conditions', href: '/terms' },
    ],
  }),
);

// ─── Page Component ──────────────────────────────────────────────────────────

/**
 * Terms & Conditions page component.
 *
 * Renders the legal agreement with section-by-section content
 * and company registration details.
 */
export default function TermsPage() {
  return (
    <SmoothScroll>
      <GrainOverlay />

      {/* Page-level structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webPageJsonLd }}
      />

      <main className="relative w-full block bg-[#FAF7F2] text-ink pt-28 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="space-y-4 border-b-[1.6px] border-ink pb-8">
            <span className="font-jetbrains text-xs font-normal brutal-pill bg-accent-lime px-4 py-1.5 inline-block">
              // Legal Agreement
            </span>
            <h1 className="font-bricolage text-4xl md:text-6xl font-extrabold tracking-tight">
              Terms &amp; Conditions
            </h1>
            <p className="font-jetbrains text-xs text-ink-muted">
              Last Updated: August 2026 | CREDITBUDDY PARTNERS PRIVATE LIMITED
            </p>
          </div>

          {/* Legal Entity Card */}
          <div className="bg-accent-gold/15 brutal-card p-6 space-y-2 font-jetbrains text-xs">
            <p className="font-bold text-sm text-ink uppercase">CREDITBUDDY PARTNERS PRIVATE LIMITED</p>
            <p><span className="font-bold">CIN:</span> U62090OD2026PTC053104 | <span className="font-bold">GSTIN:</span> 21AANCC6754D1ZS</p>
            <p><span className="font-bold">Registered Office:</span> PLOT NO. 1380/6628 Near Gram Devi Mandir, Matru Vihar, Shanti Nagar, Budharaja, Sambalpur, Odisha, 768004, India</p>
            <p><span className="font-bold">Contact Email:</span> info@creditbuddy.org.in | creditbuddyofficial@gmail.com</p>
          </div>

          {/* Content Document */}
          <div className="bg-white brutal-card p-8 md:p-12 space-y-8 font-jakarta text-sm md:text-base leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="font-bricolage font-extrabold text-xl text-ink">// 1. Acceptance of Terms</h2>
              <p className="text-ink-muted">
                By accessing or using the CreditBuddy platform, mobile application, or services provided by CreditBuddy Partners Private Limited (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these Terms &amp; Conditions. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-bricolage font-extrabold text-xl text-ink">// 2. Eligibility &amp; Student Verification</h2>
              <p className="text-ink-muted">
                Services on CreditBuddy are intended primarily for enrolled university and college students in India. You represent and warrant that all identification documents, student IDs, and financial information submitted during onboarding are truthful, accurate, and current.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-bricolage font-extrabold text-xl text-ink">// 3. Financial Services &amp; Lending Partners</h2>
              <p className="text-ink-muted">
                CreditBuddy acts as a technology facilitator and credit enablement platform. All credit lines, micro-loans, and repayment terms are disbursed and serviced in compliance with Reserve Bank of India (RBI) guidelines in partnership with regulated NBFC partners.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-bricolage font-extrabold text-xl text-ink">// 4. User Responsibilities &amp; Repayment</h2>
              <p className="text-ink-muted">
                Borrowers are responsible for timely repayments as outlined in their credit agreements. Failure to repay on time may result in late fees, impact on credit scores, and reporting to credit bureaus.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-bricolage font-extrabold text-xl text-ink">// 5. Contact &amp; Grievance Redressal</h2>
              <p className="text-ink-muted">
                For any questions or legal inquiries regarding these terms, please reach out to our team at:
              </p>
              <div className="font-jetbrains text-xs space-y-1 bg-bg-primary p-4 rounded-xl border border-ink/20">
                <p>📍 Sambalpur, Odisha, India - 768004</p>
                <p>✉️ info@creditbuddy.org.in</p>
                <p>📧 creditbuddyofficial@gmail.com</p>
              </div>
            </section>

          </div>

        </div>
      </main>

      {/* Footer */}
      <div className="relative w-full h-[100vh]">
        <div className="absolute bottom-0 w-full z-20">
          <FooterShutter />
        </div>
      </div>
    </SmoothScroll>
  );
}
