'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const StudentsLearnCoinsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.learn-banner-card',
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'back.out(1.6)',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-24 px-6 md:px-12 bg-bg-primary w-full max-w-7xl mx-auto">
      <div className="learn-banner-card bg-accent-lime brutal-card p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8" style={{ boxShadow: '8px 8px 0px #14100F' }}>
        <div className="max-w-xl">
          <span className="font-jetbrains text-xs font-bold text-ink bg-white px-3 py-1 rounded-full brutal-border inline-block mb-4">
            // learn & earn rewards
          </span>
          <h2 className="font-bricolage text-3xl md:text-5xl font-extrabold text-ink mb-4">
            Get paid to learn financial skills.
          </h2>
          <p className="font-jakarta text-ink-muted text-sm md:text-base leading-relaxed">
            Complete 3-minute bite-sized lessons on budgeting, taxes, and investments to earn Buddy Coins redeemable for Amazon vouchers and fee discounts.
          </p>
        </div>
        <a
          href="https://forms.gle/j8YLkrZR8htQ1W8W9"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-ink text-bg-primary font-bricolage font-bold text-base brutal-pill brutal-shadow-purple transition-transform hover:scale-105 cursor-pointer whitespace-nowrap inline-block"
        >
          Apply Now ↗
        </a>
      </div>
    </section>
  );
};
