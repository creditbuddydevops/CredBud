/**
 * @fileoverview BlogCover — renders a post's cover visual.
 *
 * Renders a plain `<img>` when the post has a `coverImage`, otherwise a
 * designed CSS-gradient fallback block (brand-aligned) that shows the
 * category label. Used by `BlogCard` and `BlogHero` so cover rendering stays
 * consistent. Plain `<img>` matches the rest of the site (Hero, NavSidebar,
 * FooterShutter all use it).
 */

import React from 'react';
import type { Post } from '@/lib/blog/posts';

export interface BlogCoverProps {
  /** The post whose cover to render. */
  post: Post;
  /** Extra classes applied to the root element. */
  className?: string;
}

/**
 * Render the cover visual for a post. The element fills its parent
 * (`block w-full h-full`); callers control the aspect ratio / framing.
 */
export const BlogCover: React.FC<BlogCoverProps> = ({ post, className = '' }) => {
  const root = `block w-full h-full ${className}`;

  if (post.coverImage) {
    return (
      <img
        src={post.coverImage}
        alt={post.title}
        loading="lazy"
        className={root}
      />
    );
  }

  // ── Tasteful CSS/gradient fallback ──────────────────────────────────────
  // A branded cream canvas with accent blobs, the category label, and the
  // author initials — used only when a cover image path is missing.
  return (
    <div
      role="img"
      aria-label={post.title}
      className={`relative overflow-hidden bg-bg-primary brutal-border ${root}`}
    >
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-accent-cyan/40 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-accent-coral/30 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-purple/20 blur-3xl" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <span
          className={`brutal-pill px-4 py-1.5 font-jetbrains text-xs font-bold ${post.categoryColor}`}
        >
          {post.category}
        </span>
        <span className="font-bricolage text-3xl font-extrabold text-ink/15">
          {post.author.initials}
        </span>
      </div>
    </div>
  );
};

export default BlogCover;
