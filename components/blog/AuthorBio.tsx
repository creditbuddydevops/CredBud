/**
 * @fileoverview AuthorBio — author bio card for the end of a blog article.
 *
 * A brutalist card with an initials avatar, the author's name and role,
 * a bio paragraph, and an optional LinkedIn link. Mirrors the founder card
 * styling in `AboutTeamSection`. Reused on every post page.
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { BlogAuthor } from '@/lib/blog/posts';

export interface AuthorBioProps {
  /** The author to render. */
  author: BlogAuthor;
  /** Bio copy for this author. */
  bio: string;
  /** Optional LinkedIn profile URL. */
  linkedin?: string;
}

/**
 * Render an author bio card. Accessible: the avatar is decorative
 * (initials are supplementary); the LinkedIn link has a descriptive label.
 */
export const AuthorBio: React.FC<AuthorBioProps> = ({ author, bio, linkedin }) => {
  return (
    <section
      aria-label={`About ${author.name}`}
      className="my-10 md:my-12 brutal-card bg-white rounded-3xl p-6 md:p-8"
      style={{ boxShadow: '6px 6px 0px #14100F' }}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {/* Avatar circle */}
        <div
          aria-hidden="true"
          className="flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-full bg-accent-lime border-[1.6px] border-ink"
          style={{ boxShadow: '3px 3px 0px #14100F' }}
        >
          <span className="font-bricolage font-extrabold text-2xl md:text-3xl text-ink leading-none">
            {author.initials}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h3 className="font-bricolage text-xl md:text-2xl font-extrabold text-ink leading-tight">
              {author.name}
            </h3>
            <span className="brutal-pill bg-accent-purple px-3 py-1 font-jetbrains text-[11px] font-bold text-white">
              {author.role}
            </span>
          </div>

          <p className="font-jakarta text-base md:text-[1.05rem] text-ink/80 leading-relaxed">
            {bio}
          </p>

          {linkedin ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 font-jetbrains text-xs font-bold text-ink underline underline-offset-4 hover:text-accent-purple transition-colors"
            >
              Connect on LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default AuthorBio;
