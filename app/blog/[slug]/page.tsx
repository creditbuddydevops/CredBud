/**
 * @fileoverview Single blog-post page for CreditBuddy.
 *
 * Server Component rendering one article from `lib/blog/posts`. It:
 *   - Statically generates a page per slug (`generateStaticParams`).
 *   - Builds article metadata + canonical/OG per post (`generateMetadata`).
 *   - Injects WebPage (breadcrumbs) + BlogPosting JSON-LD for every post,
 *     and additionally HowTo + FAQPage JSON-LD for the featured guide.
 *   - Maps `post.bodyKey` → a dedicated article body component
 *     (`BuildCibilScorePost` for the featured guide, `GenericPost` otherwise).
 *
 * @see {@link file:///d:/Vibe%20projects/CredBud/lib/blog/posts.ts}
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { SmoothScroll } from '@/components/landing/shared/SmoothScroll';
import { GrainOverlay } from '@/components/landing/shared/GrainOverlay';
import { BlogHero } from '@/components/blog/BlogHero';
import { ShareBar } from '@/components/blog/ShareBar';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { BuildCibilScorePost } from '@/components/blog/posts/BuildCibilScorePost';
import { GenericPost } from '@/components/blog/posts/GenericPost';
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
  BUILD_CIBIL_FAQS,
  BUILD_CIBIL_STEPS,
  type Post,
} from '@/lib/blog/posts';
import {
  buildMetadata,
  generateWebPage,
  generateBlogPosting,
  generateHowTo,
  generateFAQPage,
  SITE_URL,
} from '@/lib/seo';

// Fully static blog — only known slugs render; anything else 404s.
export const dynamicParams = false;

// ─── Static params ───────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return buildMetadata({
      title: 'Article not found',
      description: 'The article you are looking for could not be found.',
      path: '/blog',
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogType: 'article',
    publishedTime: post.date,
    modifiedTime: post.date,
    author: post.author.name,
    section: post.category,
    ogImage: post.coverImage || undefined,
    keywords: post.tags,
  });
}

// ─── Body component registry ─────────────────────────────────────────────────
// Maps a post's `bodyKey` to its dedicated React body component. The data
// module stays free of React imports; the route owns this mapping.

type BodyComponent = React.FC<{ post: Post }>;

const BODY_REGISTRY: Record<string, BodyComponent> = {
  'build-cibil-score': BuildCibilScorePost,
};

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const resolved = post.bodyKey ? BODY_REGISTRY[post.bodyKey] : undefined;
  const BodyComponent: BodyComponent = resolved ?? GenericPost;
  const related = getRelatedPosts(post.slug, 3);

  // ── Structured data ─────────────────────────────────────────────────────
  const webPageJsonLd = JSON.stringify(
    generateWebPage({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      dateModified: post.date,
      breadcrumbs: [
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: post.title, href: `/blog/${post.slug}` },
      ],
    }),
  );

  const blogPostingJsonLd = JSON.stringify(
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
  );

  // Featured guide only: HowTo + FAQPage structured data mirroring the visible
  // step cards and FAQ block.
  const howToJsonLd =
    post.bodyKey === 'build-cibil-score'
      ? JSON.stringify(
          generateHowTo(
            post.title,
            post.excerpt,
            BUILD_CIBIL_STEPS.map((s) => ({
              name: s.name,
              text: s.text,
            })),
          ),
        )
      : null;

  const faqJsonLd =
    post.bodyKey === 'build-cibil-score'
      ? JSON.stringify(generateFAQPage(BUILD_CIBIL_FAQS))
      : null;

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
        dangerouslySetInnerHTML={{ __html: blogPostingJsonLd }}
      />
      {howToJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: howToJsonLd }}
        />
      ) : null}
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd }}
        />
      ) : null}

      <main className="relative w-full block bg-bg-primary">
        <BlogHero post={post} />

        <article className="px-6 md:px-12 py-10 md:py-16">
          <div className="max-w-3xl mx-auto">
            <BodyComponent post={post} />

            {/* End-of-article share */}
            <ShareBar slug={post.slug} title={post.title} variant="block" />

            {/* Back to blog */}
            <nav aria-label="Back to blog" className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 brutal-pill bg-white px-5 py-2.5 font-jetbrains text-xs font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-accent-lime outline outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 outline-accent-purple"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
                Back to blog
              </Link>
            </nav>
          </div>
        </article>

        {/* Related posts (wider grid) */}
        <section className="px-6 md:px-12 pb-16 md:pb-24 border-t-[1.6px] border-ink/10 pt-14 md:pt-20">
          <div className="max-w-7xl mx-auto">
            <RelatedPosts posts={related} currentSlug={post.slug} />
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}
