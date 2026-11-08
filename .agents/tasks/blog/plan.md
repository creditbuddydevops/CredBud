# Implementation Plan — CreditBuddy Blog (Index + Featured Post)

Goal: finish the blog **index** (`app/blog/page.tsx`) and build ONE fully-fledged, magazine-style single-post page (`app/blog/[slug]/page.tsx` + `components/blog/*`), dependency-free, matching the existing brutalist design system exactly. Work directly in the workspace; no new npm deps; do not touch `app/layout.tsx`, the global nav, or other pages.

Path alias `@/` → workspace root. All components use the existing tokens/classes; plain `<img>` is consistent with the site (Hero, NavSidebar, FooterShutter all use it).

---

## Design decisions (recorded rationale; no design doc was provided)

1. **No MDX / no new deps.** The project has no `gray-matter`/MDX and the brief forbids adding deps. The featured article body is a dedicated React component (`components/blog/posts/BuildCibilScorePost.tsx`) for full styling control. The `[slug]` page maps `slug → body component`. *Rationale: matches the explicit constraint and keeps the build dependency-free.*

2. **Data module stays pure; mapping lives in the route.** `lib/blog/posts.ts` holds only typed data + helpers (no React imports) so it never pulls client components into a server data file. Each post carries a `bodyKey: string | null`; the `[slug]` page owns the `bodyKey → React.FC` registry. *Rationale: clean server/client boundary; build stays type-safe.*

3. **Every slug renders.** `generateStaticParams` returns ALL post slugs. The featured post renders the rich `BuildCibilScorePost`; the other posts render a clean, on-brand `GenericPost` shell (reuses `BlogHero` + prose + `KeyTakeaways` + `RelatedPosts`) so no route is a broken stub and the whole blog is navigable. *Rationale: the brief calls the others "placeholders" for the index, but their `/blog/<slug>` routes must still build and look intentional.*

4. **Covers: real files where cheap, gradient fallback guaranteed.** Non-featured posts reuse existing on-brand images (`public/images/gigs.webp`, `internships.webp`, `referrals.webp`) as covers. The featured post gets one new dedicated cover at `public/images/blog/build-cibil-score-cover.webp` (coder authors a simple branded cover; acceptable fallback is `public/images/green-promo.webp`). OG/JSON-LD `image` uses `post.coverImage`, falling back to `DEFAULT_OG_IMAGE` from `lib/seo` if a cover path is empty — so the build is never broken by a missing asset. *Rationale: brief prefers real image files but permits CSS/gradient fallback; this keeps it robust.*

5. **Motion: readability first on the article.** Index cards use `motion/react` `whileInView` stagger (matches `AboutAdvisorsSection`). The post page uses `gsap` + `ScrollTrigger` reveals for section blocks only (matches `AboutTeamSection`), with NO per-paragraph animation on body text. *Rationale: matches existing patterns; the brief says don't over-animate body text.*

6. **Post page ends clean.** The article page has NO `FinalCTA`/`FooterShutter` 200vh shutter — it's a reading experience, not a funnel. It ends with `ShareBar` + a "Back to blog" nav link + `RelatedPosts`. *Rationale: brief explicitly says use judgment; a heavy shutter is wrong for an article.*

7. **Real author names only.** Authors are drawn from `AboutTeamSection`/`AboutAdvisorsSection`: Debasish Mallick (Founder & CEO), CA Nidhi Agrawal (Finance & Compliance Advisor), Karan Agrawal (Business Strategy), Ayush Nanda (Business Advisor). No invented names.

8. **SEO/JSON-LD via existing `lib/seo`.** Index keeps `buildMetadata` + `generateWebPage` (which embeds breadcrumbs) + `generateBlogPosting` per post, with article paths fixed to `/blog/<slug>`. The featured `[slug]` page additionally injects `generateHowTo` (the 5 steps) + `generateFAQPage` (matching a visible FAQ). Placeholder posts get `BlogPosting` + `WebPage`/breadcrumbs only.

---

## The reusable blog component set — `components/blog/`

All are small, typed, and match the brutalist aesthetic (`brutal-border`, `brutal-card`, `brutal-pill`, `brutal-shadow-sm`, `accent-underline`, `editorial-italic`, palette tokens, three font families). Each is its own file.

- **`BlogCard.tsx`** (`'use client'`) — the article card. Reused on the index grid AND inside `RelatedPosts`. Props: `post: Post`, `featured?: boolean`. Renders a `<Link href={'/blog/'+slug}>` wrapping a `brutal-card` (`bg-white`, `boxShadow: '6px 6px 0px #14100F'`) with: cover `<img>` (or a CSS-gradient cover block when no usable image), category pill (`brutal-pill` with the post's `categoryColor`), title (`font-bricolage`), excerpt (`font-jakarta`), and a meta row (`By {author}` · date · readingTime). Hover: `hover:-translate-y-1` lift (matches `AboutAdvisorsSection`). `featured` variant spans the full grid width with a larger cover + larger title. Alt text = post title.

- **`BlogHero.tsx`** (`'use client'`) — article hero. Used only on the post page. Props: `post: Post`. Renders a `<header>` with: category pill, big title (`font-bricolage`, `accent-underline` on a key phrase), dek (`font-jakarta`), an author/meta row (avatar circle with initials + name + role + `·` date + `·` readingTime), an inline `ShareBar`, and the cover `<img>` in a `brutal-border` frame with a hard offset shadow. GSAP entrance on the hero block.

- **`PullQuote.tsx`** — brutalist pull quote. Props: `quote: string`, `attribution?: string`, `accent?: 'purple'|'lime'|'coral'` (default purple). Big `font-bricolage` `editorial-italic` text with a thick accent `border-l-4` and a `brutal-shadow-sm` card. Plain (no animation) for readability.

- **`Callout.tsx`** — accent callout/tip box. Props: `title: string`, `children: ReactNode`, `variant?: 'tip'|'warning'|'note'` (tip=lime, warning=coral, note=cyan). Icon from `lucide-react` (`Lightbulb`/`AlertTriangle`/`Info`). `brutal-border` rounded card with a colored left rail. Accessible (proper heading + text).

- **`StepCard.tsx`** — numbered step card for HowTo-style sequences. Props: `index: number`, `title: string`, `children: ReactNode`, `accent?: string`. Large circled number (`font-bricolage`), `brutal-card`, optional icon. Used in the featured post's 5-step block.

- **`KeyTakeaways.tsx`** — summary block. Props: `items: string[]`, `title?: string` (default "Key takeaways"). A `brutal-card` (`bg-accent-lime` or white) with a `Check` icon (`lucide-react`) per item. Reused in featured post + `GenericPost`.

- **`AuthorBio.tsx`** — author bio card. Props: `author: BlogAuthor`, `bio: string`, `linkedin?: string`. Avatar circle (initials, white bg, `brutal-border`, `shadow-[3px_3px_0px_#14100F]`), name, role pill, bio, LinkedIn link with `ArrowUpRight`. Matches the founder card styling in `AboutTeamSection`. Used on every post page (featured + `GenericPost`).

- **`RelatedPosts.tsx`** (`'use client'`) — "Related posts" section. Props: `posts: Post[]`, `currentSlug: string`. A heading + a responsive grid of `BlogCard` (non-featured). Heading uses `SplitText` (optional) or a simple `font-bricolage` heading with a `// related` eyebrow. Reused on every post page.

- **`ShareBar.tsx`** (`'use client'`) — share buttons. Props: `slug: string`, `title: string`, `variant?: 'inline'|'block'`. Buttons/links: Copy link (`navigator.clipboard`, `<button>`), X/Twitter, LinkedIn, WhatsApp (`<a target=_blank>`). Each has `aria-label` and a visible focus ring (`focus-visible:outline-2 focus-visible:outline-offset-2 outline-accent-purple`). Reused inline in `BlogHero` and as a block at the article end.

- **`BlogCover.tsx`** — small helper that renders the cover visual: a `<img>` when `coverImage` is provided, else a designed CSS-gradient block using the post's accent + category label (the "tasteful CSS/gradient fallback"). Used by `BlogCard` and `BlogHero` to keep cover rendering consistent. Props: `post: Post`, `className?: string`.

**Reuse summary:** `BlogCard` (index + RelatedPosts), `ShareBar` (BlogHero inline + article end), `KeyTakeaways` + `AuthorBio` + `RelatedPosts` (featured + GenericPost), `BlogCover` (card + hero).

---

## `lib/blog/posts.ts` — typed data module (no React imports)

**Types**
```
BlogAuthor { name: string; role: string; initials: string; }
Post {
  slug: string; title: string; excerpt: string;
  category: string; categoryColor: string;   // tailwind classes for the pill, e.g. 'bg-accent-lime text-ink'
  author: BlogAuthor; date: string;            // ISO, e.g. '2026-08-05'
  readingTime: string; coverImage: string;     // path under /public (may be '')
  tags: string[]; featured?: boolean; bodyKey: string | null;
}
```

**Exports**
- `POSTS: Post[]` — 4 entries (one featured), all with real author names:
  1. **Featured** — `build-cibil-score-from-scratch-student` · Credit 101 · "How to Build Your CIBIL Score from Scratch as a Student" · author **Debasish Mallick** (Founder & CEO, initials "DM") · date `2026-08-05` · "7 min read" · cover `/images/blog/build-cibil-score-cover.webp` · tags: cibil score, build credit, student credit, credit history, india · `featured: true` · `bodyKey: 'build-cibil-score'`.
  2. `high-paying-micro-gigs-college-students-2026` · Campus Gigs · "Top 7 High-Paying Micro Gigs for College Students in 2026" · author **Ayush Nanda** (Business Advisor, "AN") · `2026-07-28` · "5 min read" · cover `/images/gigs.webp` · `bodyKey: null`.
  3. `50-30-20-rule-student-pocket-money` · Budgeting · "The 50/30/20 Rule Modified for Pocket Money & Stipends" · author **CA Nidhi Agrawal** (Finance & Compliance Advisor, "NA") · `2026-07-20` · "4 min read" · cover `/images/internships.webp` · `bodyKey: null`.
  4. `become-creditbuddy-campus-ambassador` · Ambassador Program · "Become a CreditBuddy Campus Ambassador: Earn While You Lead" · author **Karan Agrawal** (Business Strategy, "KA") · `2026-07-12` · "5 min read" · cover `/images/referrals.webp` · `bodyKey: null`.
- `getPostBySlug(slug: string): Post | undefined`
- `getAllPostSlugs(): string[]` — used by `generateStaticParams`.
- `getRelatedPosts(slug: string, count = 3): Post[]` — excludes the current slug; prefer different category first, then fill.

`categoryColor` per post (pill classes): featured → `bg-accent-purple text-white`; campus gigs → `bg-accent-gold text-ink`; budgeting → `bg-accent-cyan text-ink`; ambassador → `bg-accent-lime text-ink` (mirrors the existing index color choices).

---

## Featured post article layout — `components/blog/posts/BuildCibilScorePost.tsx`

Slug `build-cibil-score-from-scratch-student`, topic "How to Build Your CIBIL Score from Scratch as a Student". One dedicated `'use client'` component rendered inside `<article>` on the `[slug]` page. Block sequence (in order):

1. **Drop-cap intro** — opening paragraph(s) with a large accent drop-cap (CSS `::first-letter` via a span, `font-bricolage`), establishing the problem: most students start adulthood with zero credit history.
2. **"Why your CIBIL score matters"** — short section heading (`// why it matters` eyebrow + `font-bricolage` heading) + 1–2 prose paragraphs, then a **`PullQuote`**: "Your CIBIL score is your financial fingerprint — start building it before you need it."
3. **`Callout` (tip)** — "The 5 factors that decide your CIBIL score" with a small inline **percentage-bar diagram** (CSS flex bars, no binary image): Payment history 35%, Credit utilization 30%, Length of history 15%, Credit mix 10%, New credit 10%. Label + bar + % per row.
4. **Numbered `StepCard`s** — "5 steps to build your score from scratch":
   1. Open a student micro-credit line (CreditBuddy) — borrow small, repay on time to create a repayment trail.
   2. Keep credit utilization under 30% — never max out even a small limit.
   3. Pay every bill on/before the due date — payment history is 35% of the score.
   4. Build a healthy credit mix — small credit line + a secured/student-oriented entry over time.
   5. Avoid multiple hard inquiries — space out applications; check your score via soft pulls.
5. **Comparison table — "Good vs Bad credit habits"** — a brutalist 2-column table (accent header row, `brutal-border`, alternating `bg-bg-primary`/white rows), ~6 rows (e.g. Pay on time vs Miss due dates; Utilize <30% vs Max out cards; Soft-pull self-check vs Many hard inquiries; One credit line at a time vs Many simultaneous applications; Keep old accounts open vs Close cards impulsively; Budget with CreditBuddy vs Borrow to repay borrow). Accessible: real `<table>`, `<thead>`, `<th scope>`.
6. **Inline diagram — "CIBIL score growth timeline"** — a designed CSS/SVG block showing months 1→12 with the score climbing 0 → ~750 and milestone markers (first on-time repayment, 3-month utilization target, 6-month history, 12-month 700+). Pure inline SVG/CSS, not a binary image.
7. **`Callout` (warning)** — "Common myths busted" — e.g. "Checking your own score doesn't lower it (soft pull)", "Zero credit history ≠ good credit", "Closing old cards can hurt your score."
8. **`KeyTakeaways`** — 5 bullet checklist summary of the whole article.
9. **`AuthorBio`** — Debasish Mallick, Founder & CEO; reuse the founder bio voice from `AboutTeamSection` (student-first fintech mission), LinkedIn link.

The `[slug]` page wraps the above in `<article>` and appends `ShareBar` (block) + "Back to blog" `<nav>` link + `RelatedPosts`. Body text stays `font-jakarta`, comfortable measure (`max-w-2xl`, `prose`-like leading); headings `font-bricolage`; eyebrows `font-jetbrains`. GSAP reveals on section blocks only (ScrollTrigger `start: 'top 80%'`), no animation on paragraph text.

---

## Blog index revamp — `app/blog/page.tsx`

Keep the existing scaffold (it already imports `SmoothScroll`, `GrainOverlay`, `FinalCTA`, `FooterShutter`, `buildMetadata`, `generateWebPage`, `generateBlogPosting`). Changes:

- Replace the inline `ARTICLES` array with an import from `@/lib/blog/posts` (`POSTS`). Remove inline data.
- **Hero/heading area:** keep the existing hero block (eyebrow pill `// student money journal`, big `accent-underline` headline, subcopy). Optionally swap the static headline reveal to `SplitText` for consistency with other pages — optional, low-risk.
- **Featured card:** render the `featured: true` post first as a full-width `BlogCard` (`featured` variant) above the grid.
- **Grid:** render the remaining posts in a responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`) using `BlogCard`, each wrapped so the whole card links to `/blog/<slug>`. Add a `motion` `whileInView` stagger (matches `AboutAdvisorsSection`).
- **JSON-LD:** keep `generateWebPage` (path `/blog`, breadcrumbs Home→Blog). Keep per-post `generateBlogPosting`, but FIX the article `path` from `/blog` to `/blog/<slug>` and pass `image` = post cover (or omit). Keep `buildMetadata` (already correct).
- Keep the `FinalCTA` + `FooterShutter` 200vh shutter exactly as-is (it is appropriate for the index/marketing page).

---

## Single post page — `app/blog/[slug]/page.tsx`

Server Component (so `generateStaticParams`/`generateMetadata` work). Imports client components (`SmoothScroll`, `GrainOverlay`, `BlogHero`, `ShareBar`, `RelatedPosts`, the body components) — same pattern as `app/how-it-works/page.tsx` (server page importing client sections).

- **`generateStaticParams()`** → `getAllPostSlugs().map(slug => ({ slug }))`.
- **`generateMetadata({ params })`** → `const post = getPostBySlug(params.slug); if (!post) notFound();` then `buildMetadata({ title: post.title, description: post.excerpt, path: '/blog/'+post.slug, ogType: 'article', publishedTime: post.date, modifiedTime: post.date, author: post.author.name, section: post.category, ogImage: post.coverImage || undefined, keywords: post.tags })`. (buildMetadata already falls back to `DEFAULT_OG_IMAGE` when `ogImage` is unset.)
- **Body rendering:** `const post = getPostBySlug(params.slug); if (!post) notFound();` Look up the body component from a `bodyKey → React.FC` registry: `'build-cibil-score' → BuildCibilScorePost`; default → `GenericPost`. Render:
  - `generateWebPage` JSON-LD (breadcrumbs Home → Blog → post title, path `/blog/<slug>`, `dateModified: post.date`).
  - `generateBlogPosting` JSON-LD (`title, description, path: '/blog/'+slug, author, datePublished: post.date, category, image: post.coverImage ? abs : undefined, readTime`).
  - **Featured only:** also inject `generateHowTo(...)` with the 5 steps (name+text mirroring the `StepCard`s) and `generateFAQPage(...)` with 3–4 Q&A mirroring a visible FAQ/Callout (define the Q&A inline in the page or in `posts.ts`). Placeholder posts skip HowTo/FAQ.
  - `<SmoothScroll><GrainOverlay/> {scripts} <main className="bg-bg-primary"> <BlogHero post={post}/> <article> {BodyComponent} </article> <ShareBar block/> <nav back-to-blog/> <RelatedPosts/> </main></SmoothScroll>`. Top padding so content clears the fixed nav logo/hamburger (`pt-28 md:pt-32` like the existing hero).
- **`GenericPost.tsx`** (`components/blog/posts/`) — clean on-brand article shell for the 3 placeholder posts: `<BlogHero>`, 3–4 short authored paragraphs (brand-aligned, ~120–180 words) in `<article>`, one `Callout` (tip) with a real money tip, `KeyTakeaways` (3 items), `AuthorBio`, then the page adds `ShareBar` + back link + `RelatedPosts`. Renders something polished, not a stub.

---

## Cover images — `public/images/blog/`

- Create `public/images/blog/` directory.
- Author ONE new dedicated cover: `build-cibil-score-cover.webp` (~1200×630, branded: cream bg, ink brutalist border motif, accent-purple/lime bars, the category "CREDIT 101" and a short title line). Acceptable fallback if raster authoring is impractical: reuse `public/images/green-promo.webp` as the featured cover path instead (set `coverImage` accordingly) — but prefer authoring the dedicated cover.
- Non-featured posts reuse existing on-brand images already in `public/images/` (`gigs.webp`, `internships.webp`, `referrals.webp`) — no new files needed for them.
- Covers are rendered by `BlogCover` (plain `<img>` with `alt={post.title}`), consistent with the site's `<img>` usage.

---

## Optional additive sitemap — `app/sitemap.ts`

After the existing `/blog` entry, add one entry per post slug via `getAllPostSlugs()`:
`{ url: url('/blog/'+slug), lastModified: new Date(post.date), changeFrequency: 'monthly', priority: 0.6, images: [coverUrl] }`. Import `getAllPostSlugs` + `getPostBySlug` from `@/lib/blog`. Purely additive; do not change existing entries. (Skip if it risks build; it's low-risk and additive.)

---

## Ordered file-by-file build sequence

Implement top-down so each step leaves the repo buildable. Verify after each where noted; final verification at the end.

- [ ] **1. Create the typed data module `lib/blog/posts.ts`.**
      Define `BlogAuthor` + `Post` types, the 4-entry `POSTS` array (one `featured: true`, `bodyKey: 'build-cibil-score'` for the featured, `null` for others), `getPostBySlug`, `getAllPostSlugs`, `getRelatedPosts`. No React imports. Use real author names/initials and the category colors above.
      Files: `lib/blog/posts.ts`
      Verify: `npx tsc --noEmit` passes (type-only module). 

- [ ] **2. Create the blog cover images directory + featured cover asset.**
      Create `public/images/blog/`. Author `build-cibil-score-cover.webp` (or, fallback, set the featured post's `coverImage` to `/images/green-promo.webp` and skip the new file). Confirm `public/images/gigs.webp`, `internships.webp`, `referrals.webp` already exist (they do).
      Files: `public/images/blog/build-cibil-score-cover.webp` (new, or fallback reuse)
      Verify: the referenced paths exist under `public/`.

- [ ] **3. Create the leaf presentational components (no cross-deps).**
      Create `components/blog/PullQuote.tsx`, `Callout.tsx`, `StepCard.tsx`, `KeyTakeaways.tsx`, `ShareBar.tsx`, `BlogCover.tsx`, `AuthorBio.tsx`. Each matches the brutalist classes; `ShareBar` + `KeyTakeaways` are `'use client'` where they use hooks/`motion` (ShareBar uses `navigator.clipboard` + state). Plain `<table>`/`<ul>` semantics; visible focus styles on interactive elements.
      Files: `components/blog/PullQuote.tsx`, `Callout.tsx`, `StepCard.tsx`, `KeyTakeaways.tsx`, `ShareBar.tsx`, `BlogCover.tsx`, `AuthorBio.tsx`
      Verify: `npx tsc --noEmit` passes.

- [ ] **4. Create `BlogCard.tsx` and `RelatedPosts.tsx`.**
      `BlogCard` (`'use client'`) consumes a `Post` and renders a `Link` to `/blog/<slug>` with the `brutal-card` + `BlogCover` + meta; `featured` variant full-width. `RelatedPosts` maps `BlogCard` over the related posts grid. Hover lift matches `AboutAdvisorsSection`.
      Files: `components/blog/BlogCard.tsx`, `components/blog/RelatedPosts.tsx`
      Verify: `npx tsc --noEmit` passes.

- [ ] **5. Create `BlogHero.tsx`.**
      `'use client'`. Article `<header>`: category pill, big title with `accent-underline`, dek, author/meta row, inline `ShareBar`, `BlogCover` in a `brutal-border` frame. GSAP entrance (gsap.context). Top padding to clear the fixed nav.
      Files: `components/blog/BlogHero.tsx`
      Verify: `npx tsc --noEmit` passes.

- [ ] **6. Create `GenericPost.tsx` (placeholder article body).**
      `components/blog/posts/GenericPost.tsx` (`'use client'`). Accepts `post: Post`, renders 3–4 short brand-aligned paragraphs, one `Callout` (tip), `KeyTakeaways` (3), `AuthorBio`. Imports the leaf components from step 3 + `AuthorBio`.
      Files: `components/blog/posts/GenericPost.tsx`
      Verify: `npx tsc --noEmit` passes.

- [ ] **7. Create `BuildCibilScorePost.tsx` (the featured article body).**
      `components/blog/posts/BuildCibilScorePost.tsx` (`'use client'`). Implement the full block sequence (drop-cap intro, PullQuote, Callout+percentage bars, 5 StepCards, good-vs-bad `<table>`, score-growth SVG/CSS diagram, warning Callout, KeyTakeaways, AuthorBio). GSAP `ScrollTrigger` reveals on section blocks only (`start: 'top 80%'`), no paragraph animation. Register `ScrollTrigger` (`if window, gsap.registerPlugin(ScrollTrigger)`) exactly like `AboutTeamSection`.
      Files: `components/blog/posts/BuildCibilScorePost.tsx`
      Verify: `npx tsc --noEmit` passes.

- [ ] **8. Revamp the blog index `app/blog/page.tsx`.**
      Import `POSTS`, `BlogCard`. Render the featured post as a full-width `BlogCard` above the grid; render the rest in the responsive grid. Keep hero, `buildMetadata`, `generateWebPage` JSON-LD (breadcrumbs Home→Blog), per-post `generateBlogPosting` with `path: '/blog/'+slug` and `image` set. Keep `FinalCTA`/`FooterShutter` shutter. Add `motion` stagger on the grid.
      Files: `app/blog/page.tsx`
      Verify: `npm run build` succeeds; `npm run dev` → `/blog` shows hero, featured card, grid; cards link to `/blog/<slug>`.

- [ ] **9. Create the dynamic route `app/blog/[slug]/page.tsx`.**
      Server Component. `generateStaticParams` from `getAllPostSlugs`; `generateMetadata` from `getPostBySlug` (article OG). Render `SmoothScroll` + `GrainOverlay` + JSON-LD scripts (`WebPage`+breadcrumbs, `BlogPosting`; featured also `HowTo` + `FAQ`) + `<main>` (`BlogHero`, `<article>{BodyComponent}</article>`, `ShareBar` block, back-to-blog `<nav>`, `RelatedPosts`). `bodyKey` registry: `'build-cibil-score' → BuildCibilScorePost`, default → `GenericPost`. `notFound()` on unknown slug.
      Files: `app/blog/[slug]/page.tsx`
      Verify: `npm run build` succeeds (validates `generateStaticParams` + `generateMetadata` + types). `npm run dev` → featured `/blog/build-cibil-score-from-scratch-student` renders hero, all article blocks, related posts, back link; a placeholder slug renders `GenericPost`.

- [ ] **10. Extend `app/sitemap.ts` (optional, additive).**
      After the existing `/blog` entry, append one entry per slug from `getAllPostSlugs()` (priority 0.6, `changeFrequency: 'monthly'`, `lastModified: new Date(post.date)`). Do not modify existing entries.
      Files: `app/sitemap.ts`
      Verify: `npm run build` succeeds; `/sitemap.xml` contains the post URLs.

---

## Verification (perform and report)

- **Lint:** `npm run lint` → 0 errors. (Pre-existing `@next/next/no-img-element` warnings from `<img>` are acceptable and consistent with the rest of the site; do not introduce NEW lint errors. `next.config.ts` sets `eslint.ignoreDuringBuilds: true`, but run lint explicitly anyway.)
- **Type check + build:** `npm run build` → must succeed. This validates the dynamic route, `generateStaticParams`, `generateMetadata`, all imports, and TypeScript (`typescript.ignoreBuildErrors: false`, so types must be clean).
- **Dev visual check:** `npm run dev` and verify at **mobile + desktop** widths:
  - `/blog`: nav logo + hamburger work (sidebar opens/closes), hero, featured card, grid, cards link to `/blog/<slug>`, no horizontal overflow, responsive breakpoints hold.
  - `/blog/build-cibil-score-from-scratch-student`: article hero, drop-cap intro, pull quote, callout + percentage bars, 5 step cards, good-vs-bad comparison table, score-growth diagram, warning callout, key takeaways, author bio, share buttons (copy link works), back-to-blog link, related posts. Confirm the featured post is reachable from the index (click featured card).
  - One placeholder slug: `GenericPost` renders cleanly (hero, prose, callout, takeaways, author bio, related posts).
  - Confirm no layout shift / overflow at 375px, 768px, 1280px.
- Report exactly what was checked (commands run + outcomes), and confirm the featured post is reachable from the index.

## Constraints recap (do not violate)

- No new npm dependencies. Use only installed packages (next, react, gsap, motion, lucide-react, clsx, tailwind-merge, @studio-freight/react-lenis).
- Do NOT modify `app/layout.tsx`, the global nav (`NavSidebar`), or other pages. Only edit `app/blog/page.tsx` and add files under `app/blog/`, `components/blog/`, `lib/blog/`, `public/images/blog/`. Optionally extend `app/sitemap.ts` (additive).
- Match the brutalist aesthetic precisely (reuse `brutal-border`, `brutal-shadow-sm`, `brutal-pill`, `shadow-[3.5px_3.5px_0px_0px_#14100F]`, `brutal-card`, `accent-underline`, palette/font tokens).
- Accessibility: semantic landmarks (`<article>`, `<header>`, `<nav>`, `<footer>`), descriptive alt text, visible focus styles, sufficient contrast, keyboard-operable links/buttons.
- TypeScript throughout with clean types; the production build runs `tsc`.
