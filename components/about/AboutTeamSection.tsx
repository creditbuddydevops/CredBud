'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SplitText } from '@/components/landing/shared/SplitText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const AboutTeamSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Refs for the 3D card tilt + holographic shine effect
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const shineRef    = useRef<HTMLDivElement>(null);
  const glintRef    = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.founder-image-block',
        { x: -80, opacity: 0, scale: 0.92 },
        {
          x: 0, opacity: 1, scale: 1,
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }
        }
      );

      gsap.fromTo('.founder-text-block',
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.9, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }
        }
      );

      gsap.fromTo('.founder-stat-pill',
        { y: 30, opacity: 0, scale: 0.85 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.1, duration: 0.7, ease: 'back.out(1.8)',
          scrollTrigger: { trigger: '.founder-stats-row', start: 'top 90%' }
        }
      );
    }, containerRef);

    // ── 3D tilt + holographic shine ──────────────────────────────────────
    const card = cardWrapRef.current;
    const shine = shineRef.current;
    const glint = glintRef.current;
    if (!card) return () => ctx.revert();

    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const rect = card.getBoundingClientRect();

        // Cursor position as 0…1 within the card
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top)  / rect.height;

        // Map to -1…+1 (centre = 0)
        const nx = px * 2 - 1;
        const ny = py * 2 - 1;

        // Tilt: moving cursor RIGHT tilts the card right (+rotateY),
        // moving cursor UP tilts the card back (+rotateX).
        // Max ±12 deg — enough to feel 3D without being vertiginous.
        gsap.to(card, {
          rotateY:  nx * 12,
          rotateX: -ny * 12,
          scale: 1.03,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        // White gloss sweep — a large soft radial at cursor position
        if (shine) {
          shine.style.background = `radial-gradient(ellipse 80% 60% at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.18) 0%, transparent 70%)`;
          shine.style.opacity = '1';
        }
        // Tight specular hotspot — small, bright, directly under cursor
        if (glint) {
          glint.style.background = `radial-gradient(circle 120px at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)`;
          glint.style.opacity = '1';
        }
      });
    };

    const handleLeave = () => {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      gsap.to(card, {
        rotateY: 0, rotateX: 0, scale: 1,
        duration: 0.75, ease: 'power3.out', overwrite: 'auto',
      });
      if (shine) gsap.to(shine, { opacity: 0, duration: 0.55, ease: 'power2.out' });
      if (glint) gsap.to(glint, { opacity: 0, duration: 0.55, ease: 'power2.out' });
    };

    card.addEventListener('mousemove', handleMove, { passive: true });
    card.addEventListener('mouseleave', handleLeave);

    return () => {
      ctx.revert();
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-28 px-6 md:px-12 bg-bg-primary w-full max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center max-w-3xl mx-auto space-y-3"
      >
        <span className="font-jetbrains text-ink-muted text-xs block">// leadership</span>
        <h2 className="font-bricolage text-4xl md:text-6xl font-extrabold tracking-tight text-ink">
          <SplitText
            text="The people behind CreditBuddy."
            splitType="words"
            variant="blur"
            delay={50}
            textAlign="center"
            tag="span"
          />
        </h2>
      </motion.div>

      {/* Founder Spotlight — Image Left, Text Right */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-stretch">

        {/* Left — Image Block */}
        <div className="founder-image-block lg:w-[45%] flex-shrink-0">
          {/*
            Perspective sits on THIS outer div — the rotating element must be
            a CHILD of the perspective container, never the same element.
            That's what makes the tilt feel like a physical card in space
            rather than spinning on its own axis.
          */}
          <div style={{ perspective: '1000px' }}>
            <div
              ref={cardWrapRef}
              className="relative w-full"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                cursor: 'pointer',
              }}
            >
              {/* ── Card shell ── */}
              <div
                className="relative w-full aspect-[3/4] max-h-[580px] rounded-3xl overflow-hidden brutal-border"
                style={{ boxShadow: '8px 8px 0px #14100F' }}
              >
                {/* Founder photo */}
                <img
                  src="/images/debasish-mallick.webp"
                  alt="Debasish Mallick — Founder & CEO of CreditBuddy"
                  className="absolute inset-0 w-full h-full object-cover object-top select-none"
                  draggable={false}
                />

                {/* ── White shine sweep — follows cursor like a trump card gloss ── */}
                <div
                  ref={shineRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                  style={{ opacity: 0 }}
                />

                {/* ── Tight specular hotspot ── */}
                <div
                  ref={glintRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                  style={{ opacity: 0 }}
                />

                {/* Corner accent dots */}
                <div className="absolute top-5 left-5 w-3 h-3 rounded-full bg-accent-lime border-2 border-ink z-10" />
                <div className="absolute top-5 right-5 w-3 h-3 rounded-full bg-accent-purple border-2 border-ink z-10" />
                <div className="absolute bottom-5 left-5 w-3 h-3 rounded-full bg-accent-gold border-2 border-ink z-10" />
                <div className="absolute bottom-5 right-5 w-3 h-3 rounded-full bg-accent-coral border-2 border-ink z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Right — Text Block */}
        <div className="founder-text-block lg:w-[55%] flex flex-col justify-center gap-6 md:gap-8">

          {/* Role Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="brutal-pill bg-accent-lime px-4 py-1.5 font-jetbrains text-xs font-bold text-ink">
              Founder &amp; CEO
            </span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-jetbrains text-xs font-bold text-ink inline-flex items-center gap-1 hover:text-accent-purple transition-colors underline underline-offset-4"
            >
              LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Name */}
          <div>
            <h3 className="font-bricolage font-extrabold text-3xl md:text-5xl text-ink leading-tight tracking-tight">
              Debasish Mallick
            </h3>
            <p className="font-jetbrains text-xs text-ink-muted uppercase tracking-widest mt-2">
              // building credit from scratch for Indian college students
            </p>
          </div>

          {/* Bio */}
          <p className="font-jakarta text-base md:text-lg text-ink/80 leading-relaxed max-w-xl">
            A student founder building CreditBuddy to solve real financial challenges students face.
            Combining technology and insight to create a system where students can borrow, earn, and
            grow with confidence. On a mission to make financial access a right, not a privilege, for
            every college student in India.
          </p>

          {/* Stat Pills */}
          <div className="founder-stats-row flex flex-wrap gap-3 pt-2">
            {[
              { label: 'Mission', value: 'Student-First Finance' },
              { label: 'Focus', value: 'Fintech × Campus' },
              { label: 'Vision', value: '35M+ Students' },
            ].map((stat, i) => (
              <div
                key={i}
                className="founder-stat-pill brutal-card bg-white px-5 py-3 flex flex-col"
                style={{ boxShadow: '4px 4px 0px #14100F' }}
              >
                <span className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-widest">{stat.label}</span>
                <span className="font-bricolage font-extrabold text-sm text-ink mt-0.5">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="mt-2 border-l-4 border-accent-purple pl-5 py-2">
            <p className="font-bricolage text-lg md:text-xl font-extrabold text-ink/90 italic leading-snug">
              &ldquo;The financial system was never designed for students. So we&apos;re building one that is.&rdquo;
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
