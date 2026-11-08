/**
 * @fileoverview robots.txt configuration for CreditBuddy.
 *
 * Next.js 15 automatically serves this at `/robots.txt`.
 * 
 * Rules:
 *   - Allow all bots to crawl all public pages
 *   - Block crawling of Next.js internal routes (`/_next/`)
 *   - Block crawling of API routes (`/api/`)
 *   - Reference the sitemap for efficient crawl discovery
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/**
 * Generate the robots.txt directives.
 *
 * @returns Robots.txt configuration object.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/_next/',
          '/api/',
          '/static/',
          '/*.json$',
        ],
      },
      {
        // Googlebot-specific: allow everything we want indexed
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/_next/', '/api/'],
      },
      {
        // Bingbot-specific
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/_next/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
