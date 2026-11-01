'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const screenInnerRef = useRef<HTMLDivElement>(null);
  const [textHovered, setTextHovered] = useState(false);

  useEffect(() => {
    // 1. Mouse movement tilt & bulge effect (Fisheye lens simulation for the whole section)
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Normalize coordinates (-1 to 1)
        const normX = x / (rect.width / 2);
        const normY = y / (rect.height / 2);

        // Determine rotation angles (barrel projection distortion)
        const maxRot = 10; // Maximum tilt rotation degrees
        const tiltX = -normY * maxRot;
        const tiltY = normX * maxRot;

        gsap.to(screenInnerRef.current, {
          rotateX: tiltX,
          rotateY: tiltY,
          scale: 1.01,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    const handleMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      gsap.to(screenInnerRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.85,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    // 2. Entrance Animations with GSAP Context
    const ctx = gsap.context(() => {
      // 3D Twisted Letter Entrance
      gsap.fromTo(
        '.char-node',
        {
          opacity: 0,
          y: 90,
          rotateX: -140,
          rotateY: 180,
          scale: 0.2,
          skewX: 45,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          skewX: 0,
          duration: 1.8,
          stagger: 0.025,
          ease: 'elastic.out(1, 0.75)',
          delay: 0.35,
        }
      );

      // Reveal other UI elements inside TV Screen
      gsap.fromTo(
        '.hero-reveal-delayed',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 1.1,
        }
      );
    }, containerRef);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      ctx.revert();
    };
  }, []);

  // Helper function to split letters and wrap them for twist animations
  const renderAnimatedText = (text: string, colorClass: string) => {
    return text.split(' ').map((word, wordIdx, arr) => (
      <span key={wordIdx} className={`inline-block whitespace-nowrap ${wordIdx < arr.length - 1 ? 'mr-3 md:mr-6' : ''} pointer-events-none`}>
        {word.split('').map((char, charIdx) => (
          <span
            key={charIdx}
            className={`char-node inline-block transform origin-center font-bricolage font-extrabold uppercase ${colorClass} pointer-events-none`}
            style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
          >
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-bg-primary flex flex-col items-center justify-center overflow-hidden"
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      {/* Warm glow blobs */}
      <div className="absolute w-[320px] h-[320px] -left-24 -top-24 bg-accent-cyan/40 rounded-full blur-[64px] pointer-events-none" />
      <div className="absolute w-[384px] h-[384px] right-[-50px] top-[160px] bg-accent-coral/30 rounded-full blur-[64px] pointer-events-none" />
      <div className="absolute w-[256px] h-[256px] left-[40%] bottom-[-80px] bg-accent-purple/20 rounded-full blur-[64px] pointer-events-none" />

      {/* Full-screen Inner Content that bulges/tilts */}
      <div
        ref={screenInnerRef}
        className="w-full h-full relative flex flex-col items-center justify-center p-6 md:p-12 lg:px-16 z-20 select-none text-center pt-24 md:pt-28 pb-20 md:pb-32"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Main Text Content Column — nudged up a bit via negative top margin so
            the hero copy sits higher in the viewport. Tune the values to adjust. */}
        <div className="flex flex-col items-center justify-center max-w-5xl z-30 w-full -mt-4 sm:-mt-8 md:-mt-12" style={{ transform: 'translateZ(80px)' }}>
          
          {/* Eyebrow Badge */}
          <div 
            className="hero-reveal-delayed inline-flex items-center space-x-2 bg-accent-lime brutal-pill px-4 py-2 mb-4 md:mb-6 z-30"
            style={{ transform: 'translateZ(20px)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <circle cx="8" cy="8" r="6" stroke="#14100F" strokeWidth="1.6"/>
              <path d="M5 8L7 10L11 6" stroke="#14100F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-jetbrains text-xs md:text-sm font-normal text-ink">
              money moves for students
            </span>
          </div>

          {/* Centered Heading Content */}
          <h1 
            onMouseEnter={() => setTextHovered(true)}
            onMouseLeave={() => setTextHovered(false)}
            className="group relative flex flex-col items-center justify-center leading-[0.92] tracking-tighter cursor-pointer w-full max-w-5xl select-none pointer-events-auto mb-3"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {/* Row 1: Broke today, / BORROW • EARN */}
            <div 
              className="relative h-[0.95em] w-full flex items-center justify-center mb-0 text-4xl sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.2rem] font-extrabold leading-none pointer-events-none"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Default Text */}
              <span 
                className="absolute inset-0 flex items-center justify-center transform pointer-events-none"
                style={{
                  transform: textHovered ? 'translateY(-100%) rotateX(90deg)' : 'translateY(0) rotateX(0deg)',
                  opacity: textHovered ? 0 : 1,
                  backfaceVisibility: 'hidden',
                  transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {renderAnimatedText("BROKE TODAY,", "text-ink")}
              </span>
              {/* Hover Text */}
              <span 
                className="absolute inset-0 flex items-center justify-center transform pointer-events-none"
                style={{
                  transform: textHovered ? 'translateY(0) rotateX(0deg)' : 'translateY(100%) rotateX(-90deg)',
                  opacity: textHovered ? 1 : 0,
                  backfaceVisibility: 'hidden',
                  transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {renderAnimatedText("BORROW • EARN", "text-accent-purple")}
              </span>
            </div>

            {/* Row 2: boss tomorrow. / LEARN */}
            <div 
              className="relative h-[0.95em] w-full flex items-center justify-center text-4xl sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.2rem] font-extrabold leading-none pointer-events-none"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Default Text */}
              <span 
                className="absolute inset-0 flex items-center justify-center transform pointer-events-none"
                style={{
                  transform: textHovered ? 'translateY(-100%) rotateX(90deg)' : 'translateY(0) rotateX(0deg)',
                  opacity: textHovered ? 0 : 1,
                  backfaceVisibility: 'hidden',
                  transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {renderAnimatedText("BOSS TOMORROW.", "text-ink")}
              </span>
              {/* Hover Text */}
              <span 
                className="absolute inset-0 flex items-center justify-center transform pointer-events-none"
                style={{
                  transform: textHovered ? 'translateY(0) rotateX(0deg)' : 'translateY(100%) rotateX(-90deg)',
                  opacity: textHovered ? 1 : 0,
                  backfaceVisibility: 'hidden',
                  transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {renderAnimatedText("LEARN", "text-accent-purple")}
              </span>
            </div>
          </h1>

          {/* Purple underline bar for "tomorrow." */}
          <div className="hero-reveal-delayed w-full max-w-xl h-[6px] md:h-[9px] bg-accent-purple rounded-full -mt-1 md:-mt-2" style={{ transform: 'rotate(-0.5deg)' }} />

          {/* Comic Style Scroll Down Indicator */}
          <div 
            className="hero-reveal-delayed mt-8 md:mt-10 relative group cursor-pointer"
            style={{ transform: 'translateZ(30px)' }}
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight * 0.85,
                behavior: 'smooth'
              });
            }}
          >
            <div className="inline-flex items-center gap-2.5 bg-accent-gold brutal-pill brutal-shadow-sm px-5 py-2.5 transform -rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 animate-bounce">
              <span className="font-bricolage font-extrabold text-xs md:text-sm uppercase tracking-widest text-ink">
                Scroll down
              </span>
              <div className="w-5 h-5 rounded-full bg-ink flex items-center justify-center text-bg-primary">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3V13M8 13L4 9M8 13L12 9" stroke="#FBF7EF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pinned Image at the bottom of the Hero Section */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none z-10">
        <img
          src="/footer-elements.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-contain object-bottom"
        />
      </div>
    </section>
  );
};
