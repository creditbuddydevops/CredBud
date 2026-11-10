'use client';

import React, { useRef, useEffect } from 'react';
import { KeywordHighlight } from '../shared/KeywordHighlight';
import gsap from 'gsap';

export const StackPanelCampusRewards = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Scroll entrance animation
      gsap.fromTo('.scrapbook-item', 
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Mobile View - Clean card without floating stickers/PNGs */}
      <div className="block md:hidden w-[92%] mx-auto my-4">
        <div className="bg-white border-2 border-[#14100F] shadow-[4px_4px_0px_0px_#14100F] rounded-[28px] p-6 text-[#14100F] relative overflow-hidden">
          {/* Top Tag Pill */}
          <div className="inline-block bg-[#FF5A3C] text-white border-2 border-[#14100F] rounded-full px-4 py-1.5 font-jetbrains text-xs font-bold uppercase tracking-wider mb-4">
            // 05. CAMPUS REWARDS
          </div>

          {/* Title */}
          <h2 className="font-bricolage font-extrabold text-3xl sm:text-4xl text-[#14100F] leading-[1.08] tracking-tight mb-3">
            Rewards built for{' '}
            <span className="relative inline-block after:absolute after:bottom-[3px] after:left-0 after:right-0 after:h-[6px] after:bg-[#7B5CFF] after:-z-0 z-10">
              campus life.
            </span>
          </h2>

          {/* Subtext */}
          <p className="font-jakarta text-sm text-[#14100F]/80 leading-relaxed font-normal">
            Get cashbacks and discounts at the brands you actually care about. From late-night food delivery to flight tickets home.
          </p>
        </div>
      </div>

      {/* Desktop View - Sticky Panel with floating stickers */}
      <div className="hidden md:flex sticky top-[5vh] md:top-[4vh] h-[90vh] md:h-[92vh] w-full z-[14] items-center justify-center my-4">
        <div ref={containerRef} className="w-[95%] md:w-[96%] h-full bg-bg-secondary flex items-center p-8 brutal-card overflow-hidden relative bg-elements">
          
          {/* Background Sticker Elements (Hidden on Mobile) */}
          <div className="hidden md:flex absolute inset-0 justify-center items-center pointer-events-none">
            {/* Sticker 1: Coffee Cup (Top Left) */}
            <div className="scrapbook-item absolute left-[2%] md:left-[4%] top-[4%] md:top-[6%] w-48 md:w-64 pointer-events-auto cursor-pointer z-20">
              <div className="animate-sticker-1 drop-shadow-2xl">
                <img 
                  src="/images/sticker1.webp" 
                  alt="Coffee Sticker" 
                  className="w-full h-auto object-contain pointer-events-none transition-transform duration-300 hover:scale-110" 
                />
              </div>
            </div>

            {/* Sticker 2: Travel Tickets (Top Right) */}
            <div className="scrapbook-item absolute right-[2%] md:right-[4%] top-[4%] md:top-[6%] w-48 md:w-64 pointer-events-auto cursor-pointer z-20">
              <div className="animate-sticker-2 drop-shadow-2xl">
                <img 
                  src="/images/sticker2.webp" 
                  alt="Flight Tickets Sticker" 
                  className="w-full h-auto object-contain pointer-events-none transition-transform duration-300 hover:scale-110" 
                />
              </div>
            </div>

            {/* Sticker 3: Gold Coins (Bottom Left) */}
            <div className="scrapbook-item absolute left-[3%] md:left-[5%] bottom-[4%] md:bottom-[6%] w-48 md:w-64 pointer-events-auto cursor-pointer z-20">
              <div className="animate-sticker-3 drop-shadow-2xl">
                <img 
                  src="/images/sticker3.webp" 
                  alt="Gold Coins Sticker" 
                  className="w-full h-auto object-contain pointer-events-none transition-transform duration-300 hover:scale-110" 
                />
              </div>
            </div>

            {/* Sticker 4: Campus Friends (Bottom Right) */}
            <div className="scrapbook-item absolute right-[2%] md:right-[4%] bottom-[3%] md:bottom-[5%] w-52 md:w-72 pointer-events-auto cursor-pointer z-20">
              <div className="animate-sticker-4 drop-shadow-2xl">
                <img 
                  src="/images/sticker4.webp" 
                  alt="Campus Friends Sticker" 
                  className="w-full h-auto object-contain pointer-events-none transition-transform duration-300 hover:scale-110" 
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center bg-white brutal-card p-12 shadow-2xl">
            <span className="font-jetbrains text-ink font-normal tracking-widest uppercase text-xs brutal-pill bg-accent-coral px-4 py-1.5 inline-block mb-4">
              // 05. campus rewards
            </span>
            <h2 className="font-bricolage text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Rewards built for <br/> <KeywordHighlight text="campus life" />.
            </h2>
            <p className="font-jakarta text-lg text-ink-muted max-w-xl mx-auto">
              Get cashbacks and discounts at the brands you actually care about. From late-night food delivery to flight tickets home.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};
