/**
 * @fileoverview Privacy Policy page for CreditBuddy Partners Pvt Ltd.
 *
 * Legal page covering data collection, usage, security, and contact
 * information for the Data Protection Officer.
 *
 * SEO priority: 0.3 — required legal page, low crawl priority.
 * Robots: indexed (required for Google compliance signals).
 *
 * @see {@link file:///d:/Vibe%20projects/CredBud/app/sitemap.ts} — Sitemap entry
 */

import { SmoothScroll } from '@/components/landing/shared/SmoothScroll';
import { GrainOverlay } from '@/components/landing/shared/GrainOverlay';
import { FooterShutter } from '@/components/landing/Footer/FooterShutter';
import { buildMetadata, generateWebPage } from '@/lib/seo';

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata = buildMetadata({
  title: 'Privacy Policy — Data Protection & Privacy Guidelines',
  description:
    'Privacy policy of CreditBuddy Partners Private Limited. Learn how we collect, use, ' +
    'and protect your personal data. 256-bit encryption, no third-party data sales, ' +
    'and full GDPR/IT Act compliance.',
  path: '/privacy',
  noIndex: true,
  keywords: [
    'CreditBuddy privacy policy',
    'CreditBuddy data protection',
    'student data privacy India',
    'CreditBuddy Partners Private Limited privacy',
    'data security student lending',
    'student loan data protection',
    'fintech privacy policy India',
    'CreditBuddy GDPR compliance',
    'student personal data security',
    'data deletion request CreditBuddy',
  ],
});

// ─── Structured Data ─────────────────────────────────────────────────────────

const webPageJsonLd = JSON.stringify(
  generateWebPage({
    title: 'Privacy Policy — CreditBuddy',
    description: 'Privacy policy and data protection guidelines for CreditBuddy Partners Private Limited.',
    path: '/privacy',
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  }),
);

// ─── Page Component ──────────────────────────────────────────────────────────

/**
 * Privacy Policy page component.
 *
 * Renders the privacy policy document with legal entity details
 * and section-by-section content.
 */
export default function PrivacyPage() {
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
            <span className="font-jetbrains text-xs font-normal brutal-pill bg-accent-purple text-white px-4 py-1.5 inline-block">
              // Data Protection
            </span>
            <h1 className="font-bricolage text-4xl md:text-6xl font-extrabold tracking-tight">
              Privacy Policy
            </h1>
            <p className="font-jetbrains text-xs text-ink-muted">
              Last Updated: August 2026 | CREDITBUDDY PARTNERS PRIVATE LIMITED
            </p>
          </div>

          {/* Legal Entity Card */}
          <div className="bg-accent-purple/10 brutal-card p-6 space-y-2 font-jetbrains text-xs">
            <p className="font-bold text-sm text-ink uppercase">CREDITBUDDY PARTNERS PRIVATE LIMITED</p>
            <p><span className="font-bold">CIN:</span> U62090OD2026PTC053104 | <span className="font-bold">GSTIN:</span> 21AANCC6754D1ZS</p>
            <p><span className="font-bold">Registered Office:</span> PLOT NO. 1380/6628 Near Gram Devi Mandir, Matru Vihar, Shanti Nagar, Budharaja, Sambalpur, Odisha, 768004, India</p>
            <p><span className="font-bold">Contact Email:</span> info@creditbuddy.org.in | creditbuddyofficial@gmail.com</p>
          </div>

          {/* Content Document */}
          <div className="bg-white brutal-card p-8 md:p-12 space-y-8 font-jakarta text-sm md:text-base leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="font-bricolage font-extrabold text-xl text-ink">// 1. Information We Collect</h2>
              <p className="text-ink-muted">
                We collect personal identification data, academic verification records, contact details, and financial transactions necessary to verify student identity, process credit requests, and enable gig payouts securely.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-bricolage font-extrabold text-xl text-ink">// 2. How We Use Your Data</h2>
              <p className="text-ink-muted">
                Your data is used strictly for identity verification, credit underwriting with regulated NBFC partners, processing instant campus reward cashbacks, and improving our platform security.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-bricolage font-extrabold text-xl text-ink">// 3. Data Security &amp; Encryption</h2>
              <p className="text-ink-muted">
                We adhere to strict data security standards including end-to-end 256-bit encryption. We never sell your personal information or data to third-party advertisers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-bricolage font-extrabold text-xl text-ink">// 4. Contact Data Officer</h2>
              <p className="text-ink-muted">
                If you have questions regarding data privacy or wish to request data deletion, contact our privacy compliance team at:
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
