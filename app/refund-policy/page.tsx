/**
 * @fileoverview Refund Policy page for CreditBuddy Partners Pvt Ltd.
 *
 * Legal page covering fee refunds, loan disbursal repayments,
 * and support / claims procedures.
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
  title: 'Refund Policy — Cancellation & Refund Terms',
  description:
    'Refund policy and cancellation terms for CreditBuddy Partners Private Limited. ' +
    'Covers fee refunds for system failures, excess repayment credits, and the process ' +
    'to initiate refund claims with transaction reference IDs.',
  path: '/refund-policy',
  noIndex: true,
  keywords: [
    'CreditBuddy refund policy',
    'CreditBuddy cancellation policy',
    'student loan refund India',
    'CreditBuddy fee refund',
    'excess repayment refund',
    'CreditBuddy Partners Private Limited refund',
    'micro loan refund policy',
    'student lending refund process',
    'processing fee refund CreditBuddy',
    'loan overpayment refund India',
  ],
});

// ─── Structured Data ─────────────────────────────────────────────────────────

const webPageJsonLd = JSON.stringify(
  generateWebPage({
    title: 'Refund Policy — CreditBuddy',
    description: 'Refund policy and cancellation terms for CreditBuddy Partners Private Limited.',
    path: '/refund-policy',
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Refund Policy', href: '/refund-policy' },
    ],
  }),
);

// ─── Page Component ──────────────────────────────────────────────────────────

/**
 * Refund Policy page component.
 *
 * Renders the refund and cancellation policy document with
 * support contact details.
 */
export default function RefundPolicyPage() {
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
            <span className="font-jetbrains text-xs font-normal brutal-pill bg-accent-gold px-4 py-1.5 inline-block">
              // Cancellation &amp; Refunds
            </span>
            <h1 className="font-bricolage text-4xl md:text-6xl font-extrabold tracking-tight">
              Refund Policy
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
              <h2 className="font-bricolage font-extrabold text-xl text-ink">// 1. Fee Refunds</h2>
              <p className="text-ink-muted">
                Processing or facilitation fees, if applicable, are fully refundable in case of system failures or double charges. Refund requests must be logged within 7 days of transaction.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-bricolage font-extrabold text-xl text-ink">// 2. Loan Disbursal &amp; Repayments</h2>
              <p className="text-ink-muted">
                In case of accidental excess loan repayment, the overpaid amount will be credited back to your linked primary bank account within 3 to 5 business days after verification.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-bricolage font-extrabold text-xl text-ink">// 3. Support &amp; Claims</h2>
              <p className="text-ink-muted">
                To initiate a refund claim or query, send your transaction reference ID to:
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
