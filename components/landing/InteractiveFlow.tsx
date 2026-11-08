'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Fingerprint, Wallet, ArrowRight, BookOpen, Award, TrendingUp } from 'lucide-react';
import { useLenis } from '@studio-freight/react-lenis';

gsap.registerPlugin(ScrollTrigger);

export const InteractiveFlow = () => {
  const lenis = useLenis();
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);

  // States
  const [isBooted, setIsBooted] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Gate all desktop-only logic — on mobile this component renders nothing
  // meaningful (hidden md:block) so we skip every effect that could interfere
  const isMobileRef = useRef(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  const progressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // 1. Lock/Unlock scrolling side effects
  useEffect(() => {
    if (isMobileRef.current) return; // mobile handled by MobileFlow
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    const preventKeys = (e: KeyboardEvent) => {
      const keys = ['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'End', 'Home'];
      if (keys.includes(e.code)) {
        e.preventDefault();
      }
    };

    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

    if (isLocked && isDesktop) {
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('keydown', preventKeys, { passive: false });
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeys);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      lenis?.start();
    }

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeys);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      lenis?.start();
    };
  }, [isLocked, lenis]);

  // 2. Snap-lock trigger (runs only when device is unbooted)
  useEffect(() => {
    if (isMobileRef.current) return; // mobile handled by MobileFlow
    if (isBooted) return;

    const lockTrigger = ScrollTrigger.create({
      trigger: outerContainerRef.current,
      start: 'top top',
      end: 'top+=10 top',
      onEnter: () => {
        if (!isBooted && typeof window !== 'undefined' && window.innerWidth >= 768) {
          if (lenis && outerContainerRef.current) {
            lenis.scrollTo(outerContainerRef.current, { immediate: true });
          } else if (typeof window !== 'undefined') {
            window.scrollTo({
              top: outerContainerRef.current?.offsetTop || 0,
              behavior: 'auto',
            });
          }
          setIsLocked(true);
        }
      },
      onEnterBack: () => {
        if (!isBooted && typeof window !== 'undefined' && window.innerWidth >= 768) {
          if (lenis && outerContainerRef.current) {
            lenis.scrollTo(outerContainerRef.current, { immediate: true });
          } else if (typeof window !== 'undefined') {
            window.scrollTo({
              top: outerContainerRef.current?.offsetTop || 0,
              behavior: 'auto',
            });
          }
          setIsLocked(true);
        }
      },
    });

    return () => {
      lockTrigger.kill();
    };
  }, [isBooted, lenis]);

  // Listen to lenis scroll directly for snap-locking to prevent fast scrolling bypass
  useLenis((lenisInstance) => {
    if (isMobileRef.current) return; // mobile handled by MobileFlow
    if (!isBooted && !isLocked && typeof window !== 'undefined' && window.innerWidth >= 768) {
      const topOfSection = outerContainerRef.current?.offsetTop || 0;
      if (topOfSection > 0 && lenisInstance.scroll >= topOfSection - 10) {
        if (outerContainerRef.current) {
          lenisInstance.scrollTo(outerContainerRef.current, { immediate: true });
        }
        setIsLocked(true);
      }
    }
  }, [isBooted, isLocked]);

  // 3. Press and hold timer logic
  const startHolding = () => {
    if (isBooted) return;
    setIsHolding(true);

    const startTime = performance.now() - (progressRef.current / 100) * 2000; // Hold for 2 seconds

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min((elapsed / 2000) * 100, 100);
      progressRef.current = progress;
      setBootProgress(progress);

      if (progress < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        // Successful Boot
        setIsBooted(true);
        setIsLocked(false);
        setIsHolding(false);
        setBootProgress(100);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const stopHolding = () => {
    setIsHolding(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Decays progress back to 0 in 350ms
    const startTime = performance.now();
    const startProgress = progressRef.current;

    const decayProgress = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.max(startProgress - (elapsed / 350) * 100, 0);
      progressRef.current = progress;
      setBootProgress(progress);

      if (progress > 0) {
        animationFrameRef.current = requestAnimationFrame(decayProgress);
      }
    };

    animationFrameRef.current = requestAnimationFrame(decayProgress);
  };

  // 4. Scroll triggered sequence (Active only after booted)
  useEffect(() => {
    if (isMobileRef.current) return; // mobile handled by MobileFlow
    if (!isBooted) return;

    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop layout: phone shifts side-to-side dynamically
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outerContainerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            pin: innerContainerRef.current,
            invalidateOnRefresh: true,
          },
        });

        // --- PHONE ROTATION ---
        tl.to(phoneRef.current, {
          rotateY: -15,
          rotateX: 10,
          z: -50,
          ease: 'none',
        }, 0);

        // --- PHASE 1: BORROW ---
        // Motion trail stagger paths
        tl.fromTo('.trail-ghost-borrow-1', { x: 0, y: 0 }, { x: -8, y: 2, duration: 1.2 }, 0.1);
        tl.fromTo('.trail-ghost-borrow-2', { x: 0, y: 0 }, { x: -16, y: 4, duration: 1.2 }, 0.2);
        tl.fromTo('.trail-ghost-borrow-3', { x: 0, y: 0 }, { x: -24, y: 6, duration: 1.2 }, 0.3);

        // Fade in left-side borrow description block
        tl.fromTo('.desc-borrow', 
          { opacity: 0, y: '8vh' },
          { opacity: 1, y: '0vh', pointerEvents: 'auto', duration: 1 },
          0.4
        );

        // --- PHASE 2: MORPH & FLOW TO EARN ---
        // Move phone from right to left
        tl.to(phoneContainerRef.current, {
          x: '-46vw',
          duration: 2,
          ease: 'power2.inOut',
        }, 2);

        // Move Earn description block to the right and fade in
        tl.fromTo('.desc-earn',
          { opacity: 0, x: '46vw', y: '8vh' },
          { opacity: 1, x: '46vw', y: '0vh', pointerEvents: 'auto', duration: 1 },
          2.5
        );

        // Motion trail switches target direction
        tl.to('.trail-ghost-earn-1', { x: 8, y: 2, duration: 1.5 }, 2.1);
        tl.to('.trail-ghost-earn-2', { x: 16, y: 4, duration: 1.5 }, 2.2);
        tl.to('.trail-ghost-earn-3', { x: 24, y: 6, duration: 1.5 }, 2.3);

        // Cross-fade Borrow description block out
        tl.to('.desc-borrow', { opacity: 0, y: '-4vh', pointerEvents: 'none', duration: 0.8 }, 2);

        // --- PHASE 3: MORPH & FLOW TO LEARN ---
        // Move phone back to the right
        tl.to(phoneContainerRef.current, {
          x: '0vw',
          duration: 2,
          ease: 'power2.inOut',
        }, 4.5);

        // Motion trail targets left
        tl.to('.trail-ghost-learn-1', { x: -8, y: 2, duration: 1.5 }, 4.6);
        tl.to('.trail-ghost-learn-2', { x: -16, y: 4, duration: 1.5 }, 4.7);
        tl.to('.trail-ghost-learn-3', { x: -24, y: 6, duration: 1.5 }, 4.8);

        // Cross-fade Earn description block to Learn description block
        tl.to('.desc-earn', { opacity: 0, y: '-4vh', pointerEvents: 'none', duration: 0.8 }, 4.5);
        tl.fromTo('.desc-learn',
          { opacity: 0, y: '8vh' },
          { opacity: 1, y: '0vh', pointerEvents: 'auto', duration: 1 },
          5.0
        );
      });

      // Mobile layout: elements remain centered and stack nicely vertically
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outerContainerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            pin: innerContainerRef.current,
            invalidateOnRefresh: true,
          },
        });

        // Phone rotation
        tl.to(phoneRef.current, {
          rotateY: -10,
          rotateX: 5,
          z: -30,
          ease: 'none',
        }, 0);

        // --- PHASE 1: BORROW ---
        tl.fromTo('.desc-borrow', 
          { opacity: 0, y: '8vh' },
          { opacity: 1, y: '0vh', pointerEvents: 'auto', duration: 1 },
          0.4
        );

        // --- PHASE 2: EARN ---
        tl.to('.desc-borrow', { opacity: 0, y: '-4vh', pointerEvents: 'none', duration: 0.8 }, 2);
        tl.fromTo('.desc-earn',
          { opacity: 0, y: '8vh' },
          { opacity: 1, y: '0vh', pointerEvents: 'auto', duration: 1 },
          2.5
        );

        // --- PHASE 3: LEARN ---
        tl.to('.desc-earn', { opacity: 0, y: '-4vh', pointerEvents: 'none', duration: 0.8 }, 4.5);
        tl.fromTo('.desc-learn',
          { opacity: 0, y: '8vh' },
          { opacity: 1, y: '0vh', pointerEvents: 'auto', duration: 1 },
          5.0
        );
      });

    }, outerContainerRef);

    return () => ctx.revert();
  }, [isBooted]);

  return (
    <>
    {/* â”€â”€ DESKTOP VERSION (md+) â”€â”€ unchanged */}
    <div ref={outerContainerRef} className="hidden md:block relative w-full min-h-[400vh] bg-ink">
      
      {/* Full-viewport scene display container */}
      <section 
        ref={innerContainerRef} 
        className="h-screen w-full flex flex-col md:flex-row items-center justify-between relative overflow-hidden bg-ink z-20 px-6 md:px-12 py-12"
      >
        {/* Glow behind phone and background */}
        <div className="absolute w-[450px] h-[450px] top-1/2 right-[10%] -translate-y-1/2 bg-accent-purple/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute w-[350px] h-[350px] top-1/3 left-[5%] bg-accent-lime/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Left Column: Flow Context Descriptions */}
        <div ref={leftColumnRef} className="w-full md:w-[45%] h-[55vh] md:h-[70vh] relative flex flex-col justify-start md:justify-center items-start pt-16 md:pt-0 z-40">
          
          {/* Pre-Boot context display */}
          {!isBooted && (
            <div className="flex flex-col items-start space-y-3 sm:space-y-5 animate-fade-in pr-10 md:pr-0">
              <span className="font-jetbrains text-[10px] sm:text-xs font-normal text-ink brutal-pill bg-accent-lime px-3 sm:px-4 py-1 sm:py-1.5">
                // financial operating system
              </span>
              <h2 className="font-bricolage text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight">
                Unlock the <br />CreditBuddy App.
              </h2>
              <p className="font-jakarta text-xs sm:text-base md:text-lg text-white/70 leading-relaxed max-w-xs sm:max-w-sm">
                India&apos;s student-first financial ecosystem. Touch and hold the fingerprint scanner on the phone to boot the interface and unlock the scroll path.
              </p>
            </div>
          )}

          {/* Dynamic Scroll descriptions (Title text exactly over paragraph text) */}
          <div className="desc-borrow absolute inset-0 flex flex-col items-start justify-start md:justify-center pt-16 md:pt-0 space-y-2.5 sm:space-y-4 opacity-0 pointer-events-none pr-8 md:pr-0">
            {/* Title directly over paragraph text */}
            <div className="word-borrow relative flex items-center justify-start font-bricolage font-extrabold text-3xl sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem] uppercase select-none leading-none mb-1">
              <span className="trail-ghost trail-ghost-borrow-3 absolute text-accent-lime/10">BORROW</span>
              <span className="trail-ghost trail-ghost-borrow-2 absolute text-accent-lime/20">BORROW</span>
              <span className="trail-ghost trail-ghost-borrow-1 absolute text-accent-lime/30">BORROW</span>
              <span className="relative text-accent-lime" style={{ textShadow: 'none' }}>BORROW</span>
            </div>

            <span className="font-jetbrains text-[10px] sm:text-xs font-normal text-ink brutal-pill bg-accent-lime px-3 sm:px-4 py-1 sm:py-1.5">
              // borrow feature
            </span>
            <h3 className="font-bricolage text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-none">
              Need Instant Cash?
            </h3>
            <p className="font-jakarta text-xs sm:text-base md:text-lg text-white/70 leading-relaxed max-w-xs sm:max-w-sm">
              Tuition payments, exam registrations, or campus needs? Get approved in 60 seconds with 0% interest for the first 30 days. Linked securely to your student ID.
            </p>
          </div>

          <div className="desc-earn absolute inset-0 flex flex-col items-start justify-start md:justify-center pt-16 md:pt-0 space-y-2.5 sm:space-y-4 opacity-0 pointer-events-none pr-8 md:pr-0">
            {/* Title directly over paragraph text */}
            <div className="word-earn relative flex items-center justify-start font-bricolage font-extrabold text-3xl sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem] uppercase select-none leading-none mb-1">
              <span className="trail-ghost trail-ghost-earn-3 absolute text-accent-gold/10">EARN</span>
              <span className="trail-ghost trail-ghost-earn-2 absolute text-accent-gold/20">EARN</span>
              <span className="trail-ghost trail-ghost-earn-1 absolute text-accent-gold/30">EARN</span>
              <span className="relative text-accent-gold">EARN</span>
            </div>

            <span className="font-jetbrains text-[10px] sm:text-xs font-normal text-ink brutal-pill bg-accent-gold px-3 sm:px-4 py-1 sm:py-1.5">
              // earn feature
            </span>
            <h3 className="font-bricolage text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-none">
              Grow Your Balance.
            </h3>
            <p className="font-jakarta text-xs sm:text-base md:text-lg text-white/70 leading-relaxed max-w-xs sm:max-w-sm">
              Monetize your spare time. Pick up verified campus gigs, complete student challenges, or leverage our powerful referral network. Get paid directly to your wallet.
            </p>
          </div>

          <div className="desc-learn absolute inset-0 flex flex-col items-start justify-start md:justify-center pt-16 md:pt-0 space-y-2.5 sm:space-y-4 opacity-0 pointer-events-none pr-8 md:pr-0">
            {/* Title directly over paragraph text */}
            <div className="word-learn relative flex items-center justify-start font-bricolage font-extrabold text-3xl sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem] uppercase select-none leading-none mb-1">
              <span className="trail-ghost trail-ghost-learn-3 absolute text-accent-purple/10">LEARN</span>
              <span className="trail-ghost trail-ghost-learn-2 absolute text-accent-purple/20">LEARN</span>
              <span className="trail-ghost trail-ghost-learn-3 absolute text-accent-purple/30">LEARN</span>
              <span className="relative text-accent-purple">LEARN</span>
            </div>

            <span className="font-jetbrains text-[10px] sm:text-xs font-normal text-white brutal-pill bg-accent-purple px-3 sm:px-4 py-1 sm:py-1.5">
              // learn feature
            </span>
            <h3 className="font-bricolage text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-none">
              Real-World Skills.
            </h3>
            <p className="font-jakarta text-xs sm:text-base md:text-lg text-white/70 leading-relaxed max-w-xs sm:max-w-sm">
              No textbook fluff. Master budgeting, taxes, card building, and mutual funds via interactive, byte-sized modules. Secure your future before you graduate.
            </p>
          </div>

        </div>

        {/* Right Column: 3D Phone Container */}
        <div className="w-full md:w-[50%] h-auto md:h-[75vh] flex items-end justify-end md:items-center md:justify-center absolute bottom-4 right-14 sm:bottom-6 sm:right-24 md:relative md:bottom-auto md:right-auto z-20 pointer-events-auto">
          
          {/* 3D iPhone Model */}
          <div ref={phoneContainerRef} className="iphone-container w-[280px] h-[580px] md:w-[300px] md:h-[610px] scale-[0.60] xs:scale-[0.66] sm:scale-80 md:scale-100 origin-center md:-translate-x-[6vw]">
            <div 
              ref={phoneRef}
              className="w-full h-full iphone-frame flex flex-col"
              style={{
                borderColor: '#C8FF3D',
                borderWidth: '4px',
                borderStyle: 'solid',
                boxShadow: '10px 10px 0px #C8FF3D',
                transform: 'rotateY(20deg) rotateX(10deg)',
                transition: isHolding ? 'transform 0.25s ease-out' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              <div className="iphone-island border border-[#C8FF3D]/40" />
              <div className="iphone-glare" />

              {/* Screen Inner view */}
              <div className="w-full h-full bg-bg-primary relative p-4 pt-10 flex flex-col justify-between overflow-hidden">
                
                {/* --- MOCK BOOT / LOCK SCREEN (Active when not booted) --- */}
                {!isBooted && (
                  <div className="absolute inset-0 bg-bg-primary flex flex-col items-center justify-between p-6 pt-12 pb-16 z-30 select-none">
                    
                    {/* Top status */}
                    <div className="w-full flex justify-between text-[10px] text-ink-muted font-bold uppercase tracking-widest font-jetbrains">
                      <span>CB OS v1.2</span>
                      <span>SECURED</span>
                    </div>

                    {/* Logo/Name */}
                    <div className="text-center">
                      <h3 className="font-bricolage text-3xl font-extrabold text-ink tracking-tight uppercase">
                        Credit<span className="text-accent-purple">Buddy</span>
                      </h3>
                      <p className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.25em] mt-1.5">
                        India&apos;s Student Network
                      </p>
                    </div>

                  {/* Touch ID Trigger */}
                    <div className="flex flex-col items-center space-y-4 relative">

                      {/* Pulsing attention rings */}
                      <div className="relative flex items-center justify-center">
                        {/* Ring 3 â€” outermost, slowest */}
                        <span
                          className="absolute rounded-full border-2 border-accent-lime/20"
                          style={{
                            width: 140, height: 140,
                            animation: 'ping-slow 2.4s cubic-bezier(0,0,0.2,1) infinite',
                          }}
                        />
                        {/* Ring 2 */}
                        <span
                          className="absolute rounded-full border-2 border-accent-lime/35"
                          style={{
                            width: 116, height: 116,
                            animation: 'ping-slow 2.4s cubic-bezier(0,0,0.2,1) 0.35s infinite',
                          }}
                        />
                        {/* Ring 1 â€” closest */}
                        <span
                          className="absolute rounded-full border-2 border-accent-lime/55"
                          style={{
                            width: 96, height: 96,
                            animation: 'ping-slow 2.4s cubic-bezier(0,0,0.2,1) 0.7s infinite',
                          }}
                        />

                        {/* The button itself */}
                        <button
                          onMouseDown={startHolding}
                          onMouseUp={stopHolding}
                          onMouseLeave={stopHolding}
                          onTouchStart={startHolding}
                          onTouchEnd={stopHolding}
                          className={`fingerprint-btn w-20 h-20 rounded-full bg-accent-lime/20 flex items-center justify-center relative cursor-pointer outline-none select-none transition-all duration-300 ${
                            isHolding
                              ? 'scale-90 bg-accent-lime/60'
                              : 'hover:scale-110 active:scale-95'
                          }`}
                          style={{
                            border: `2.5px solid ${isHolding ? '#C8FF3D' : 'rgba(200,255,61,0.6)'}`,
                            boxShadow: isHolding
                              ? '0 0 0 6px rgba(200,255,61,0.25), 0 0 32px rgba(200,255,61,0.5)'
                              : '0 0 0 3px rgba(200,255,61,0.15), 0 0 18px rgba(200,255,61,0.25)',
                          }}
                        >
                          {/* Circular Progress Loader SVG */}
                          <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                              cx="50%"
                              cy="50%"
                              r="36"
                              stroke="url(#progress-gradient)"
                              strokeWidth="3.5"
                              fill="transparent"
                              strokeDasharray={2 * Math.PI * 36}
                              strokeDashoffset={2 * Math.PI * 36 * (1 - bootProgress / 100)}
                              strokeLinecap="round"
                              className="transition-all"
                            />
                          </svg>

                          <Fingerprint
                            className={`w-9 h-9 transition-all duration-300 ${
                              isHolding ? 'text-accent-lime scale-110' : 'text-ink/50'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Label + animated caret */}
                      <div className="text-center space-y-1">
                        <span className="flex items-center justify-center gap-1.5">
                          <span className="block text-[8px] font-bold uppercase tracking-[0.22em] text-accent-purple font-jetbrains">
                            {isHolding ? 'Booting App...' : 'Hold Finger to Boot'}
                          </span>
                          <span
                            className="inline-block w-[2px] h-[10px] bg-accent-purple"
                            style={{ animation: 'blink-caret 1s step-end infinite' }}
                          />
                        </span>
                        <span className="block text-[7px] text-ink-muted uppercase tracking-[0.12em] font-jetbrains">
                          Keep pressed for 2 seconds
                        </span>
                      </div>

                      {/* Three bouncing arrows pointing up at the button */}
                      <div className="flex flex-col items-center -mt-1" style={{ transform: 'rotate(180deg)' }}>
                        {[0, 0.18, 0.36].map((delay, i) => (
                          <svg
                            key={i}
                            width="12"
                            height="8"
                            viewBox="0 0 12 8"
                            fill="none"
                            style={{ animation: `bounce-arrow 1s ease-in-out ${delay}s infinite`, opacity: 1 - i * 0.28 }}
                          >
                            <path d="M1 1L6 7L11 1" stroke="#C8FF3D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- ACTIVE FINTECH UI SCREEN (Booted) --- */}
                {isBooted && (
                  <div className="w-full h-full flex flex-col justify-between pt-4 pb-2 animate-fade-in relative z-20">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-full bg-accent-lime flex items-center justify-center text-[10px] font-bold text-ink brutal-border">
                          S
                        </div>
                        <div>
                          <span className="block text-[8px] text-ink-muted uppercase tracking-widest leading-none font-jetbrains">Hi, student</span>
                          <span className="block text-[10px] font-bold text-ink leading-none mt-0.5 font-jakarta">Sneha Sharma</span>
                        </div>
                      </div>
                      <div className="px-2 py-0.5 rounded-full brutal-border bg-accent-purple text-[7px] font-bold text-white tracking-wider font-jetbrains">
                        LVL 3
                      </div>
                    </div>

                    {/* Balance Card Widget */}
                    <div className="rounded-2xl bg-ink p-3 brutal-border relative overflow-hidden" style={{ boxShadow: '4px 4px 0px #7B5CFF' }}>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[7px] text-bg-primary/50 uppercase tracking-widest font-bold font-jetbrains">Total Balance</span>
                          <h4 className="font-bricolage text-lg font-extrabold text-bg-primary mt-0.5">â‚¹14,500</h4>
                        </div>
                        <Wallet className="w-4 h-4 text-accent-lime" />
                      </div>
                      <div className="flex justify-between mt-3 gap-2">
                        <button className="flex-1 py-1 rounded-lg bg-accent-lime text-[8px] font-bold text-ink cursor-pointer text-center font-bricolage">
                          Withdraw
                        </button>
                        <button className="flex-1 py-1 rounded-lg bg-white/10 border border-white/20 text-[8px] font-bold text-white cursor-pointer text-center font-bricolage">
                          Pay Bills
                        </button>
                      </div>
                    </div>

                    {/* Quick Features List */}
                    <div className="flex-1 flex flex-col justify-center space-y-2 mt-4 mb-4">
                      <span className="text-[7px] text-ink-muted uppercase tracking-widest font-bold font-jetbrains">Core Modules</span>
                      
                      {/* Features */}
                      {[
                        { title: 'Borrow', desc: '0% Instant Cash Line', color: 'brutal-border bg-accent-lime/10 text-ink', icon: <ArrowRight className="w-3 h-3 text-ink" /> },
                        { title: 'Earn', desc: 'Micro gigs & rewards', color: 'brutal-border bg-accent-gold/10 text-ink', icon: <Award className="w-3 h-3 text-accent-gold" /> },
                        { title: 'Learn', desc: 'Bite-sized financial skills', color: 'brutal-border bg-accent-purple/10 text-ink', icon: <BookOpen className="w-3 h-3 text-accent-purple" /> }
                      ].map((item, i) => (
                        <div key={i} className={`flex items-center justify-between p-2 rounded-xl ${item.color} transition-all`}>
                          <div>
                            <span className="block text-[9px] font-bold font-bricolage">{item.title}</span>
                            <span className="block text-[7px] opacity-60 mt-0.5 font-jetbrains">{item.desc}</span>
                          </div>
                          {item.icon}
                        </div>
                      ))}
                    </div>

                    {/* Spend graph */}
                    <div className="rounded-xl brutal-border bg-white p-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-3 h-3 text-accent-purple" />
                        <span className="text-[7px] text-ink-muted uppercase tracking-widest font-bold font-jetbrains">Spending Track</span>
                      </div>
                      <div className="flex space-x-0.5 items-end h-6">
                        {[10, 18, 12, 24, 15, 30, 20].map((h, i) => (
                          <div 
                            key={i} 
                            className={`w-[3px] rounded-t-sm ${i === 5 ? 'bg-accent-purple' : 'bg-ink/10'}`} 
                            style={{ height: `${h}px` }} 
                          />
                        ))}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </div>
          </div>

        </div>

      </section>

      {/* Embedded definitions SVG */}
      <svg className="hidden">
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C8FF3D" />
            <stop offset="100%" stopColor="#7B5CFF" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    {/* â”€â”€ MOBILE VERSION (< md) â”€â”€ straight phone, scroll-driven screen swap */}
    <MobileFlow />
    </>
  );
};

// â”€â”€â”€ Mobile Flow Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Straight phone, no fingerprint gate. Screen content swaps via ScrollTrigger
// scrub as user scrolls through 3 pinned phases (Borrow â†’ Earn â†’ Learn).
// Text label + description lives below the phone frame.

const MOBILE_PHASES = [
  {
    key: 'borrow',
    label: 'BORROW',
    pill: '// borrow feature',
    pillBg: 'bg-accent-lime',
    pillText: 'text-ink',
    labelColor: 'text-accent-lime',
    heading: 'Need Instant Cash?',
    desc: 'Tuition, exam fees, or campus needs â€” get approved in 60 seconds with 0% interest for the first 30 days.',
    screenBg: 'bg-bg-primary',
    screenAccent: '#C8FF3D',
    screenContent: (
      <div className="flex flex-col h-full justify-between p-4 pt-10">
        <div className="text-center space-y-1">
          <h3 className="font-bricolage text-2xl font-extrabold text-ink uppercase tracking-tight">
            Credit<span className="text-accent-purple">Buddy</span>
          </h3>
          <p className="font-jetbrains text-[8px] text-ink-muted uppercase tracking-[0.2em]">
            Instant Micro Credit
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-full bg-accent-lime/10 border border-accent-lime rounded-2xl p-3">
            <p className="font-jetbrains text-[8px] text-ink-muted uppercase tracking-widest mb-1">Credit Available</p>
            <p className="font-bricolage text-2xl font-extrabold text-ink">â‚¹50,000</p>
            <div className="w-full h-1.5 bg-ink/10 rounded-full mt-2">
              <div className="h-full w-1/4 bg-accent-lime rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="bg-white border border-ink/10 rounded-xl p-2 text-center">
              <p className="font-jetbrains text-[7px] text-ink-muted">Interest</p>
              <p className="font-bricolage text-sm font-extrabold text-ink">0%</p>
            </div>
            <div className="bg-white border border-ink/10 rounded-xl p-2 text-center">
              <p className="font-jetbrains text-[7px] text-ink-muted">Approval</p>
              <p className="font-bricolage text-sm font-extrabold text-ink">60s</p>
            </div>
          </div>
        </div>
        <button className="w-full py-2.5 bg-accent-lime brutal-border rounded-full font-bricolage font-bold text-sm text-ink">
          Borrow Now â†’
        </button>
      </div>
    ),
  },
  {
    key: 'earn',
    label: 'EARN',
    pill: '// earn feature',
    pillBg: 'bg-accent-gold',
    pillText: 'text-ink',
    labelColor: 'text-accent-gold',
    heading: 'Grow Your Balance.',
    desc: 'Pick up campus gigs, complete student challenges, and earn directly to your wallet. No experience needed.',
    screenBg: 'bg-ink',
    screenAccent: '#FFD23F',
    screenContent: (
      <div className="flex flex-col h-full justify-between p-4 pt-10">
        <div className="text-center space-y-1">
          <h3 className="font-bricolage text-2xl font-extrabold text-bg-primary uppercase tracking-tight">
            Campus <span className="text-accent-gold">Gigs</span>
          </h3>
          <p className="font-jetbrains text-[8px] text-bg-primary/50 uppercase tracking-[0.2em]">
            Earn While You Study
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { role: 'Brand Ambassador', earn: 'â‚¹2,000/mo', tag: 'Hot' },
            { role: 'Survey Responder', earn: 'â‚¹500/task', tag: 'New' },
            { role: 'Referral Drive', earn: 'â‚¹300/refer', tag: '' },
          ].map((g, i) => (
            <div key={i} className="flex items-center justify-between bg-white/10 border border-white/10 rounded-xl p-2.5">
              <div>
                <p className="font-jakarta text-[9px] font-bold text-bg-primary">{g.role}</p>
                <p className="font-jetbrains text-[8px] text-accent-gold">{g.earn}</p>
              </div>
              {g.tag && <span className="text-[7px] font-bold bg-accent-gold text-ink px-2 py-0.5 rounded-full">{g.tag}</span>}
            </div>
          ))}
        </div>
        <button className="w-full py-2.5 bg-accent-gold border-2 border-ink rounded-full font-bricolage font-bold text-sm text-ink">
          Browse Gigs â†’
        </button>
      </div>
    ),
  },
  {
    key: 'learn',
    label: 'LEARN',
    pill: '// learn feature',
    pillBg: 'bg-accent-purple',
    pillText: 'text-white',
    labelColor: 'text-accent-purple',
    heading: 'Real-World Skills.',
    desc: 'Bite-sized modules on budgeting, credit scores, taxes, and investing. Secure your future before you graduate.',
    screenBg: 'bg-bg-primary',
    screenAccent: '#7B5CFF',
    screenContent: (
      <div className="flex flex-col h-full justify-between p-4 pt-10">
        <div className="text-center space-y-1">
          <h3 className="font-bricolage text-2xl font-extrabold text-ink uppercase tracking-tight">
            Financial <span className="text-accent-purple">IQ</span>
          </h3>
          <p className="font-jetbrains text-[8px] text-ink-muted uppercase tracking-[0.2em]">
            Byte-Sized Lessons
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { topic: 'CIBIL Score 101', progress: 80, color: 'bg-accent-purple' },
            { topic: 'Budgeting Basics', progress: 55, color: 'bg-accent-cyan' },
            { topic: 'SIP & Mutual Funds', progress: 30, color: 'bg-accent-gold' },
          ].map((l, i) => (
            <div key={i} className="bg-white border border-ink/10 rounded-xl p-2.5">
              <div className="flex justify-between mb-1.5">
                <p className="font-jakarta text-[9px] font-bold text-ink">{l.topic}</p>
                <p className="font-jetbrains text-[8px] text-ink-muted">{l.progress}%</p>
              </div>
              <div className="w-full h-1.5 bg-ink/10 rounded-full">
                <div className={`h-full ${l.color} rounded-full`} style={{ width: `${l.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
        <button className="w-full py-2.5 bg-accent-purple brutal-border rounded-full font-bricolage font-bold text-sm text-white">
          Start Learning â†’
        </button>
      </div>
    ),
  },
];

function MobileFlow() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const pinRef    = useRef<HTMLDivElement>(null);
  const [phase, setPhase]               = useState(0);
  const [isBooted, setIsBooted]         = useState(false);
  const [isHolding, setIsHolding]       = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const progressRef  = useRef(0);
  const animFrameRef = useRef<number | null>(null);


  // â”€â”€ Boot: hold 2s â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const startHolding = () => {
    if (isBooted) return;
    setIsHolding(true);
    const startTime = performance.now() - (progressRef.current / 100) * 2000;
    const update = (now: number) => {
      const pct = Math.min(((now - startTime) / 2000) * 100, 100);
      progressRef.current = pct;
      setBootProgress(pct);
      if (pct < 100) {
        animFrameRef.current = requestAnimationFrame(update);
      } else {
        setIsBooted(true);
        setIsHolding(false);
        setTimeout(() => ScrollTrigger.refresh(), 50);
      }
    };
    animFrameRef.current = requestAnimationFrame(update);
  };

  const stopHolding = () => {
    setIsHolding(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    const startPct = progressRef.current;
    const startTime = performance.now();
    const decay = (now: number) => {
      const pct = Math.max(startPct - ((now - startTime) / 350) * 100, 0);
      progressRef.current = pct;
      setBootProgress(pct);
      if (pct > 0) animFrameRef.current = requestAnimationFrame(decay);
    };
    animFrameRef.current = requestAnimationFrame(decay);
  };

  // ScrollTrigger: use ref for isBooted to avoid stale closure
  const isBootedRef = useRef(false);
  useEffect(() => { isBootedRef.current = isBooted; }, [isBooted]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: outerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        invalidateOnRefresh: true,
      });
      ScrollTrigger.create({
        trigger: outerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          if (!isBootedRef.current) return;
          const p = self.progress;
          const newPhase = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
          setPhase(prev => prev !== newPhase ? newPhase : prev);
        },
      });
    }, outerRef);
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = MOBILE_PHASES[phase];

  return (
    // Always 300vh â€” no dynamic height change that breaks GSAP measurements
    <div ref={outerRef} className="md:hidden relative w-full bg-ink" style={{ height: '300vh' }}>

      {/* Pinned scene */}
      <div
        ref={pinRef}
        className="w-full h-screen bg-ink flex flex-col items-center justify-between overflow-hidden px-5 pt-20 pb-4"
      >
        {/* â”€â”€ PRE-BOOT: lock screen â”€â”€ */}
        {!isBooted && (
          <>
            <span className="font-jetbrains text-[10px] font-bold bg-accent-lime text-ink brutal-pill px-4 py-1.5">
              // financial operating system
            </span>

            {/* Phone with lock screen */}
            <div className="relative flex-shrink-0" style={{ width: 220, height: 440, border: '3px solid #C8FF3D', borderRadius: 36, boxShadow: '0 0 0 1px rgba(200,255,61,0.25), 6px 6px 0px #C8FF3D', background: '#FBF7EF', overflow: 'hidden' }}>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-ink rounded-full z-10" />
              <div className="absolute inset-0 flex flex-col items-center justify-between p-5 pt-10 pb-10 z-20 select-none">
                <div className="w-full flex justify-between font-jetbrains text-[8px] text-ink-muted uppercase tracking-widest">
                  <span>CB OS v1.2</span><span>SECURED</span>
                </div>
                <div className="text-center">
                  <h3 className="font-bricolage text-2xl font-extrabold text-ink uppercase tracking-tight">
                    Credit<span className="text-accent-purple">Buddy</span>
                  </h3>
                  <p className="font-jetbrains text-[8px] text-ink-muted uppercase tracking-[0.2em] mt-1">
                    India&apos;s Student Network
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    {[140, 116, 96].map((size, i) => (
                      <span key={i} className="absolute rounded-full border-2 border-accent-lime/30"
                        style={{ width: size, height: size, animation: `ping-slow 2.4s cubic-bezier(0,0,0.2,1) ${i * 0.35}s infinite` }} />
                    ))}
                    <button
                      onMouseDown={startHolding} onMouseUp={stopHolding} onMouseLeave={stopHolding}
                      onTouchStart={(e) => { e.preventDefault(); startHolding(); }} onTouchEnd={stopHolding}
                      className="w-16 h-16 rounded-full bg-accent-lime/20 flex items-center justify-center relative outline-none select-none"
                      style={{ border: `2px solid ${isHolding ? '#C8FF3D' : 'rgba(200,255,61,0.5)'}`, boxShadow: isHolding ? '0 0 0 4px rgba(200,255,61,0.25), 0 0 24px rgba(200,255,61,0.4)' : '0 0 0 2px rgba(200,255,61,0.1)', transform: isHolding ? 'scale(0.92)' : 'scale(1)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                    >
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="28" stroke="#C8FF3D" strokeWidth="3" fill="none"
                          strokeDasharray={2 * Math.PI * 28}
                          strokeDashoffset={2 * Math.PI * 28 * (1 - bootProgress / 100)}
                          strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.05s linear' }} />
                      </svg>
                      <Fingerprint className={`w-7 h-7 transition-colors duration-200 ${isHolding ? 'text-accent-lime' : 'text-ink/50'}`} />
                    </button>
                  </div>
                  <div className="text-center space-y-0.5">
                    <p className="font-jetbrains text-[8px] font-bold uppercase tracking-[0.2em] text-accent-purple">
                      {isHolding ? 'Booting App...' : 'Hold to Boot'}
                    </p>
                    <p className="font-jetbrains text-[7px] text-ink-muted uppercase tracking-wider">
                      Keep pressed for 2 seconds
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-1 max-w-xs">
              <h2 className="font-bricolage text-3xl font-extrabold text-white leading-tight">
                Unlock the<br />CreditBuddy App.
              </h2>
              <p className="font-jakarta text-sm text-white/60">
                Hold the fingerprint scanner to boot and unlock the scroll path.
              </p>
            </div>
          </>
        )}
        {isBooted && (
          <>
            <div className="relative flex-shrink-0 mt-2" style={{ width: 200, height: 380, border: `3px solid ${current.screenAccent}`, borderRadius: 36, boxShadow: `0 0 0 1px ${current.screenAccent}40, 6px 6px 0px ${current.screenAccent}`, background: current.screenBg === "bg-ink" ? "#14100F" : "#FBF7EF", overflow: "hidden", transition: "border-color 0.4s ease, box-shadow 0.4s ease" }}>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-3.5 rounded-full z-10" style={{ background: current.screenBg === "bg-ink" ? "#000" : "#14100F" }} />
              <div key={current.key} className="w-full h-full animate-fade-in">
                {current.screenContent}
              </div>
            </div>
            <div className="w-full text-center max-w-xs mx-auto px-2">
              <h2 className={`font-bricolage text-4xl font-extrabold uppercase tracking-tight leading-none mb-1 ${current.labelColor} transition-colors duration-300`}>
                {current.label}
              </h2>
              <h3 className="font-bricolage text-lg font-extrabold text-white leading-tight mb-1">
                {current.heading}
              </h3>
              <p className="font-jakarta text-xs text-white/60 leading-relaxed line-clamp-2">
                {current.desc}
              </p>
            </div>
            <div className="flex gap-2 items-center pb-1">
              {MOBILE_PHASES.map((p, i) => (
                <div key={p.key} className="rounded-full transition-all duration-300"
                  style={{ width: i === phase ? 20 : 6, height: 6, background: i === phase ? current.screenAccent : "rgba(255,255,255,0.2)" }} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
