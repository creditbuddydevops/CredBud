/**
 * @fileoverview Blog page for CreditBuddy — The Student Financial Journal.
 *
 * A content hub targeting financial-literacy keywords for Indian college
 * students. Renders a hero, a featured post (full-width), and a responsive
 * grid of article cards that link through to `/blog/<slug>`.
 *
 * SEO priority: 0.7 — content / thought-leadership page.
 *
 * @see {@link file:///d:/Vibe%20projects/CredBud/app/sitemap.ts} — Sitemap entry
 */

import { SmoothScroll } from '@/components/landing/shared/SmoothScroll';
import { GrainOverlay } from '@/components/landing/shared/GrainOverlay';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { FooterShutter } from '@/components/landing/Footer/FooterShutter';
import { BlogCard } from '@/components/blog/BlogCard';
import { POSTS } from '@/lib/blog/posts';
import {
  buildMetadata,
  generateWebPage,
  generateBlogPosting,
  SITE_URL,
} from '@/lib/seo';

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata = buildMetadata({
  title: 'Blog — Student Financial Journal, Credit Tips & Campus Money Hacks',
  description:
    'Bite-sized articles on credit scores, campus gig earnings, student budgeting, tax filing, ' +
    'and investing tips. Real financial advice for Indian college students — no jargon, just clarity.',
  path: '/blog',
  keywords: [
    'student financial blog India',
    'credit score tips students',
    'campus money hacks',
    'student budgeting tips India',
    'CIBIL score guide students',
    'financial literacy articles students',
    'campus gig earning tips',
    'tax filing for students India',
    'ITR for college students',
    'SIP for beginners India',
    'mutual funds for students',
    'student money management blog',
    'personal finance college students India',
    'how to build credit score India',
    'student financial advice blog',
    'college student money tips India',
    'student investing guide India',
    'budgeting 50 30 20 rule students',
    'student freelancing tax India',
    'campus job earning guide',
  ],
});

// ─── Derived data ─────────────────────────────────────────────────────────────

const featuredPost = POSTS.find((post) => post.featured);
const gridPosts = POSTS.filter((post) => !post.featured);

// ─── Structured Data ─────────────────────────────────────────────────────────

const webPageJsonLd = JSON.stringify(
  generateWebPage({
    title: 'Blog — CreditBuddy Student Financial Journal',
    description:
      'Financial literacy articles, credit tips, and money hacks for Indian college students.',
    path: '/blog',
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/blog' },
    ],
  }),
);

/** BlogPosting JSON-LD per article, now pointing at the real `/blog/<slug>` routes. */
const articleJsonLds = POSTS.map((post) =>
  JSON.stringify(
    generateBlogPosting({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      author: post.author.name,
      datePublished: post.date,
      category: post.category,
      readTime: post.readingTime,
      ...(post.coverImage && { image: `${SITE_URL}${post.coverImage}` }),
    }),
  ),
);

// ─── Page Component ──────────────────────────────────────────────────────────

export default function BlogPage() {
  return (
    <SmoothScroll>
      <GrainOverlay />

      {/* Page-level structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webPageJsonLd }}
      />
      {articleJsonLds.map((jsonLd, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      ))}

      <main className="relative w-full block bg-[#FBF7EF]">
        {/* Blog Hero */}
        <section className="relative pt-32 pb-16 px-6 md:px-12 bg-bg-primary text-ink border-b-[1.6px] border-ink overflow-hidden">
          {/* Warm glow blobs */}
          <div className="absolute w-[320px] h-[320px] -left-24 -top-24 bg-accent-cyan/40 rounded-full blur-[64px] pointer-events-none" />
          <div className="absolute w-[384px] h-[384px] right-[-50px] top-[120px] bg-accent-coral/30 rounded-full blur-[64px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
            <span className="font-jetbrains text-xs font-normal brutal-pill bg-accent-purple text-white px-4 py-1.5 mb-6 inline-block">
              {'// student money journal'}
            </span>
            <h1 className="font-bricolage text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6 max-w-4xl">
              Money tips that <span className="accent-underline">actually make sense</span>.
            </h1>
            <p className="font-jakarta text-ink-muted text-lg max-w-2xl leading-relaxed">
              No textbook jargon. Real advice on credit scores, campus gigs, taxes, and investing for Indian college students.
            </p>
          </div>
        </section>

        {/* Featured post */}
        {featuredPost ? (
          <section className="py-14 md:py-20 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="mb-8 md:mb-10 flex items-center gap-2.5">
              <span className="font-jetbrains text-xs font-bold text-ink-muted">
                {'// featured'}
              </span>
              <span className="h-px flex-1 bg-ink/10" />
            </div>
            <BlogCard post={featuredPost} featured />
          </section>
        ) : null}

        {/* Blog Articles Grid */}
        <section className="pb-16 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </section>

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
