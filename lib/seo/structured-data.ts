/**
 * @fileoverview JSON-LD structured-data generators for CreditBuddy.
 *
 * Every public function returns a plain object that can be serialised with
 * `JSON.stringify` and rendered inside a `<script type="application/ld+json">`
 * tag.  The helpers follow the Schema.org vocabulary and Google Rich Results
 * requirements:
 *
 *   - Organization   → Knowledge Panel, company info
 *   - WebSite        → Sitelinks Searchbox (future)
 *   - WebPage        → Breadcrumbs, page-level metadata
 *   - FAQPage        → FAQ rich snippets
 *   - BlogPosting    → Article rich results
 *   - BreadcrumbList → Breadcrumb trail in SERPs
 *   - FinancialProduct → Product structured data for fintech context
 *   - HowTo          → Step-by-step rich results
 *   - Service        → Service-level details
 *
 * Usage (in a Server Component):
 * ```tsx
 * import { generateOrganization } from '@/lib/seo/structured-data';
 *
 * export default function Layout({ children }) {
 *   return (
 *     <>
 *       <script
 *         type="application/ld+json"
 *         dangerouslySetInnerHTML={{
 *           __html: JSON.stringify(generateOrganization()),
 *         }}
 *       />
 *       {children}
 *     </>
 *   );
 * }
 * ```
 */

import {
  SITE_URL,
  SITE_NAME,
  LEGAL_ENTITY_NAME,
  SITE_DESCRIPTION,
  COMPANY_ADDRESS,
  CONTACT_EMAILS,
  SOCIAL_LINKS,
  DEFAULT_OG_IMAGE,
} from './constants';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Build an absolute URL from a relative path. */
const abs = (path: string): string =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

// ─── Organization ─────────────────────────────────────────────────────────────

/**
 * Generate a Schema.org `Organization` object.
 *
 * Surfaces in Google's Knowledge Panel and enriches brand signals.
 * Includes:
 *   - Legal name, founding date, founders
 *   - Postal address (Sambalpur registered office)
 *   - Contact point (customer service e-mail)
 *   - Social `sameAs` profiles
 *   - Logo reference
 */
export function generateOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_ENTITY_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: abs('/images/creditbuddy-logo.png'),
      width: 512,
      height: 512,
    },
    image: abs(DEFAULT_OG_IMAGE),
    description: SITE_DESCRIPTION,
    foundingDate: '2026',
    address: {
      '@type': 'PostalAddress',
      ...COMPANY_ADDRESS,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: CONTACT_EMAILS[0],
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    sameAs: Object.values(SOCIAL_LINKS),
    // Additional identifiers
    taxID: '21AANCC6754D1ZS',
    // Industry classification
    naics: '522390', // Other Activities Related to Credit Intermediation
    knowsAbout: [
      'Student Credit',
      'Financial Literacy',
      'Campus Gig Economy',
      'CIBIL Score Building',
      'Micro Loans for Students',
      'Campus Ambassador Programs',
      'Student Financial Wellness',
      'RBI Regulated NBFC Partnerships',
    ],
  };
}

// ─── WebSite ──────────────────────────────────────────────────────────────────

/**
 * Generate a Schema.org `WebSite` object.
 *
 * Enables the Sitelinks Searchbox in Google SERPs (when the site
 * qualifies) and declares the publisher relationship.
 */
export function generateWebSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ─── WebPage ──────────────────────────────────────────────────────────────────

/** Options bag for `generateWebPage`. */
export interface WebPageOptions {
  /** Page title (will be used as `name`). */
  title: string;
  /** Meta description. */
  description: string;
  /** Relative URL path (e.g. `/about`). */
  path: string;
  /** Optional breadcrumb items (label + href pairs). */
  breadcrumbs?: { name: string; href: string }[];
  /** ISO 8601 date the page was last modified. */
  dateModified?: string;
}

/**
 * Generate a Schema.org `WebPage` object.
 *
 * Provides page-level structured data with optional breadcrumb list.
 */
export function generateWebPage(opts: WebPageOptions) {
  const page: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${abs(opts.path)}/#webpage`,
    name: opts.title,
    description: opts.description,
    url: abs(opts.path),
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
  };

  if (opts.dateModified) {
    page.dateModified = opts.dateModified;
  }

  if (opts.breadcrumbs?.length) {
    page.breadcrumb = generateBreadcrumbList(opts.breadcrumbs);
  }

  return page;
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

/**
 * Generate a Schema.org `BreadcrumbList`.
 *
 * @param items - Ordered array of crumbs. First should always be "Home" → "/".
 */
export function generateBreadcrumbList(
  items: { name: string; href: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.href),
    })),
  };
}

// ─── FAQPage ──────────────────────────────────────────────────────────────────

/** A single FAQ entry. */
export interface FAQEntry {
  question: string;
  answer: string;
}

/**
 * Generate a Schema.org `FAQPage` object.
 *
 * Enables FAQ rich snippets in Google Search.  Pass the same Q&A
 * pairs that are rendered in the visible FAQ accordion.
 */
export function generateFAQPage(faqs: FAQEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ─── BlogPosting ──────────────────────────────────────────────────────────────

/** Options bag for `generateBlogPosting`. */
export interface BlogPostingOptions {
  title: string;
  description: string;
  /** Relative path, e.g. `/blog/my-post`. */
  path: string;
  /** Author's full name. */
  author: string;
  /** Optional URL for the author profile. */
  authorUrl?: string;
  /** ISO 8601 date of publication. */
  datePublished: string;
  /** ISO 8601 date of last modification (defaults to `datePublished`). */
  dateModified?: string;
  /** Category / section label. */
  category?: string;
  /** Absolute URL of the article image. */
  image?: string;
  /** Estimated reading time, e.g. "4 min read". */
  readTime?: string;
}

/**
 * Generate a Schema.org `BlogPosting` object.
 *
 * Enables article rich results including author, date, and headline
 * in Google Search and Google Discover.
 */
export function generateBlogPosting(opts: BlogPostingOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    url: abs(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      '@type': 'Person',
      name: opts.author,
      ...(opts.authorUrl && { url: opts.authorUrl }),
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: abs('/images/creditbuddy-logo.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': abs(opts.path),
    },
    ...(opts.category && { articleSection: opts.category }),
    ...(opts.image && {
      image: {
        '@type': 'ImageObject',
        url: opts.image,
      },
    }),
    inLanguage: 'en-IN',
  };
}

// ─── FinancialProduct ─────────────────────────────────────────────────────────

/**
 * Generate Schema.org `FinancialProduct` structured data.
 *
 * Helps search engines understand CreditBuddy's core product:
 * student micro-credit / micro-loans.
 */
export function generateFinancialProduct() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'CreditBuddy Student Micro-Credit',
    description:
      'Instant micro-credit designed exclusively for Indian college students. ' +
      'Borrow small amounts, repay flexibly via campus gigs, and build your ' +
      'CIBIL score from day one.',
    provider: { '@id': `${SITE_URL}/#organization` },
    url: abs('/students'),
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
    category: 'Micro Credit',
    feesAndCommissionsSpecification:
      'Zero hidden charges. Transparent fee structure disclosed before disbursement.',
  };
}

// ─── HowTo ────────────────────────────────────────────────────────────────────

/** A single step in a HowTo guide. */
export interface HowToStep {
  name: string;
  text: string;
  /** Optional image URL for the step. */
  image?: string;
}

/**
 * Generate Schema.org `HowTo` structured data.
 *
 * Enables step-by-step rich results in Google Search.
 */
export function generateHowTo(
  title: string,
  description: string,
  steps: HowToStep[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: {
          '@type': 'ImageObject',
          url: step.image,
        },
      }),
    })),
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────

/**
 * Generate Schema.org `Service` structured data for the campus
 * ambassador programme.
 */
export function generateAmbassadorService() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'CreditBuddy Campus Ambassador Program',
    description:
      'Become a campus leader who brings fair credit and financial literacy ' +
      'to your college campus. Earn rewards, build your resume, and make an impact.',
    provider: { '@id': `${SITE_URL}/#organization` },
    url: abs('/ambassador'),
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
    serviceType: 'Campus Ambassador Program',
    category: 'Student Leadership & Financial Inclusion',
  };
}

// ─── ContactPage ──────────────────────────────────────────────────────────────

/**
 * Generate Schema.org `ContactPage` structured data.
 */
export function generateContactPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact CreditBuddy',
    description:
      'Get in touch with CreditBuddy for student support, campus partnerships, ' +
      'investor inquiries, or media requests.',
    url: abs('/contact'),
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

// ─── AboutPage ────────────────────────────────────────────────────────────────

/**
 * Generate Schema.org `AboutPage` structured data.
 */
export function generateAboutPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About CreditBuddy',
    description:
      "Learn about CreditBuddy's mission, founding story, core values, " +
      'leadership team, and advisory board. Built by students, for students.',
    url: abs('/about'),
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

// ─── Person (Founder) ─────────────────────────────────────────────────────────

/**
 * Generate Schema.org `Person` structured data for Debasish Mallick,
 * Founder & CEO of CreditBuddy. Used on the About page.
 */
export function generateFounderPerson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#founder`,
    name: 'Debasish Mallick',
    jobTitle: 'Founder & CEO',
    worksFor: { '@id': `${SITE_URL}/#organization` },
    url: abs('/about'),
    sameAs: [
      'https://linkedin.com/in/debasish-mallick',
    ],
    knowsAbout: [
      'Student Fintech',
      'Micro-Credit',
      'Campus Gig Economy',
      'Financial Literacy',
      'CIBIL Score Building',
      'Student Financial Inclusion',
    ],
    nationality: {
      '@type': 'Country',
      name: 'India',
    },
  };
}

// ─── LocalBusiness ────────────────────────────────────────────────────────────

/**
 * Generate Schema.org `LocalBusiness` structured data for the
 * CreditBuddy registered office in Sambalpur, Odisha.
 */
export function generateLocalBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    legalName: LEGAL_ENTITY_NAME,
    url: SITE_URL,
    image: abs(DEFAULT_OG_IMAGE),
    logo: abs('/images/creditbuddy-logo.png'),
    description: SITE_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      ...COMPANY_ADDRESS,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 21.4669,
      longitude: 83.9756,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: CONTACT_EMAILS[0],
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: Object.values(SOCIAL_LINKS),
    priceRange: 'Free to join',
    currenciesAccepted: 'INR',
    paymentAccepted: 'UPI, Net Banking',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  };
}

// ─── SoftwareApplication ─────────────────────────────────────────────────────

/**
 * Generate Schema.org `SoftwareApplication` structured data for the
 * CreditBuddy mobile application.
 */
export function generateSoftwareApplication() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#app`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Android, iOS',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
    screenshot: abs(DEFAULT_OG_IMAGE),
    featureList: [
      'Instant student micro-credit',
      'Campus gig marketplace',
      'CIBIL score building',
      'Financial literacy modules',
      'Earn and repay loans',
      'Campus ambassador program',
      'Zero hidden charges',
      'RBI compliant NBFC partnerships',
    ],
    keywords: 'student credit, micro loans, campus gigs, CIBIL score, financial literacy, India',
    countryOfOrigin: 'IN',
  };
}
