/**
 * @fileoverview Contact page for CreditBuddy.
 *
 * Contact form and company details for student support, campus
 * partnerships, investor inquiries, and media requests.
 *
 * Sections:
 *   1. ContactHeroForm — Hero with integrated contact form
 *   2. ContactCompanyDetails — Registered office, CIN, GSTIN, emails
 *
 * SEO priority: 0.7 — conversion / contact page.
 *
 * @see {@link file:///d:/Vibe%20projects/CredBud/app/sitemap.ts} — Sitemap entry
 */

import { SmoothScroll } from '@/components/landing/shared/SmoothScroll';
import { GrainOverlay } from '@/components/landing/shared/GrainOverlay';
import { ContactHeroForm } from '@/components/contact/ContactHeroForm';
import { ContactCompanyDetails } from '@/components/contact/ContactCompanyDetails';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { FooterShutter } from '@/components/landing/Footer/FooterShutter';
import { buildMetadata, generateWebPage, generateContactPage, generateLocalBusiness } from '@/lib/seo';

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata = buildMetadata({
  title: 'Contact Us — Student Support, Partnerships & Inquiries',
  description:
    'Get in touch with the CreditBuddy team. Reach out for student support, campus partnership ' +
    'proposals, investor inquiries, media requests, or grievance redressal. We respond within 24 hours.',
  path: '/contact',
  keywords: [
    'contact CreditBuddy',
    'CreditBuddy support',
    'CreditBuddy customer service',
    'student support CreditBuddy',
    'CreditBuddy email',
    'CreditBuddy phone number',
    'CreditBuddy office address',
    'CreditBuddy Sambalpur office',
    'campus partnership CreditBuddy',
    'investor inquiries CreditBuddy',
    'CreditBuddy grievance redressal',
    'contact student lending company India',
    'CreditBuddy media contact',
    'CreditBuddy Partners Private Limited contact',
    'student fintech support India',
    'report issue CreditBuddy',
    'CreditBuddy help center',
    'CreditBuddy contact form',
    'reach CreditBuddy team',
    'CreditBuddy feedback',
  ],
});

// ─── Structured Data ─────────────────────────────────────────────────────────

const webPageJsonLd = JSON.stringify(
  generateWebPage({
    title: 'Contact Us — CreditBuddy',
    description:
      'Get in touch with CreditBuddy for support, partnerships, or inquiries.',
    path: '/contact',
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Contact', href: '/contact' },
    ],
  }),
);

const contactPageJsonLd = JSON.stringify(generateContactPage());
const localBusinessJsonLd = JSON.stringify(generateLocalBusiness());

// ─── Page Component ──────────────────────────────────────────────────────────

/**
 * Contact page component.
 *
 * Renders the contact form hero and company registration details.
 */
export default function ContactPage() {
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
        dangerouslySetInnerHTML={{ __html: contactPageJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: localBusinessJsonLd }}
      />

      <main className="relative w-full block bg-[#FAF7F2]">
        <ContactHeroForm />
        <ContactCompanyDetails />

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
