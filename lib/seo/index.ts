/**
 * @fileoverview Barrel export for `@/lib/seo`.
 *
 * Allows clean one-line imports throughout the codebase:
 *
 * ```ts
 * import { buildMetadata, generateOrganization, SITE_URL } from '@/lib/seo';
 * ```
 */

// Metadata builder
export { buildMetadata } from './metadata';
export type { MetadataOptions } from './metadata';

// Structured-data generators
export {
  generateOrganization,
  generateWebSite,
  generateWebPage,
  generateBreadcrumbList,
  generateFAQPage,
  generateBlogPosting,
  generateFinancialProduct,
  generateHowTo,
  generateAmbassadorService,
  generateContactPage,
  generateAboutPage,
  generateFounderPerson,
  generateLocalBusiness,
  generateSoftwareApplication,
} from './structured-data';

export type {
  WebPageOptions,
  FAQEntry,
  BlogPostingOptions,
  HowToStep,
} from './structured-data';

// Constants
export {
  SITE_URL,
  SITE_NAME,
  LEGAL_ENTITY_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  COMPANY_CIN,
  COMPANY_GSTIN,
  COMPANY_ADDRESS,
  CONTACT_EMAILS,
  SOCIAL_LINKS,
  COLOR_BG_PRIMARY,
  COLOR_ACCENT_LIME,
  COLOR_ACCENT_PURPLE,
  COLOR_INK,
  DEFAULT_OG_IMAGE,
  DEFAULT_LOCALE,
  HTML_LANG,
  KEYWORDS_BRAND,
  KEYWORDS_PRODUCT,
  KEYWORDS_FINTECH_INDUSTRY,
  KEYWORDS_CREDIT_LITERACY,
  KEYWORDS_DEMOGRAPHIC,
  KEYWORDS_GEOGRAPHIC,
  KEYWORDS_LONG_TAIL,
  ALL_KEYWORDS,
} from './constants';
