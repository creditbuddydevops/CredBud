'use client';

/**
 * @fileoverview NavSidebar — Full-screen sidebar navigation.
 *
 * Layout:
 *  - Fixed top-left: logo circle
 *  - Fixed top-right: hamburger trigger circle
 *  - On open: full-height right-side drawer with rainbow accent stripe,
 *    numbered nav links, and a social / copyright footer.
 *
 * Behaviours:
 *  - Buttons are hidden during loading (intro sequence) and appear once
 *    the hero section has fully loaded (after ~5 s).
 *  - When scrolling DOWN past the hero, buttons slide up and hide.
 *  - When scrolling UP, buttons reappear.
 *  - On mobile the sidebar covers the full viewport width.
 */

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

// ─── Nav Data ─────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { num: '01', label: 'Home', href: '/', color: '#C8FF3D' },
  { num: '02', label: 'How It Works', href: '/how-it-works', color: '#7B5CFF' },
  { num: '03', label: 'Students', href: '/students', color: '#FF5A3C' },
  { num: '04', label: 'Ambassadors', href: '/ambassador', color: '#35C8FF' },
  { num: '05', label: 'Blog', href: '/blog', color: '#FFD23F' },
  { num: '06', label: 'About', href: '/about', color: '#C8FF3D' },
  { num: '07', label: 'Contact', href: '/contact', color: '#7B5CFF' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const NavSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // ── Nav button visibility ───────────────────────────────────────────────
  // Hidden during intro sequence; revealed after hero loads (~5 s).
  // Then hide on scroll-down, show on scroll-up.
  const [buttonsReady, setButtonsReady] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // On the home page, wait for the intro sequence to finish before
    // showing nav buttons. On all other pages, show immediately.
    const isHome = window.location.pathname === '/';

    if (!isHome) {
      // Non-home pages: no intro, show buttons right away
      setButtonsReady(true);
      return;
    }

    // Home page: wait for the intro:done event dispatched by IntroSequence.
    // Also keep a fallback timer in case the event never fires.
    const onIntroDone = () => setButtonsReady(true);
    window.addEventListener('intro:done', onIntroDone);
    const fallback = setTimeout(() => setButtonsReady(true), 6000);

    return () => {
      window.removeEventListener('intro:done', onIntroDone);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!buttonsReady) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 60) {
        // Near top — always visible
        setButtonsVisible(true);
      } else if (delta > 4) {
        // Scrolling DOWN — hide
        setButtonsVisible(false);
      } else if (delta < -4) {
        // Scrolling UP — show
        setButtonsVisible(true);
      }

      lastScrollY.current = currentY;

      // Safety: if user stops scrolling, reappear
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setButtonsVisible(true), 800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [buttonsReady]);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const line3 = useRef<HTMLSpanElement>(null);

  // ── Open ──────────────────────────────────────────────────────────────────

  const open = () => {
    setIsOpen(true);

    // Panel slides in
    gsap.fromTo(sidebarRef.current,
      { x: '100%' },
      { x: '0%', duration: 0.6, ease: 'power4.out' }
    );

    // Overlay fades in
    gsap.to(overlayRef.current, {
      opacity: 1, pointerEvents: 'auto', duration: 0.35,
    });

    // Rainbow stripe grows down
    gsap.fromTo(accentRef.current,
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 1, duration: 0.75, ease: 'power3.out', delay: 0.15 }
    );

    // Nav items stagger in
    gsap.fromTo('.nsl-item',
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.055, duration: 0.5, ease: 'power3.out', delay: 0.2 }
    );

    // Footer fades up
    gsap.fromTo('.nsl-footer',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', delay: 0.58 }
    );

    // Hamburger hides when sidebar opens — no morph needed
  };

  // ── Close ─────────────────────────────────────────────────────────────────

  const close = () => {
    gsap.to(sidebarRef.current, {
      x: '100%', duration: 0.5, ease: 'power4.in',
      onComplete: () => setIsOpen(false),
    });
    gsap.to(overlayRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.28 });

    // ✕ → hamburger morph — reset lines in case they were mid-animation
    gsap.to(line1.current, { rotate: 0, y: 0, duration: 0.22, ease: 'power3.inOut' });
    gsap.to(line2.current, { opacity: 1, scaleX: 1, duration: 0.18 });
    gsap.to(line3.current, { rotate: 0, y: 0, duration: 0.22, ease: 'power3.inOut' });
  };

  const toggle = () => (isOpen ? close() : open());

  // Combined visibility: ready + visible (or sidebar is open — keep buttons accessible)
  const showButtons = buttonsReady && (buttonsVisible || isOpen);

  return (
    <>
      {/* ── Top-Left Logo Circle ─────────────────────────────────── */}
      {/* When the sidebar opens, drop the logo to the panel's z-index so the
          panel (rendered later in the DOM) paints on top of it. On mobile the
          full-width drawer then covers the logo; on close it reappears. Desktop
          is unaffected (the capped 560px panel never overlaps the top-left). */}
      <Link
        href="/"
        aria-label="CreditBuddy Home"
        className={`fixed top-5 left-6 ${isOpen ? 'z-[9999]' : 'z-[10001]'} w-[52px] h-[52px] rounded-full bg-white brutal-border brutal-shadow-sm flex items-center justify-center hover:scale-105 active:scale-95 select-none`}
        style={{
          opacity: showButtons ? 1 : 0,
          transform: showButtons ? 'translateY(0)' : 'translateY(-20px)',
          pointerEvents: showButtons ? 'auto' : 'none',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        <img
          src="/images/creditbuddy-logo.webp"
          alt="CreditBuddy"
          className="w-8 h-8 object-contain"
        />
      </Link>

      {/* ── Top-Right Hamburger Trigger ───────────────────────────── */}
      <button
        id="nav-menu-trigger"
        onClick={toggle}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        suppressHydrationWarning
        className="fixed top-5 right-6 z-[10001] w-[52px] h-[52px] rounded-full bg-white brutal-border brutal-shadow-sm flex flex-col items-center justify-center gap-[5px] hover:scale-105 active:scale-95 cursor-pointer"
        style={{
          opacity: showButtons && !isOpen ? 1 : 0,
          transform: showButtons && !isOpen ? 'translateY(0)' : 'translateY(-20px)',
          pointerEvents: showButtons && !isOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      >
        <span ref={line1} className="block w-[18px] h-[2px] bg-ink rounded-full origin-center" />
        <span ref={line2} className="block w-[18px] h-[2px] bg-ink rounded-full origin-center" />
        <span ref={line3} className="block w-[18px] h-[2px] bg-ink rounded-full origin-center" />
      </button>

      {/* ── Backdrop ─────────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        onClick={close}
        className="fixed inset-0 z-[9998] bg-ink/30 backdrop-blur-sm"
        style={{ opacity: 0, pointerEvents: 'none' }}
      />

      {/* ── Sidebar Panel ────────────────────────────────────────── */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-screen z-[9999] flex"
        style={{
          transform: 'translateX(100%)',
          // Full-width on mobile, capped panel on larger screens
          width: 'min(560px, 100vw)',
          visibility: isOpen ? 'visible' : 'hidden',
        }}
      >
        {/* Rainbow accent stripe */}
        <div
          ref={accentRef}
          className="w-[3px] h-full flex-shrink-0"
          style={{
            background: 'linear-gradient(to bottom, #C8FF3D, #7B5CFF, #FF5A3C, #35C8FF, #FFD23F)',
            transform: 'scaleY(0)',
          }}
        />

        {/* Panel body */}
        <div className="flex-1 bg-bg-primary border-l-[1.6px] border-ink flex flex-col h-full overflow-y-auto">

          {/* Header */}
          <div className="flex items-center justify-between px-8 pt-8 pb-5">
            <div className="flex items-center gap-3">
              <img
                src="/images/creditbuddy-logo.webp"
                alt="CreditBuddy Logo"
                className="h-9 w-auto object-contain"
              />
              <img
                src="/images/creditbuddy-text-logo.webp"
                alt="CreditBuddy"
                className="h-6 w-auto object-contain"
              />
            </div>

            {/* Close button — large circle matching screenshot */}
            <button
              onClick={close}
              aria-label="Close navigation"
              className="w-11 h-11 rounded-full bg-white brutal-border brutal-shadow-sm flex items-center justify-center font-bold text-ink text-base hover:bg-accent-lime transition-colors duration-200 cursor-pointer flex-shrink-0"
            >
              ✕
            </button>
          </div>

          {/* Divider */}
          <div className="mx-8 h-[1.4px] bg-ink/10 mb-2" />

          {/* Nav links */}
          <nav className="flex-1 px-8 py-4 flex flex-col justify-center gap-0" aria-label="Primary navigation">
            {NAV_LINKS.map((link, i) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname?.startsWith(link.href));

              return (
                <Link
                  key={i}
                  href={link.href}
                  onClick={close}
                  className={`nsl-item group relative flex items-center justify-between py-[14px] border-b border-ink/10 hover:border-ink transition-all duration-300 opacity-0 ${isActive ? 'border-ink/30' : ''
                    }`}
                >
                  {/* Hover / active background */}
                  <div
                    className={`absolute inset-y-0 -inset-x-3 rounded-xl transition-colors duration-300 ${isActive ? 'bg-accent-lime/25' : 'bg-ink/0 group-hover:bg-accent-lime/15'
                      }`}
                  />

                  <div className="relative flex items-center gap-5">
                    {/* Number */}
                    <span
                      className="font-jetbrains text-[11px] font-bold tracking-widest w-6 flex-shrink-0"
                      style={{ color: link.color }}
                    >
                      {link.num}
                    </span>

                    {/* Label */}
                    <span
                      className={`font-bricolage font-extrabold text-[1.75rem] leading-none tracking-tight transition-colors duration-300 ${isActive ? 'text-ink' : 'text-ink/65 group-hover:text-ink'
                        }`}
                    >
                      {link.label}
                    </span>
                  </div>

                  {/* Arrow circle */}
                  <span
                    className={`relative w-8 h-8 rounded-full border border-ink flex items-center justify-center transition-all duration-300 text-ink text-sm flex-shrink-0 ${isActive
                      ? 'bg-accent-lime'
                      : 'bg-white group-hover:bg-accent-lime group-hover:translate-x-0.5'
                      }`}
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="nsl-footer px-8 pt-2 pb-8 opacity-0">
            <div className="h-[1.4px] bg-ink/10 mb-5" />

            <p className="font-jakarta text-xs text-ink-muted leading-relaxed mb-5">
              India&apos;s student-first financial ecosystem.
              <br />Built for campus. Built for you.
            </p>

            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com/creditbuddy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-ink/40 hover:text-accent-purple transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com/creditbuddy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="text-ink/40 hover:text-accent-purple transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.985l4.26 5.633 4.749-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/creditbuddy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-ink/40 hover:text-accent-purple transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M7 10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="7" cy="7.5" r="1" fill="currentColor" />
                  <path d="M11 17v-4a2 2 0 0 1 4 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M11 10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </a>
              <span className="ml-auto font-jetbrains text-[10px] text-ink/30">
                © 2026 CreditBuddy
              </span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
