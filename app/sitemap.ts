/**
 * @fileoverview Dynamic XML sitemap for CreditBuddy.
 *
 * Next.js 15 automatically serves this at `/sitemap.xml` when a
 * `sitemap.ts` file exists in the `app/` directory.
 *
 * Priority tiers:
 *   1.0  → Home (canonical landing)
 *   0.9  → Core product pages (How It Works, Students)
 *   0.8  → Community & brand pages (Ambassador, About)
 *   0.7  → Discovery / trust pages (Blog, Contact)
 *   0.3  → Legal / policy pages (rarely change)
 *
 * Note: `alternates.canonical` is NOT part of `MetadataRoute.Sitemap`
 * (it only supports `alternates.languages` for hreflang).
 * Canonical URLs are already implied by the `url` field in each entry
 * and are set per-page via `buildMetadata()` → `alternates.canonical`.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import type { MetadataRoute } from 'next';
import { SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/seo';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog/posts';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Absolute URL builder — no double-slash on root. */
const url = (path: string): string =>
  path === '/' ? SITE_URL : `${SITE_URL}${path}`;

/** OG image used for all indexable pages. */
const ogImageUrl = `${SITE_URL}${DEFAULT_OG_IMAGE}`;

// ─── Last-Modified Date Buckets ───────────────────────────────────────────────
// Update these when you ship meaningful content changes to each group.

/** Most recent deploy / content update. */
const TODAY = new Date('2026-10-21');

/** Original site launch date. */
const LAUNCH = new Date('2026-09-28');

/** Last time legal copy was reviewed and updated. */
const LEGAL_UPDATE = new Date('2026-08-01');

// ─── Blog post entries (additive — one URL per published post) ────────────────

const blogPostEntries: MetadataRoute.Sitemap = getAllPostSlugs().map(
  (slug): MetadataRoute.Sitemap[number] => {
    const post = getPostBySlug(slug);
    const cover = post?.coverImage ? `${SITE_URL}${post.coverImage}` : ogImageUrl;
    return {
      url: url(`/blog/${slug}`),
      lastModified: post ? new Date(post.date) : TODAY,
      changeFrequency: 'monthly',
      priority: 0.6,
      images: [cover],
    };
  },
);

// ─── Sitemap ──────────────────────────────────────────────────────────────────

export default function sitemap(): MetadataRoute.Sitemap {
  return [

    // ── Home ──────────────────────────────────────────────────────────────────
    {
      url: url('/'),
      lastModified: TODAY,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [ogImageUrl],
    },

    // ── Core Product Pages ────────────────────────────────────────────────────
    {
      url: url('/how-it-works'),
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [ogImageUrl],
    },
    {
      url: url('/students'),
      lastModified: TODAY,
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [ogImageUrl],
    },

    // ── Community & Brand Pages ───────────────────────────────────────────────
    {
      url: url('/ambassador'),
      lastModified: LAUNCH,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [ogImageUrl],
    },
    {
      url: url('/about'),
      lastModified: LAUNCH,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [ogImageUrl],
    },

    // ── Discovery / Trust Pages ───────────────────────────────────────────────
    {
      url: url('/blog'),
      lastModified: TODAY,
      changeFrequency: 'weekly',
      priority: 0.7,
      images: [ogImageUrl],
    },

    // ── Blog posts ─────────────────────────────────────────────────────────────
    ...blogPostEntries,
    {
      url: url('/contact'),
      lastModified: LAUNCH,
      changeFrequency: 'yearly',
      priority: 0.7,
      images: [ogImageUrl],
    },

    // ── Legal / Policy Pages ──────────────────────────────────────────────────
    // No images — legal pages don't need image indexing.
    {
      url: url('/terms'),
      lastModified: LEGAL_UPDATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: url('/privacy'),
      lastModified: LEGAL_UPDATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: url('/refund-policy'),
      lastModified: LEGAL_UPDATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
