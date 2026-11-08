'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, Observer);

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Drive Lenis via GSAP ticker so both are in sync on one rAF loop
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // One-time refresh after Lenis boots so ScrollTrigger measures correctly
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        smoothWheel: true,
        duration: 1.2,
        // Reduce touch multiplier on mobile so flings don't overshoot
        touchMultiplier: 1.5,
        // Infinite scroll inertia causes jank on mobile — cap it
        infinite: false,
      }}
    >
      {/* @ts-expect-error Type mismatch between React 18 and 19 */}
      {children}
    </ReactLenis>
  );
};
