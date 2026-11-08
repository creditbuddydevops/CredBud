/**
 * @fileoverview About page for CreditBuddy.
 *
 * Company story, mission, values, team, advisors, and differentiators.
 *
 * Sections:
 *   1. AboutHero — Mission headline
 *   2. AboutStoryMission — Founding story & mission statement
 *   3. AboutValuesGrid — Core values cards
 *   4. AboutTeamSection — Leadership team bios
 *   5. AboutAdvisorsSection — Advisory board
 *   6. AboutWhyDifferent — Differentiation points
 *
 * SEO priority: 0.8 — brand authority page.
 *
 * @see {@link file:///d:/Vibe%20projects/CredBud/app/sitemap.ts} — Sitemap entry
 */

import { SmoothScroll } from '@/components/landing/shared/SmoothScroll';
import { GrainOverlay } from '@/components/landing/shared/GrainOverlay';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutStoryMission } from '@/components/about/AboutStoryMission';
import { AboutValuesGrid } from '@/components/about/AboutValuesGrid';
import { AboutTeamSection } from '@/components/about/AboutTeamSection';
import { AboutAdvisorsSection } from '@/components/about/AboutAdvisorsSection';
import { AboutWhyDifferent } from '@/components/about/AboutWhyDifferent';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { FooterShutter } from '@/components/landing/Footer/FooterShutter';
import {
  buildMetadata,
  generateWebPage,
  generateAboutPage,
  generateOrganization,
  generateFounderPerson,
  generateLocalBusiness,
} from '@/lib/seo';

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata = buildMetadata({
  title: 'About CreditBuddy — Student Fintech Founded by Students | Debasish Mallick',
  description:
    'CreditBuddy is India\'s student-first fintech built by students. Founded by Debasish Mallick in Sambalpur, Odisha. Learn our mission, values, leadership team, and why we exist.',
  path: '/about',
  keywords: [
    'about CreditBuddy',
    'CreditBuddy founding story',
    'CreditBuddy founders',
    'who founded CreditBuddy',
    'Debasish Mallick CreditBuddy',
    'Debasish Mallick founder',
    'CreditBuddy CEO',
    'CreditBuddy mission',
    'CreditBuddy team',
    'CreditBuddy leadership',
    'CreditBuddy advisors',
    'CreditBuddy values',
    'student fintech company India',
    'CreditBuddy Partners Private Limited',
    'CreditBuddy CIN GSTIN',
    'student-first financial company',
    'fintech startup India 2026',
    'Sambalpur fintech startup',
    'Sambalpur startup 2026',
    'Odisha startup CreditBuddy',
    'Odisha fintech startup',
    'built by students for students',
    'student financial inclusion India',
    'student lending startup India',
    'why CreditBuddy is different',
    'student-built fintech platform India',
    'student fintech founder India',
    'young fintech entrepreneur India',
    'student fintech India founders',
    'campus fintech India',
    'U62090OD2026PTC053104',
    '21AANCC6754D1ZS',
    'CreditBuddy company info',
    'student first financial platform India',
    'financial inclusion college students India',
    'Sambalpur Odisha fintech company',
    'student-founded fintech startup India',
    'tier 2 city fintech startup India',
    'emerging fintech India 2026',
    'best student fintech India',
    'student banking alternative India',
    'micro credit startup India',
    'campus economy startup India',
  ],
});

// ─── Structured Data ─────────────────────────────────────────────────────────

const webPageJsonLd = JSON.stringify(
  generateWebPage({
    title: 'About CreditBuddy — Student Fintech Founded by Students | Debasish Mallick',
    description:
      'Learn about CreditBuddy mission, founding story, values, leadership team, and what makes us different.',
    path: '/about',
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
    ],
  }),
);

const aboutPageJsonLd = JSON.stringify(generateAboutPage());
const organizationJsonLd = JSON.stringify(generateOrganization());
const founderPersonJsonLd = JSON.stringify(generateFounderPerson());
const localBusinessJsonLd = JSON.stringify(generateLocalBusiness());

// ─── Page Component ──────────────────────────────────────────────────────────

/**
 * About page component.
 *
 * Brand authority page covering company story, mission, values,
 * team members, advisors, and competitive differentiators.
 */
export default function AboutPage() {
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
        dangerouslySetInnerHTML={{ __html: aboutPageJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: founderPersonJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: localBusinessJsonLd }}
      />

      <main className="relative w-full block bg-[#FBF7EF]">
        <AboutHero />
        <AboutStoryMission />
        <AboutValuesGrid />
        <AboutTeamSection />
        <AboutAdvisorsSection />
        <AboutWhyDifferent />

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
