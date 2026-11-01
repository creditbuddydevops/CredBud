'use client';

/**
 * @fileoverview RelatedPosts — "Related posts" section.
 *
 * Renders an eyebrow + heading and a responsive grid of non-featured
 * `BlogCard`s for the supplied posts. Reused on every post page.
 */

import React from 'react';
import type { Post } from '@/lib/blog/posts';
import { BlogCard } from './BlogCard';

export interface RelatedPostsProps {
  /** Posts to display (already excludes the current article). */
  posts: Post[];
  /** The current article's slug — kept for context but not rendered. */
  currentSlug: string;
}

/**
 * Render a related-posts grid. Skips rendering entirely when there are no
 * related posts, so the article end stays clean.
 */
export const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (!posts.length) return null;

  return (
    <section className="pt-4 md:pt-6" aria-label="Related articles">
      <div className="mb-8 md:mb-10 space-y-2">
        <span className="font-jetbrains text-xs font-bold text-ink-muted block">
          {'// related reads'}
        </span>
        <h2 className="font-bricolage text-3xl md:text-5xl font-extrabold tracking-tight text-ink">
          Keep reading
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <BlogCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
