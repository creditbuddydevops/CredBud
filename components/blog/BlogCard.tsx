'use client';

/**
 * @fileoverview BlogCard — the article card.
 *
 * Reused on the blog index grid AND inside `RelatedPosts`. Wraps a `Link` to
 * `/blog/<slug>` around a brutalist card with the cover, category pill, title,
 * excerpt, and a meta row (author · date · reading time). The `featured`
 * variant spans full width with a larger cover and title.
 */

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { Post } from '@/lib/blog/posts';
import { formatDate } from '@/lib/blog/posts';
import { BlogCover } from './BlogCover';

export interface BlogCardProps {
  /** The post to render. */
  post: Post;
  /** When true, render the full-width featured variant. */
  featured?: boolean;
  /** Stagger index for the entrance animation (used by the grid). */
  index?: number;
}

/**
 * Render an article card linking to the post. Hover lifts the card
 * (`hover:-translate-y-1`, matching `AboutAdvisorsSection`).
 */
export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  featured = false,
  index = 0,
}) => {
  const href = `/blog/${post.slug}`;

  const card = (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group bg-white brutal-card rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
        featured ? 'lg:flex lg:flex-row' : ''
      }`}
      style={{ boxShadow: '6px 6px 0px #14100F' }}
    >
      {/* Cover */}
      <div
        className={
          featured
            ? 'relative w-full aspect-[16/9] lg:w-1/2 lg:aspect-auto overflow-hidden bg-bg-secondary'
            : 'relative w-full aspect-[16/9] overflow-hidden bg-bg-secondary'
        }
      >
        <BlogCover post={post} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        {/* Category pill over the cover */}
        <span
          className={`absolute left-4 top-4 brutal-pill px-3 py-1 font-jetbrains text-[11px] font-bold ${post.categoryColor}`}
        >
          {post.category}
        </span>
      </div>

      {/* Body */}
      <div className={`flex flex-col ${featured ? 'lg:w-1/2 lg:justify-center' : ''} p-5 md:p-6`}>
        <h2
          className={`font-bricolage font-extrabold text-ink leading-tight tracking-tight mb-3 ${
            featured ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'
          }`}
        >
          {post.title}
        </h2>

        <p
          className={`font-jakarta text-ink-muted leading-relaxed mb-5 ${
            featured ? 'text-base md:text-lg' : 'text-sm'
          }`}
        >
          {post.excerpt}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-4 border-t border-ink/10 font-jetbrains text-[11px] text-ink-muted">
          <span className="font-bold text-ink">By {post.author.name}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </motion.article>
  );

  return (
    <Link
      href={href}
      className="block outline outline-0 focus-visible:outline-2 focus-visible:outline-offset-4 outline-accent-purple rounded-2xl"
      aria-label={`Read: ${post.title}`}
    >
      {card}
    </Link>
  );
};

export default BlogCard;
