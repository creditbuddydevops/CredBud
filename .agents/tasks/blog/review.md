# CreditBuddy blog — index revamp and featured CIBIL-score article

The change replaces the placeholder blog index with a styled listing — a hero, a full-width featured card, and a responsive grid — and adds a dynamic `/blog/[slug]` route with a magazine-style featured article ("How to Build Your CIBIL Score from Scratch as a Student") plus a clean generic shell for the three placeholder posts. It introduces a pure typed data module (`lib/blog/posts.ts`), a reusable brutalist component set under `components/blog/`, per-post metadata, and WebPage/BlogPosting JSON-LD (HowTo + FAQPage for the featured), with additive sitemap entries and no new dependencies. The approach follows the plan: dependency-free (no MDX), the server route owns the `bodyKey`→body-component registry, every slug is statically generated, and motion is confined to cards and section blocks with no body-text animation.

Watch for: the featured article injects `FAQPage` structured data for four Q&A pairs that are not visibly rendered anywhere on the page, and the featured cover ships as an SVG instead of the raster WebP the plan specified — which breaks the featured post's social-share (OG) image and drops its brand typefaces when shown via `<img>`.

**Verdict**: NEEDS_CHANGES

## High-level view

The data/route split is as planned: `lib/blog/posts.ts` is a pure typed module with no React imports, and the `[slug]` server component owns the `bodyKey`→body-component registry (`build-cibil-score`→`BuildCibilScorePost`, default→`GenericPost`). `generateStaticParams` enumerates all four slugs and `dynamicParams = false` 404s the rest. The HowTo JSON-LD mirrors the visible StepCards faithfully; the FAQPage JSON-LD does not.

The featured article and the new component set match the brutalist system — `brutal-card`/`brutal-border`/`brutal-pill`, `accent-underline`, `editorial-italic`, the three font families, and the cream/ink/accent palette — and the featured post runs the full planned block sequence (drop-cap intro, pull quote, five-factor callout, five step cards, comparison table, score-growth timeline, myths callout, takeaways, author bio). The three placeholder posts get a genuine authored `GenericPost` body rather than a stub.

The components compose and reuse as planned: `BlogCard` on the index and in `RelatedPosts`, `ShareBar` inline in the hero and as an end block, and `KeyTakeaways`/`AuthorBio`/`RelatedPosts` on both featured and generic posts; `BlogCover` centralises cover rendering with a CSS-gradient fallback.

Accessibility has the expected semantic shape (`<article>`/`<header>`/`<nav>`/`<section>`, descriptive `alt`, `role="img"` labels on the SVG and gradient fallback, a real scoped `<table>`, keyboard-operable controls with the design-system focus ring) with one gap (confirmed): the `AuthorBio` LinkedIn link is the only interactive control missing that `focus-visible` ring.

The featured cover is the main off-plan choice: an SVG instead of the raster WebP the plan specified. That breaks the featured post's social-share (OG) image — Twitter/Facebook/LinkedIn don't render SVG OG images (likely) — and its Bricolage/JetBrains/Jakarta text falls back to generic fonts when shown via `<img>`, since an `<img>`-embedded SVG can't use the page's `@font-face` (likely).

<details>
<summary>Issues (5)</summary>

1. **FAQ structured data without visible Q&A** — `FAQPage` JSON-LD emits four Q&A pairs that have no matching visible FAQ block on the page (only a looser "myths" callout that covers ~2 of the 4). Render a visible FAQ `<section>` answering all four `BUILD_CIBIL_FAQS` questions, or drop the `FAQPage` JSON-LD to match what's actually shown. *(confirmed)*
2. **Featured cover shipped as SVG** — used as the `og:image`, but Twitter/Facebook/LinkedIn don't render SVG OG images, and its text falls back to generic fonts when displayed via `<img>`. Export the cover as a raster PNG/JPG/WebP (1200×630) so fonts bake in and OG works. *(likely)*
3. **AuthorBio LinkedIn focus ring** — the only interactive blog control missing the design-system `focus-visible` ring. Add the same `outline outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 outline-accent-purple` ring used by the other links/buttons. *(confirmed)*
4. **Unused `POSTS` import** — `app/blog/[slug]/page.tsx` imports `POSTS` but never references it. Drop it from the import. *(confirmed)*
5. **Hardcoded `bg-[#FBF7EF]` instead of the `bg-bg-primary` token** — the index `<main>` bypasses the token every other page uses. Use `bg-bg-primary` for consistency. *(confirmed)*

</details>

<details>
<summary>Details</summary>

### Data layer and the bodyKey registry

The `[slug]` route resolves `post.bodyKey` through a `Record<string, BodyComponent>` registry (`build-cibil-score`→`BuildCibilScorePost`, default→`GenericPost`), `generateStaticParams` returns all four slugs, and `dynamicParams = false` makes unknown slugs 404 — confirmed against the route and the commit's "all 4 slugs pre-rendered, unknown slug 404s" note. `lib/blog/posts.ts` carries no React imports, so the data module never pulls client components into the server route (the boundary the plan asked for).

### Featured article body and the FAQ gap

The featured article injects `FAQPage` JSON-LD for the four `BUILD_CIBIL_FAQS` Q&A pairs, but the body renders no FAQ section — only the "Common myths busted" callout, which isn't Q&A and overlaps only ~2 of the 4 questions (confirmed). Google's FAQ rich-result guidance requires the Q&A to be visibly present on the page, so emitting FAQ structured data a reader can't see is a policy mismatch that risks invalidated rich results or a manual action; either render a visible FAQ `<section>` answering all four questions or drop the `FAQPage` JSON-LD so the structured data matches what's shown. The HowTo JSON-LD doesn't share this problem — its steps mirror the visible StepCards one-to-one. Motion is deliberately restrained on the article: GSAP `ScrollTrigger` reveals are scoped to `.cibil-reveal` section blocks with no per-paragraph animation, per the plan's readability-first rule.

### Cover asset and OG

The featured cover path (`/images/blog/build-cibil-score-cover.svg`) is fed to `buildMetadata` as `ogImage`, so the featured post's `og:image` resolves to an SVG, which the X/Twitter, Facebook, and LinkedIn crawlers won't render — its share card shows no preview while the three placeholder posts (real `.webp` covers) render fine (likely). The same SVG, shown on-page via `<img>` in `BlogCover`/`BlogHero`, can't reference the page's `@font-face`, so its text falls back to default typefaces (likely). Export the cover as a raster PNG/JPG/WebP at 1200×630 so the fonts bake in and the OG image works; the SVG can be kept as a source file.

### Accessibility and semantics

The post page uses `<article>`/`<header>`/`<nav>`/`<section>` landmarks, covers carry `alt={post.title}` (or `role="img"` + `aria-label` for the gradient fallback and the timeline SVG), the comparison table is a real `<table>` with `<th scope="col">`, and the `BlogCard`/back-to-blog/`ShareBar` controls all carry the design-system `focus-visible` ring. The one gap (confirmed) is the `AuthorBio` "Connect on LinkedIn" link, which uses only `underline` + `hover:text-accent-purple` and the browser's default focus indicator rather than that ring. Contrast wasn't flagged: body copy is `ink`/`ink-muted` on cream or white, and the accent-pill combinations mirror the existing index (a pre-existing pattern, out of scope here).

### SEO, JSON-LD, and the sitemap

The index and post pages reuse `lib/seo` as written, with the per-post `generateBlogPosting` path correctly fixed to `/blog/<slug>` (it was `/blog` before) and the cover passed as `image` when present; `generateWebPage` carries breadcrumbs (Home→Blog on the index, Home→Blog→Post on the article). The sitemap is extended additively — one entry per slug (`priority: 0.6`, `changeFrequency: 'monthly'`, `lastModified: post.date`, cover in `images`) after the existing `/blog` row, touching nothing else.

### Scope, dependencies, and verification evidence

The diff stays within the allowed surface — `app/blog/page.tsx` (modified), the new `app/blog/[slug]/page.tsx`, files under `components/blog/`, `lib/blog/posts.ts`, `public/images/blog/`, and the additive `app/sitemap.ts` — and doesn't touch `app/layout.tsx`, the global nav, `package.json`, or any other page (confirmed against the commit's file list). No new dependencies were added (`package.json` is unchanged in the diff). Verification evidence in the commit message is complete: `npx tsc --noEmit` exits 0, `npm run build` succeeds with all four slugs prerendered, and lint goes 81→77 with only the pre-existing `@next/next/no-img-element` `<img>` warning remaining — no new lint errors. The build/prerendered-HTML proof the author cites is the right authority given the noted dev-server instability, so the suites weren't re-run.

</details>

<details>
<summary>File map</summary>

- `lib/blog/posts.ts` — typed blog data module: `Post`/`BlogAuthor` types, the four-entry `POSTS` catalogue with real authors, slug/related helpers, and shared FAQ/step/author-bio tables. (new)
- `app/blog/page.tsx` — revamped index: hero + full-width featured `BlogCard` + responsive grid, `POSTS` import, WebPage + per-post BlogPosting JSON-LD with corrected paths, `FinalCTA`/`FooterShutter` kept. (modified)
- `app/blog/[slug]/page.tsx` — dynamic article route: `generateStaticParams`, article `generateMetadata`, WebPage/BlogPosting JSON-LD (+HowTo/FAQPage for featured), bodyKey registry, back-to-blog nav, `RelatedPosts`. (new)
- `app/sitemap.ts` — additive per-slug entries after `/blog`. (modified)
- `components/blog/BlogCard.tsx` — article card, reused on index and in RelatedPosts; `featured` variant; `motion` whileInView stagger. (new)
- `components/blog/BlogHero.tsx` — article `<header>`: pill, accent-underline title, dek, author/meta row, inline ShareBar, framed cover; GSAP entrance. (new)
- `components/blog/BlogCover.tsx` — cover visual: `<img>` or branded CSS-gradient fallback; reused by card and hero. (new)
- `components/blog/ShareBar.tsx` — copy-link button + X/LinkedIn/WhatsApp links; inline and block variants; focus rings. (new)
- `components/blog/RelatedPosts.tsx` — "Keep reading" section + grid of non-featured `BlogCard`s. (new)
- `components/blog/PullQuote.tsx` — brutalist pull quote with accent rail and editorial-italic text. (new)
- `components/blog/Callout.tsx` — tip/warning/note callout with coloured rail and lucide icon. (new)
- `components/blog/StepCard.tsx` — numbered step card for the HowTo sequence. (new)
- `components/blog/KeyTakeaways.tsx` — lime summary checklist block. (new)
- `components/blog/AuthorBio.tsx` — author bio card with initials avatar, role pill, bio, LinkedIn link. (new)
- `components/blog/posts/BuildCibilScorePost.tsx` — featured article body: drop-cap intro, pull quote, factor callout, 5 step cards, comparison table, score-growth SVG, myths callout, takeaways, author bio; GSAP section reveals. (new)
- `components/blog/posts/GenericPost.tsx` — on-brand article shell for the three placeholder posts. (new)
- `public/images/blog/build-cibil-score-cover.svg` — featured cover (SVG; see cover finding). (new)

Full diff: `git -C "d:/Vibe projects/CredBud" diff 7be2219..5975be1` (or `git show 5975be1`).

</details>
