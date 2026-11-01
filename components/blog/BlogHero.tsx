'use client';

/**
 * @fileoverview BlogHero — article header for a single blog post.
 *
 * Renders a semantic `<header>` with: category pill, big title (with an
 * optional accent-underline highlight), dek, an author/meta row (avatar
 * initials + name + role + date + reading time), an inline `ShareBar`, and
 * the cover image in a brutal-border frame. A GSAP entrance animates the hero
 * block only (no body text).
 */

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import type { Post } from '@/lib/blog/posts';
import { formatDate } from '@/lib/blog/posts';
import { BlogCover } from './BlogCover';
import { ShareBar } from './ShareBar';

export interface BlogHeroProps {
  /** The post whose hero to render. */
  post: Post;
}

/**
 * Render the title, wrapping the `highlight` phrase (if any) in an
 * accent-underline span for an editorial flourish.
 */
function TitleWithHighlight({ post }: { post: Post }) {
  const { title, highlight } = post;
  if (!highlight || !title.includes(highlight)) {
    return <>{title}</>;
  }
  const idx = title.indexOf(highlight);
  const before = title.slice(0, idx);
  const after = title.slice(idx + highlight.length);
  return (
    <>
      {before}
      <span className="accent-underline">{highlight}</span>
      {after}
    </>
  );
}

/**
 * Render the article hero. GSAP runs a one-time entrance reveal scoped to
 * this component.
 */
export const BlogHero: React.FC<BlogHeroProps> = ({ post }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-hero-reveal',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.1,
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={containerRef} className="px-6 md:px-12 pt-28 md:pt-32 pb-8 md:pb-10 bg-bg-primary">
      <div className="max-w-3xl mx-auto">
        {/* Category pill */}
        <span
          className={`blog-hero-reveal brutal-pill px-4 py-1.5 font-jetbrains text-xs font-bold mb-6 inline-block ${post.categoryColor}`}
        >
          {post.category}
        </span>

        {/* Title */}
        <h1
          className="blog-hero-reveal font-bricolage text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.02] text-ink mb-5"
        >
          <TitleWithHighlight post={post} />
        </h1>

        {/* Dek */}
        <p className="blog-hero-reveal font-jakarta text-lg md:text-xl text-ink-muted leading-relaxed mb-7">
          {post.excerpt}
        </p>

        {/* Author / meta row */}
        <div className="blog-hero-reveal flex flex-wrap items-center gap-x-3 gap-y-3 mb-6">
          <div
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-lime border-[1.6px] border-ink"
            style={{ boxShadow: '3px 3px 0px #14100F' }}
          >
            <span className="font-bricolage font-extrabold text-sm text-ink leading-none">
              {post.author.initials}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-jetbrains text-xs text-ink-muted">
            <span className="font-bold text-ink">{post.author.name}</span>
            <span className="text-accent-purple font-bold">·</span>
            <span>{post.author.role}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>

        {/* Inline share */}
        <div className="blog-hero-reveal mb-9">
          <ShareBar slug={post.slug} title={post.title} variant="inline" />
        </div>

        {/* Cover */}
        <div
          className="blog-hero-reveal relative w-full aspect-[16/9] overflow-hidden rounded-2xl brutal-border bg-bg-secondary"
          style={{ boxShadow: '6px 6px 0px #14100F' }}
        >
          <BlogCover post={post} className="object-cover" />
        </div>
      </div>
    </header>
  );
};

export default BlogHero;
