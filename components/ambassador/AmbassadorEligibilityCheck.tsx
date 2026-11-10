'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CRITERIA = [
  'Currently enrolled college student in India',
  'Passionate about helping peers manage money',
  'Active on campus & student groups',
  'Minimum 5 hours/week commitment',
];

export const AmbassadorEligibilityCheck = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.amb-eligibility-card',
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'back.out(1.6)',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
        }
      );
      gsap.fromTo('.criteria-item-row',
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-24 px-6 md:px-12 bg-bg-primary w-full max-w-7xl mx-auto">
      <div className="amb-eligibility-card bg-accent-gold brutal-card p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8" style={{ boxShadow: '8px 8px 0px #14100F' }}>
        <div className="max-w-xl">
          <span className="font-jetbrains text-xs font-bold text-ink bg-white px-3 py-1 rounded-full brutal-border inline-block mb-4">
            // eligibility
          </span>
          <h2 className="font-bricolage text-3xl md:text-5xl font-extrabold text-ink mb-6">
            Are you eligible?
          </h2>
          <ul className="space-y-3 font-jakarta text-ink text-sm md:text-base font-medium">
            {CRITERIA.map((c, i) => (
              <li key={i} className="criteria-item-row flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-white brutal-border flex items-center justify-center font-bold text-xs">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <a
          href="https://forms.gle/MpxWvUywPedpbm9i9"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-ink text-bg-primary font-bricolage font-bold text-base brutal-pill brutal-shadow-purple transition-transform hover:scale-105 cursor-pointer whitespace-nowrap inline-block"
        >
          Apply as Ambassador ↗
        </a>
      </div>
    </section>
  );
};
