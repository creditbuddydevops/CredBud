'use client';

import React, { useRef, useEffect } from 'react';
import { SplitText } from '@/components/landing/shared/SplitText';
import gsap from 'gsap';

export const AmbassadorHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.amb-hero-badge',
        { y: -40, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.8)', delay: 0.2 }
      );
      gsap.fromTo('.amb-hero-cta',
        { y: 50, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'back.out(2)', delay: 0.6 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-16 md:pt-20 pb-40 md:pb-44 px-6 md:px-12 bg-bg-primary text-ink border-b-[1.6px] border-ink overflow-hidden">
      {/* Background Campus Illustration Image */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <img
          src="/ambassador-hero-bg.webp"
          alt="Campus ambassador background"
          className="w-full h-full object-cover object-[25%_top] md:object-top opacity-100"
        />
      </div>

      <div className="max-w-7xl mx-auto relative flex flex-col items-center text-center z-10">
        
        <span className="amb-hero-badge font-jetbrains text-xs font-normal brutal-pill bg-accent-gold px-4 py-1.5 mb-6 inline-block">
          // lead on your campus
        </span>
        
        <h1 className="font-bricolage text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6 max-w-4xl">
          <SplitText
            text="Become a Campus Ambassador"
            splitType="chars"
            variant="flip"
            delay={25}
            duration={0.5}
            tag="span"
          />
        </h1>
        
        <p className="font-jakarta text-ink-muted text-lg md:text-xl max-w-2xl leading-relaxed mb-8 font-semibold">
          <SplitText
            text="Lead financial empowerment at your college. Earn up to ₹15,000/month, build leadership credentials, and unlock exclusive perks."
            splitType="words"
            variant="blur"
            delay={40}
            duration={0.5}
            tag="span"
          />
        </p>

        <div className="amb-hero-cta flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://forms.gle/MpxWvUywPedpbm9i9"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-ink text-bg-primary font-bricolage font-bold text-base brutal-pill brutal-shadow-purple hover:scale-105 transition-transform cursor-pointer inline-block"
          >
            Apply Now ↗
          </a>
        </div>

      </div>
    </section>
  );
};
