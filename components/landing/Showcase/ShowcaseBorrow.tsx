'use client';

import React, { useRef, useEffect } from 'react';
import { KeywordHighlight } from '../shared/KeywordHighlight';
import { SplitText } from '../shared/SplitText';
import { 
  ShieldCheck, Zap, CreditCard, ArrowUpRight, Wifi, Battery, QrCode, Sparkles, 
  Home, Compass, User, Wallet, CheckCircle2, FileText, Gift, ArrowDownLeft
} from 'lucide-react';
import gsap from 'gsap';

export const ShowcaseBorrow = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.borrow-showcase-item',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power2.out',
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
    <section ref={containerRef} className="py-20 md:py-24 px-6 md:px-12 bg-bg-primary w-[95%] md:w-[96%] mx-auto my-6 md:my-10 brutal-border bg-elements overflow-hidden rounded-[2rem] md:rounded-[3.5rem]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-16 max-w-3xl">
          <span className="borrow-showcase-item font-jetbrains text-ink font-normal tracking-widest uppercase text-xs brutal-pill bg-accent-lime px-4 py-1.5 inline-block mb-4">
            // borrow feature
          </span>
          <h2 className="borrow-showcase-item font-bricolage text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            <SplitText
              text="Borrow without the bureaucracy."
              splitType="words"
              variant="rise"
              delay={50}
              textAlign="left"
              tag="span"
            />
          </h2>
          <p className="borrow-showcase-item font-jakarta text-ink-muted text-lg">
            Traditional banks don&apos;t understand students. We do.
            No income proof required, just your campus ID and basic verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[560px]">
          {/* Main Visual Card with Layered Smartphone Fan Stack */}
          <div className="borrow-showcase-item md:col-span-8 bg-white brutal-card p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group min-h-[480px] md:min-h-[540px]">
            
            {/* Background Hover Accent Glow */}
            <div className="absolute inset-0 bg-accent-lime/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* 3 Smartphone Mockups Container */}
            <div className="absolute inset-x-0 top-2 md:top-4 flex justify-center items-start px-1 sm:px-2 pointer-events-none select-none z-0 scale-[0.72] sm:scale-90 md:scale-100 transform origin-top">
              
              {/* Phone 1: Left Smartphone (CreditBuddy KYC Verification) */}
              <div className="w-[175px] sm:w-[220px] md:w-[260px] h-[520px] sm:h-[580px] md:h-[620px] bg-[#14100F] border border-ink rounded-[2.2rem] sm:rounded-[2.6rem] p-1 sm:p-1.5 shadow-[4px_4px_0px_#14100F] transform -rotate-8 translate-x-3 sm:translate-x-5 md:translate-x-7 translate-y-4 group-hover:-rotate-12 group-hover:translate-x-1 transition-transform duration-500 shrink-0 flex flex-col z-10">
                {/* Full Screen App Wrapper */}
                <div className="bg-bg-primary rounded-[1.9rem] sm:rounded-[2.3rem] h-full p-3 sm:p-3.5 flex flex-col justify-start gap-2 overflow-hidden border border-ink/10 font-jakarta">
                  {/* Status Bar & Header */}
                  <div>
                    <div className="flex items-center justify-between text-[9px] font-bold text-ink px-1 mb-1 font-jetbrains">
                      <span>9:41</span>
                      <div className="w-14 h-3 bg-ink rounded-full flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-lime"></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-2.5 h-2.5" />
                        <Battery className="w-2.5 h-2.5" />
                      </div>
                    </div>

                    {/* App Bar */}
                    <div className="flex items-center justify-between border-b border-ink/10 pb-1.5 mb-1.5">
                      <span className="font-bricolage text-xs font-extrabold text-ink">CreditBuddy ID</span>
                      <span className="font-jetbrains text-[8px] bg-accent-lime px-2 py-0.5 rounded-full font-bold border border-ink">STEP 3/3</span>
                    </div>
                  </div>

                  {/* App Content Body (Starts IMMEDIATELY under app bar) */}
                  <div className="space-y-2">
                    {/* Top Student Verification Banner */}
                    <div className="bg-white p-2.5 rounded-xl border border-ink/10 flex items-center justify-between shadow-sm">
                      <div>
                        <p className="font-jetbrains text-[8px] text-ink-muted">STUDENT VERIFICATION</p>
                        <p className="font-bricolage text-[11px] font-extrabold text-ink">IIT Bombay • 2026 Batch</p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-accent-purple" />
                    </div>

                    {/* Verified Badge Card */}
                    <div className="bg-accent-gold p-3 rounded-2xl border border-ink space-y-1 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-ink" />
                          <span className="font-jetbrains text-[9px] font-bold">COLLEGE VERIFIED</span>
                        </div>
                        <span className="font-jetbrains text-[8px] bg-white px-1.5 py-0.5 rounded font-bold">ACTIVE</span>
                      </div>
                      <p className="font-bricolage text-xs font-extrabold text-ink">Rahul Sharma</p>
                      <p className="font-jetbrains text-[8px] text-ink/80">ID: 21B030042 • B.Tech CSE</p>
                    </div>

                    {/* Approved Credit Line Card */}
                    <div className="bg-white p-3 rounded-2xl border border-ink/20 space-y-1 shadow-sm">
                      <span className="font-jetbrains text-[8px] text-ink-muted uppercase">APPROVED CREDIT LINE</span>
                      <p className="font-bricolage text-xl font-extrabold text-accent-purple">₹15,000</p>
                      <div className="flex items-center justify-between pt-1 border-t border-ink/10">
                        <span className="font-jetbrains text-[8px] text-accent-lime font-bold">0% APR (First 30 Days)</span>
                        <span className="font-jetbrains text-[8px] text-ink font-semibold">Active</span>
                      </div>
                    </div>

                    {/* KYC Checklist */}
                    <div className="bg-white/80 p-2.5 rounded-2xl border border-ink/10 space-y-1">
                      <p className="font-jetbrains text-[8px] font-bold text-ink-muted uppercase">VERIFICATION CHECKS</p>
                      <div className="flex items-center justify-between text-[8px] font-medium">
                        <span>Aadhaar OTP</span>
                        <span className="text-accent-purple font-bold">✓ Verified</span>
                      </div>
                      <div className="flex items-center justify-between text-[8px] font-medium">
                        <span>College ID Scan</span>
                        <span className="text-accent-purple font-bold">✓ Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* App Bottom Navigation Bar */}
                  <div className="mt-auto pt-2 border-t border-ink/10 flex justify-around text-ink/70">
                    <Home className="w-4 h-4 text-ink" />
                    <Compass className="w-4 h-4" />
                    <Wallet className="w-4 h-4" />
                    <User className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Phone 2: Center Smartphone (CreditBuddy Main Wallet App Dashboard) */}
              <div className="w-[205px] sm:w-[250px] md:w-[285px] h-[540px] sm:h-[600px] md:h-[640px] bg-[#14100F] border border-ink rounded-[2.2rem] sm:rounded-[2.6rem] p-1.5 sm:p-2 shadow-[8px_8px_0px_#7B5CFF] z-20 transform scale-100 group-hover:scale-[1.02] transition-transform duration-500 shrink-0 flex flex-col">
                {/* Full Screen App Wrapper */}
                <div className="bg-ink text-white rounded-[1.9rem] sm:rounded-[2.3rem] h-full p-3.5 sm:p-4 flex flex-col justify-start gap-2 overflow-hidden border border-white/10 font-jakarta">
                  {/* Status Bar & Header */}
                  <div>
                    <div className="flex items-center justify-between text-[9px] font-bold text-white/80 px-1 mb-1 font-jetbrains">
                      <span>9:41</span>
                      <div className="w-16 h-3.5 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse"></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-2.5 h-2.5" />
                        <Battery className="w-2.5 h-2.5" />
                      </div>
                    </div>

                    {/* App Bar */}
                    <div className="flex items-center justify-between border-b border-white/15 pb-1.5 mb-1.5">
                      <div className="flex items-center gap-2">
                        <img src="/images/creditbuddy-logo.webp" alt="CreditBuddy" className="w-5 h-5 object-contain" />
                        <span className="font-bricolage text-xs font-extrabold text-accent-lime">CreditBuddy</span>
                      </div>
                      <span className="font-jetbrains text-[8px] bg-accent-purple px-2 py-0.5 rounded-full text-white font-bold">5G ACTIVE</span>
                    </div>
                  </div>

                  {/* App Content Body (Starts IMMEDIATELY under app bar) */}
                  <div className="space-y-2">
                    {/* Top Student Profile Greeting Banner */}
                    <div className="bg-white/10 p-2.5 rounded-xl border border-white/15 flex items-center justify-between shadow-sm">
                      <div>
                        <p className="font-bricolage text-xs font-extrabold text-white">Hey Dev! 👋</p>
                        <p className="font-jetbrains text-[8px] text-white/70">IIT Bombay • 4th Year</p>
                      </div>
                      <span className="font-jetbrains text-[8px] bg-accent-lime text-ink px-2 py-0.5 rounded font-bold">PRO</span>
                    </div>

                    {/* Primary Credit Card */}
                    <div className="bg-gradient-to-br from-accent-purple via-purple-900 to-ink p-3.5 rounded-2xl border border-white/20 space-y-1.5 shadow-lg">
                      <div className="flex justify-between items-start">
                        <span className="font-jetbrains text-[8px] text-white/70 uppercase tracking-wider">APPROVED CREDIT LINE</span>
                        <Zap className="w-4 h-4 text-accent-lime" />
                      </div>
                      <p className="font-bricolage text-2xl md:text-3xl font-extrabold text-white">₹50,000</p>
                      <div className="flex items-center justify-between pt-1 text-[8px]">
                        <span className="font-jetbrains text-accent-lime font-bold">● Instant UPI Withdrawal</span>
                        <span className="font-jetbrains text-white/60">0% Interest</span>
                      </div>
                    </div>

                    {/* 2 Action Buttons Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-accent-lime text-ink p-2 rounded-xl border border-ink flex items-center gap-1.5">
                        <QrCode className="w-3.5 h-3.5 shrink-0" />
                        <div>
                          <p className="font-jetbrains text-[8px] font-bold">SCAN &amp; PAY</p>
                          <p className="font-jakarta text-[9px] font-extrabold">Instant UPI</p>
                        </div>
                      </div>
                      <div className="bg-white/10 text-white p-2 rounded-xl border border-white/15 flex items-center gap-1.5">
                        <ArrowUpRight className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
                        <div>
                          <p className="font-jetbrains text-[8px] text-accent-cyan font-bold">WITHDRAW</p>
                          <p className="font-jakarta text-[9px] font-extrabold">To Bank</p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Student Transactions */}
                    <div className="bg-white/5 p-2.5 rounded-2xl border border-white/10 space-y-1.5">
                      <div className="flex justify-between items-center text-[8px]">
                        <span className="font-jetbrains text-white/70 font-bold uppercase">RECENT ACTIVITY</span>
                        <span className="font-jetbrains text-accent-lime">View All</span>
                      </div>
                      <div className="flex justify-between items-center text-[9px] pb-1 border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <ArrowUpRight className="w-3 h-3 text-accent-coral" />
                          <span>Campus Canteen UPI</span>
                        </div>
                        <span className="font-jetbrains font-bold text-accent-coral">-₹350</span>
                      </div>
                      <div className="flex justify-between items-center text-[9px]">
                        <div className="flex items-center gap-1.5">
                          <ArrowDownLeft className="w-3 h-3 text-accent-lime" />
                          <span>Campus Gig Stipend</span>
                        </div>
                        <span className="font-jetbrains font-bold text-accent-lime">+₹1,200</span>
                      </div>
                    </div>
                  </div>

                  {/* App Bottom Navigation Bar */}
                  <div className="mt-auto pt-2.5 border-t border-white/15 flex justify-around text-white/60">
                    <Home className="w-4 h-4 text-accent-lime" />
                    <Compass className="w-4 h-4" />
                    <Gift className="w-4 h-4" />
                    <User className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Phone 3: Right Smartphone (CreditBuddy Credit & Earn) */}
              <div className="w-[175px] sm:w-[220px] md:w-[260px] h-[520px] sm:h-[580px] md:h-[620px] bg-[#14100F] border border-ink rounded-[2.2rem] sm:rounded-[2.6rem] p-1 sm:p-1.5 shadow-[4px_4px_0px_#14100F] transform rotate-8 -translate-x-3 sm:-translate-x-5 md:-translate-x-7 translate-y-4 group-hover:rotate-12 group-hover:-translate-x-1 transition-transform duration-500 shrink-0 flex flex-col z-10">
                {/* Full Screen App Wrapper */}
                <div className="bg-bg-primary rounded-[1.9rem] sm:rounded-[2.3rem] h-full p-3 sm:p-3.5 flex flex-col justify-start gap-2 overflow-hidden border border-ink/10 font-jakarta">
                  {/* Status Bar & Header */}
                  <div>
                    <div className="flex items-center justify-between text-[9px] font-bold text-ink px-1 mb-1 font-jetbrains">
                      <span>9:41</span>
                      <div className="w-14 h-3 bg-ink rounded-full flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-2.5 h-2.5" />
                        <Battery className="w-2.5 h-2.5" />
                      </div>
                    </div>

                    {/* App Bar */}
                    <div className="flex items-center justify-between border-b border-ink/10 pb-1.5 mb-1.5">
                      <span className="font-bricolage text-xs font-extrabold text-ink">CreditBuddy Health</span>
                      <span className="font-jetbrains text-[8px] text-accent-purple font-bold">+45 CIBIL PTS</span>
                    </div>
                  </div>

                  {/* App Content Body (Starts IMMEDIATELY under app bar) */}
                  <div className="space-y-2">
                    {/* Top Hero Score Banner */}
                    <div className="bg-white p-2.5 rounded-xl border border-ink/10 flex items-center justify-between shadow-sm">
                      <div>
                        <p className="font-jetbrains text-[8px] text-ink-muted">CREDIT SCORE STATUS</p>
                        <p className="font-bricolage text-[11px] font-extrabold text-ink">Building Real Credit</p>
                      </div>
                      <span className="font-jetbrains text-[8px] bg-accent-cyan px-2 py-0.5 rounded font-bold text-ink">VERIFIED</span>
                    </div>

                    {/* CIBIL Score Card */}
                    <div className="bg-accent-cyan p-3 rounded-2xl border border-ink space-y-1 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-jetbrains text-[8px] font-bold text-ink">OFFICIAL CIBIL</span>
                        <span className="font-jetbrains text-[8px] bg-white px-1.5 py-0.5 rounded font-bold">765 PTS</span>
                      </div>
                      <p className="font-bricolage text-xl font-extrabold text-ink">765 (Excellent)</p>
                      <p className="font-jetbrains text-[8px] text-ink/80">On-time student repayments</p>
                    </div>

                    {/* Active Campus Gig */}
                    <div className="bg-white p-3 rounded-2xl border border-ink/20 space-y-1.5 shadow-sm">
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-accent-gold" />
                        <span className="font-jetbrains text-[8px] text-ink-muted uppercase">ACTIVE CAMPUS GIG</span>
                      </div>
                      <p className="font-bricolage text-xs font-extrabold text-ink">Campus Ambassador Task</p>
                      <div className="flex justify-between items-center pt-1 border-t border-ink/10 text-[8px]">
                        <span className="font-jetbrains text-accent-purple font-bold">Stipend: ₹1,500/mo</span>
                        <span className="font-jetbrains text-ink font-semibold">Active ✓</span>
                      </div>
                    </div>

                    {/* Earn to Repay Tracker */}
                    <div className="bg-white/80 p-2.5 rounded-2xl border border-ink/10 space-y-1">
                      <p className="font-jetbrains text-[8px] font-bold text-ink-muted uppercase">REPAYMENT REDUCTION</p>
                      <p className="font-bricolage text-xs font-extrabold text-accent-lime">100% Repaid via Gigs</p>
                    </div>
                  </div>

                  {/* App Bottom Navigation Bar */}
                  <div className="mt-auto pt-2 border-t border-ink/10 flex justify-around text-ink/70">
                    <Home className="w-4 h-4" />
                    <Compass className="w-4 h-4 text-ink" />
                    <Gift className="w-4 h-4" />
                    <User className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>

            {/* Smooth White Fog Layer + Overlay Text at Bottom */}
            <div className="relative z-20 mt-auto pt-24 pb-2 px-6 -mx-6 md:-mx-8 -mb-6 md:-mb-8 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-[2px]">
              <h3 className="font-bricolage text-4xl md:text-5xl font-extrabold relative z-20 text-ink">
                Up to ₹50,000
              </h3>
              <p className="font-jakarta text-ink-muted text-base md:text-lg mt-2 relative z-20 font-semibold">
                Instant credit line linked directly to your student ID
              </p>
            </div>

          </div>

          {/* Side Info */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <div className="borrow-showcase-item flex-1 bg-ink text-white brutal-card p-8 flex flex-col justify-between relative overflow-hidden group" style={{ boxShadow: '6px 6px 0px #7B5CFF' }}>
              <img 
                src="/images/sticker3.webp" 
                alt="Sticker" 
                className="absolute right-2 md:right-4 top-[38%] -translate-y-1/2 w-28 md:w-36 h-auto object-contain pointer-events-none opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 z-0" 
              />
              <span className="font-bricolage font-extrabold text-3xl text-accent-lime relative z-10">0%</span>
              <p className="font-jakarta text-white/80 relative z-10 max-w-[70%] sm:max-w-none">Interest for the first 30 days. Pay back what you borrow, nothing more.</p>
            </div>
            <div className="borrow-showcase-item flex-1 bg-accent-lime text-ink brutal-card p-8 flex flex-col justify-between relative overflow-hidden group">
              <img 
                src="/images/skincare-promo.webp" 
                alt="Promotion" 
                className="absolute right-2 md:right-4 top-[30%] -translate-y-1/2 w-36 md:w-44 h-auto object-contain pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 z-0" 
              />
              <span className="font-bricolage font-extrabold text-3xl text-ink relative z-10">60s</span>
              <p className="font-jakarta text-ink font-medium relative z-10 max-w-[70%] sm:max-w-none">Approval time. Faster than making instant noodles.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
