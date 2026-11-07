'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const REASONS = [
  { id: 'semester', label: 'Semester fees', amount: 8000, term: 6 },
  { id: 'laptop', label: 'New Laptop', amount: 10000, term: 9 },
  { id: 'hostel', label: 'Hostel deposit', amount: 5000, term: 4 },
  { id: 'emergency', label: 'Emergency', amount: 3000, term: 3 },
];

export const InteractiveLoanCalculator = () => {
  const [selectedReason, setSelectedReason] = useState('semester');
  const [amount, setAmount] = useState(8000);
  const [term, setTerm] = useState(6);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Bold Superpower Cards Entrance
      gsap.fromTo('.superpower-card',
        { y: 100, opacity: 0, scale: 0.82, rotate: -4 },
        {
          y: 0, opacity: 1, scale: 1, rotate: 0,
          stagger: 0.12, duration: 0.85, ease: 'back.out(1.8)',
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }
        }
      );

      // Calculator Widget Reveal
      gsap.fromTo('.calc-widget-container',
        { y: 90, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.calc-widget-container', start: 'top 80%' }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const selectReason = (r: typeof REASONS[0]) => {
    setSelectedReason(r.id);
    setAmount(r.amount);
    setTerm(r.term);
  };

  // Interest calculation (0% for 30d, nominal ~10% simple interest over full term)
  const totalRepayable = Math.round(amount * (1 + (0.08 * (term / 12))));
  const monthlyRepayment = Math.round(totalRepayable / term);

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-6 md:px-12 bg-bg-primary w-full max-w-7xl mx-auto">
      
      {/* 1. Superpowers 4-Card Grid */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-jetbrains text-ink-muted text-sm font-normal block mb-2">// the ecosystem</span>
            <h2 className="font-bricolage text-4xl md:text-6xl font-extrabold tracking-tight text-ink">
              One app. Four superpowers.
            </h2>
          </div>
          <p className="font-jakarta text-ink-muted text-base md:text-lg max-w-md">
            CreditBuddy isn&apos;t just a loan app. It grows with you through every stage of student life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Borrow (Lime) */}
          <div className="superpower-card bg-accent-lime brutal-card p-6 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white brutal-border flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="6" width="18" height="13" rx="3" stroke="#14100F" strokeWidth="2"/>
                    <path d="M16 12.5H16.01" stroke="#14100F" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="font-jetbrains text-xs font-bold text-ink">01</span>
              </div>
              <h3 className="font-bricolage text-2xl font-extrabold text-ink mb-2">Borrow</h3>
              <p className="font-jakarta text-xs text-ink/80 leading-relaxed mb-6">
                Financial assistance for fees, laptops, books, emergencies & more.
              </p>
            </div>
            <ul className="space-y-2 font-jetbrains text-xs text-ink">
              <li className="flex items-center gap-2"><span>→</span> Fast digital approval</li>
              <li className="flex items-center gap-2"><span>→</span> Transparent terms</li>
              <li className="flex items-center gap-2"><span>→</span> No salary slip required</li>
            </ul>
          </div>

          {/* Card 2: Earn (White) */}
          <div className="superpower-card bg-white brutal-card p-6 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white brutal-border flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="9" cy="12" r="5" stroke="#14100F" strokeWidth="2"/>
                    <circle cx="15" cy="12" r="5" stroke="#14100F" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="font-jetbrains text-xs font-bold text-ink-muted">02</span>
              </div>
              <h3 className="font-bricolage text-2xl font-extrabold text-ink mb-2">Earn</h3>
              <p className="font-jakarta text-xs text-ink-muted leading-relaxed mb-6">
                Make money while you study through real, meaningful gigs.
              </p>
            </div>
            <ul className="space-y-2 font-jetbrains text-xs text-ink-muted">
              <li className="flex items-center gap-2"><span>→</span> Campus ambassador</li>
              <li className="flex items-center gap-2"><span>→</span> Micro-tasks & surveys</li>
              <li className="flex items-center gap-2"><span>→</span> Brand campaigns</li>
            </ul>
          </div>

          {/* Card 3: Learn (White) */}
          <div className="superpower-card bg-white brutal-card p-6 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white brutal-border flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#14100F" strokeWidth="2"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="#14100F" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="font-jetbrains text-xs font-bold text-ink-muted">03</span>
              </div>
              <h3 className="font-bricolage text-2xl font-extrabold text-ink mb-2">Learn</h3>
              <p className="font-jakarta text-xs text-ink-muted leading-relaxed mb-6">
                Bite-sized money lessons that actually make sense.
              </p>
            </div>
            <ul className="space-y-2 font-jetbrains text-xs text-ink-muted">
              <li className="flex items-center gap-2"><span>→</span> Budgeting & saving</li>
              <li className="flex items-center gap-2"><span>→</span> Credit scores 101</li>
              <li className="flex items-center gap-2"><span>→</span> Fraud awareness</li>
            </ul>
          </div>

          {/* Card 4: Build Credit (White) */}
          <div className="superpower-card bg-white brutal-card p-6 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white brutal-border flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4.5 16.5L10 11L14 15L19.5 7.5" stroke="#14100F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 7.5H19.5V12" stroke="#14100F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-jetbrains text-xs font-bold text-ink-muted">04</span>
              </div>
              <h3 className="font-bricolage text-2xl font-extrabold text-ink mb-2">Build Credit</h3>
              <p className="font-jakarta text-xs text-ink-muted leading-relaxed mb-6">
                Turn good habits into credibility that lasts past graduation.
              </p>
            </div>
            <ul className="space-y-2 font-jetbrains text-xs text-ink-muted">
              <li className="flex items-center gap-2"><span>→</span> On-time repayment rewards</li>
              <li className="flex items-center gap-2"><span>→</span> Score tracking</li>
              <li className="flex items-center gap-2"><span>→</span> Future-loan ready</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Interactive Calculator Widget */}
      {/* Desktop View (>= lg) */}
      <div data-cursor="dot" className="calc-widget-container hidden lg:grid w-full grid-cols-12 brutal-card overflow-hidden" style={{ boxShadow: '8px 8px 0px #14100F' }}>
        
        {/* Left Panel: Purple #7B5CFF */}
        <div className="col-span-6 bg-accent-purple p-8 md:p-12 text-white flex flex-col justify-between space-y-8">
          <div>
            <span className="font-jetbrains text-xs font-normal border border-white/30 rounded-full px-4 py-1.5 inline-flex items-center gap-2 mb-6">
              ✦ Instant estimate
            </span>
            <h3 className="font-bricolage text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              How much do you need?
            </h3>
          </div>

          {/* Reason Pills */}
          <div className="flex flex-wrap gap-2.5">
            {REASONS.map(r => (
              <button
                key={r.id}
                onClick={() => selectReason(r)}
                suppressHydrationWarning
                className={`font-jetbrains text-xs font-bold px-4 py-2.5 rounded-full brutal-border transition-all cursor-pointer ${
                  selectedReason === r.id
                    ? 'bg-accent-lime text-ink border-ink'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Sliders */}
          <div className="space-y-6 pt-4">
            {/* Amount Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-jetbrains text-xs uppercase tracking-widest text-white/70">Amount</span>
                <span className="font-bricolage text-2xl font-extrabold text-white">₹{amount.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent-lime"
              />
            </div>

            {/* Pay back slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-jetbrains text-xs uppercase tracking-widest text-white/70">Pay back over</span>
                <span className="font-bricolage text-2xl font-extrabold text-white">{term} mo</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent-lime"
              />
            </div>
          </div>
        </div>

        {/* Right Panel: Lime #C8FF3D */}
        <div className="col-span-6 bg-accent-lime p-8 md:p-12 text-ink flex flex-col justify-between space-y-8">
          <div>
            <span className="font-jetbrains text-xs font-normal text-ink-muted uppercase tracking-widest block mb-2">
              Your monthly repayment
            </span>
            <h4 className="font-bricolage text-6xl md:text-7xl font-extrabold tracking-tight text-ink">
              ₹{monthlyRepayment.toLocaleString('en-IN')}
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white brutal-card p-4">
              <span className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-widest block">Total repayable</span>
              <p className="font-bricolage text-xl font-extrabold text-ink mt-1">₹{totalRepayable.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-white brutal-card p-4">
              <span className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-widest block">Approval time</span>
              <p className="font-bricolage text-xl font-extrabold text-ink mt-1">~90 sec</p>
            </div>
          </div>

          <div>
            <button suppressHydrationWarning className="w-full py-4 bg-ink text-bg-primary font-bricolage font-bold text-lg brutal-pill brutal-shadow-purple transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer text-center flex items-center justify-center gap-2">
              Apply now →
            </button>
            <p className="font-jetbrains text-[10px] text-ink-muted text-center mt-3">
              *Illustrative estimate. Final terms shown before you accept.
            </p>
          </div>
        </div>

      </div>

      {/* Mobile Only Card View (< lg) */}
      <div 
        className="calc-widget-container lg:hidden w-full max-w-md mx-auto bg-accent-purple p-6 text-white rounded-[28px] brutal-border border-2 border-black" 
        style={{ boxShadow: '6px 6px 0px #14100F' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bricolage text-2xl font-bold text-white tracking-tight">
            Estimate Advance
          </h3>
          <span className="font-jetbrains text-xs text-white/90 bg-white/10 border border-white/25 rounded-full px-3.5 py-1 tracking-wide">
            ~90s approval
          </span>
        </div>

        {/* Amount Row */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-jetbrains text-xs font-bold uppercase tracking-wider text-white/70">
            AMOUNT
          </span>
          <span className="font-jetbrains text-base font-bold text-white tracking-wide">
            ₹{amount.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Slider */}
        <div className="mb-6">
          <input
            type="range"
            min="500"
            max="10000"
            step="500"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent-lime"
          />
        </div>

        {/* Repayment Glass Box */}
        <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-4 flex items-center justify-between mb-6">
          <span className="font-jetbrains text-sm font-bold text-white">
            Repayment
          </span>
          <span className="font-jetbrains text-lg font-bold text-accent-lime">
            ₹{monthlyRepayment.toLocaleString('en-IN')}/mo
          </span>
          <span className="font-jetbrains text-xs text-white/70">
            ({term} mos)
          </span>
        </div>

        {/* Apply Now Button */}
        <button
          suppressHydrationWarning
          className="w-full py-3.5 bg-accent-lime text-ink font-bricolage font-extrabold text-lg rounded-full border-2 border-black transition-transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          style={{ boxShadow: '2px 2px 0px #14100F' }}
        >
          Apply Now →
        </button>
      </div>

    </section>
  );
};
