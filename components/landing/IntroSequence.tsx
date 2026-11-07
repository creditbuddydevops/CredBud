'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { KeywordHighlight } from './shared/KeywordHighlight';
import { useLenis } from '@studio-freight/react-lenis';

export const IntroSequence = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const act1Ref = useRef<HTMLDivElement>(null);
  const act2Ref = useRef<HTMLDivElement>(null);
  const act3Ref = useRef<HTMLDivElement>(null);
  // Hold ctx in a ref so we can revert it inside onComplete
  // (before React unmounts the nodes) to avoid removeChild errors.
  const ctxRef = useRef<gsap.Context | null>(null);
  const [done, setDone] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    // Lock scroll while intro plays
    document.body.style.overflow = 'hidden';
    lenis?.stop();

    ctxRef.current = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          lenis?.start();
          setDone(true);
          // Signal nav buttons to appear
          window.dispatchEvent(new CustomEvent('intro:done'));
        },
      });

      // Act 1 — "Are you a student?"
      tl.to(act1Ref.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .to(act1Ref.current, { opacity: 0, y: -40, duration: 0.5, ease: 'power3.in' }, '+=0.8');

      // Act 2 — "Struggling with low funds?"
      tl.to(act2Ref.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .to(act2Ref.current, { opacity: 0, y: -40, duration: 0.5, ease: 'power3.in' }, '+=0.8');

      // Act 3 — "CreditBuddy Hai Na!!"
      tl.to(act3Ref.current, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' })
        .to(act3Ref.current, { opacity: 0, scale: 1.15, duration: 0.5, ease: 'power3.in' }, '+=0.9');

      // Fade out the entire overlay
      tl.to(overlayRef.current, { opacity: 0, duration: 0.6, ease: 'power2.inOut' });
    });

    return () => {
      document.body.style.overflow = '';
      lenis?.start();
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [lenis]);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-bg-primary text-ink flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Act 1 */}
      <div ref={act1Ref} className="absolute flex flex-col items-center text-center opacity-0 translate-y-[50px]">
        <h2 className="font-bricolage text-4xl md:text-7xl tracking-tight font-extrabold">
          Are you a <KeywordHighlight text="student?" />
        </h2>
      </div>

      {/* Act 2 */}
      <div ref={act2Ref} className="absolute flex flex-col items-center text-center opacity-0 translate-y-[50px]">
        <h2 className="font-bricolage text-4xl md:text-7xl tracking-tight max-w-3xl leading-tight font-extrabold">
          Struggling with <KeywordHighlight text="low funds?" />
        </h2>
      </div>

      {/* Act 3 */}
      <div ref={act3Ref} className="absolute flex flex-col items-center text-center opacity-0 scale-90">
        <h2 className="font-bricolage text-5xl md:text-7xl tracking-tight text-accent-purple font-extrabold">
          CreditBuddy Hai Na!!
        </h2>
      </div>
    </div>
  );
};
